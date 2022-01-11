import React from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { StepMeta } from 'types/three.types'
import primaryFont from 'assets/fonts/droid/droid_sans_regular.typeface.json'
import secondaryFont from 'assets/fonts/helvetiker_bold.typeface.json'

const ThreeAnimation: React.FC = () => {
  React.useEffect(() => {
    let marker: THREE.Group
    let pt: THREE.Vector3
    // let mesh: THREE.Mesh

    // Fonts
    const fontLoader = new FontLoader()
    const font = fontLoader.parse(primaryFont)
    const stairFont = fontLoader.parse(secondaryFont)

    // Colors
    const jaredColor = 0x4bb367 // 0x2db554
    const stepTextColor = 0x656665 // 0x096902

    function init() {
        // Ellipse class, which extends the virtual base class Curve
      class Ellipse extends THREE.Curve<THREE.Vector3> {
        xRadius: number
        yRadius: number

        constructor(xRadius: number, yRadius: number) {
            super();

            this.xRadius = xRadius;
            this.yRadius = yRadius;
        }

        // @override
        getPoint ( t: number ) {
            let radians = 2 * Math.PI * t;
            return new THREE.Vector3(
                0,
                this.yRadius * Math.sin(radians),
                this.xRadius * Math.cos(radians)
            );
        };
      }

      // Jump Path
      const jumpPath = new Ellipse(6, 20);
      
      const canvas = document.getElementById('threeJsCanvas')
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
      camera.position.set(0, 20, 75);
      // camera.lookAt(0, 5000, 0);

      // Set up the renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
      renderer.setSize(width, height);
      
      //const controls = new OrbitControls(camera, canvas);
      // controls.addEventListener( 'change', render ); // use if there is no animation loop
      // controls.minDistance = 10;
      // controls.maxDistance = 50;
      

      // Add light
      function addLighting(scene: THREE.Scene) {
          const color = 0xFFFFFF;
          const intensity = 0.75;

          // Ambient
          let ambient = new THREE.AmbientLight(color, 1);
          scene.add(ambient);
          
          // Directional
          let light = new THREE.DirectionalLight(color, intensity);
          light.position.set(0, 100, 50);
          light.target.position.set(0, 0, 0);
          scene.add(light);
          scene.add(light.target);
      }
      addLighting(scene);

      // Floor
      function addFloor(scene: THREE.Scene) {
          let geometry = new THREE.BoxGeometry(1000, 1, 1000);
          let material = new THREE.MeshStandardMaterial({color: 0xDDDDDD, roughness: 0});
          const floor = new THREE.Mesh( geometry, material );
          floor.position.set(0, -1, 0);
          floor.name = 'my-floor';
          scene.add(floor);
      }
      addFloor(scene);

      // Sides
      function addSides(scene: THREE.Scene) {
          // back side
          let geometry = new THREE.BoxGeometry(1000, 1000, 1);
          let material = new THREE.MeshStandardMaterial({color: 0xDDDDDD, roughness: 0});
          let mesh = new THREE.Mesh( geometry, material );
          mesh.position.set(0, 490, -500);
          mesh.name = 'back-side';
          scene.add(mesh);

          // left side
          geometry = new THREE.BoxGeometry(1, 1000, 1000);
          material = new THREE.MeshStandardMaterial({color: 0xDDDDDD, roughness: 0});
          mesh = new THREE.Mesh( geometry, material );
          mesh.position.set(-500, 490, 0);
          mesh.name = 'left-side';
          scene.add(mesh);

          // right side
          geometry = new THREE.BoxGeometry(1, 1000, 1000);
          material = new THREE.MeshStandardMaterial({color: 0xDDDDDD, roughness: 0});
          mesh = new THREE.Mesh( geometry, material );
          mesh.position.set(500, 490, 0);
          mesh.name = 'right-side';
          scene.add(mesh);
      }
      addSides(scene);

      const numStairs = 12;
      const numConqueredStairs = 8;
      const stairWidth = 100;
      const stairHeight = 10;
      const stairDepth = 1;
      const stairColor = 0x6b6e6c;
      // const totalHeight = (numStairs * stairHeight) + (numStairs * stairDepth);
      let activeStep = 0;

      const technologies = [
          'Javascript',
          'Node',
          'Angular',
          'React',
          'Vue',
          'ThreeJS',
          'MySQL',
          'Postgres',
          'Python',
          'Ruby',
          'AWS VPC',
          'Graph QL'
      ];

      // Stair Text
      function addStairText(scene: THREE.Scene, stairMeta: StepMeta) {
          const label = technologies[stairMeta.stair];

          const textConfig = {
              font: stairFont,
              size: 6,
              height: 2,
              curveSegments: 50,
              bevelEnabled: false,
              bevelThickness: 1,
              // bevelSize: 1,
              // bevelOffset: 0,
              // bevelSegements: 10
          };

          const geometry = new TextGeometry(label, textConfig);
          const material = new THREE.MeshBasicMaterial({ color: stepTextColor });

          const box = new THREE.Box3();
          const mesh = new THREE.Mesh(geometry, material);
          box.setFromObject(mesh);
          const textWidth = box.max.x - box.min.x;
          mesh.name = `stairText${stairMeta.stair}`;
          mesh.position.x = -(textWidth / 2);
          mesh.position.y = stairMeta.height + textConfig.size;
          mesh.position.z = stairMeta.depth - (textConfig.height / 2) - (stairHeight / 2);

          scene.add(mesh);

          // let box = new THREE.Box3().setFromObject( text );
          // box.center( text.position ); // this re-sets the mesh position
          // text.position.multiplyScalar( - 1 );
          // text.position.y = (stairsMeta[0].height - jumpPath.yRadius);
          // text.position.z = -stairsMeta[0].depth +  jumpPath.xRadius;

          // const pivot = new THREE.Group();
          // pivot.name='pivot';
          // scene.add( pivot );
          // pivot.add( text );

          // marker = pivot;
      }

      function addStairs(scene: THREE.Scene) {
          let geometry, material, mesh
          for (let i = 0; i < numStairs; i++) {
              const stairMeta: StepMeta = {
                  stair: i,
                  height: ((i * stairHeight) + (stairHeight / 2)),
                  depth: -(i * stairHeight)
              }

              // step
              geometry = new THREE.BoxGeometry(stairWidth, stairHeight, stairDepth);
              material = new THREE.MeshStandardMaterial({ color: stairColor, roughness: 0 });
              mesh = new THREE.Mesh(geometry, material);
              mesh.position.set(0, stairMeta.height, stairMeta.depth);
              scene.add(mesh);

              // rise
              geometry = new THREE.BoxGeometry(stairWidth, stairDepth, stairHeight + 1);
              material = new THREE.MeshStandardMaterial({ color: stairColor, roughness: 0 });
              mesh = new THREE.Mesh(geometry, material);
              mesh.position.set(0, ((i * stairHeight) + stairHeight), -(stairHeight * i + (stairHeight / 2)));
              scene.add(mesh);

              // stair text
              addStairText(scene, stairMeta);
          }
      }
      addStairs(scene);

      // Animated Text
      function addAnimatedText(scene: THREE.Scene) {
          const textConfig = {
              font,
              size: 8,
              height: 2,
              curveSegments: 50,
              bevelEnabled: false,
              bevelThickness: 1,
              // bevelSize: 1,
              // bevelOffset: 0,
              // bevelSegements: 10
          }
          const geometry = new TextGeometry('Jared Hallick', textConfig);
          const material = new THREE.MeshBasicMaterial({ color: jaredColor });
          const text = new THREE.Mesh(geometry, material);
          text.name = 'my-text';

          let box = new THREE.Box3().setFromObject( text );
          box.getCenter( text.position ); // this re-sets the mesh position
          text.position.multiplyScalar( - 1 );
          // text.position.y = (numStairs * stairHeight) - (jumpPath.yRadius / 2);
          // text.position.z = -(numStairs * stairHeight) + jumpPath.xRadius + textConfig.height;
          text.position.set(text.position.x, 0, 0);

          const pivot = new THREE.Group();
          pivot.name='pivot';
          scene.add( pivot );
          pivot.add( text );

          marker = pivot;
      }
      addAnimatedText(scene);

      // function addEllipse(scene: THREE.Scene) {
      //     // params
      //     let pathSegments = 64;
      //     let tubeRadius = 0.5;
      //     let radiusSegments = 16;
      //     let closed = true;

      //     let geometry = new THREE.TubeBufferGeometry( jumpPath, pathSegments, tubeRadius, radiusSegments, closed );

      //     // material
      //     let material = new THREE.MeshPhongMaterial( {
      //         color: 0x0080ff, 
      //     } );

      //     // mesh
      //     mesh = new THREE.Mesh( geometry, material );
      //     scene.add( mesh );
      // }
      // addEllipse(scene);

      // Animate and Render
      function animate() {
          requestAnimationFrame(animate);

          render();
      }

      // the getPoint starting letiable
      const startT = 0;
      const endT = 0.41;
      const squishT = 0.35;
      const velocity = 0.005;
      // const squishVelocity = 0.003;

      // const cameraOffset = 75;
      // const finalCameraOffset = 40;

      let t = startT;
      let waitCount = -1;

      function squishStairText(scene: THREE.Scene, activeStep: number) {
          const text = scene.getObjectByName(`stairText${activeStep}`);
          if (text) {
              text.scale.y = Math.max(0, text.scale.y - 0.1);
          }
      }

      function onStairSquished(scene: THREE.Scene, activeStep: number) {
          const text = scene.getObjectByName(`stairText${activeStep}`);
          const box = new THREE.Box3().setFromObject(text);
          if (text) {
              text.rotation.x = -(Math.PI / 2);
              // text.height = 0;
              text.scale.y = 1;
              text.scale.z = 0;
              text.position.z += 2 * (box.max.z - box.min.z);
          }
      }

      function render() {
          // Pause before animating to next step
          if (waitCount >= 0 && waitCount <= 40) {
              waitCount++;
          } else {
              waitCount = -1;
          }

          if (activeStep < numConqueredStairs) {
              // Move camera slightly until target is reached
              if (activeStep < numConqueredStairs) {
                  camera.position.y += 0.1;
                  camera.position.z -= 0.1;
              }

              // Wating before jumping to next step;
              if (waitCount === -1) {
                  const path = jumpPath;
                  if (path) {
                      // set the marker position
                      pt = path.getPoint( t );

                      // set the marker position
                      const x = pt.x;
                      const y = pt.y + (activeStep * stairHeight);
                      const z = pt.z - (activeStep * stairHeight);
                      marker.position.set(x, y, z);
                      // camera.position.set(x, y, z + cameraOffset);

                      if (t < endT) {
                          // t += (t >= squishT) ? squishVelocity : velocity;
                          t += velocity;

                          if (t >= squishT) {
                              squishStairText(scene, activeStep);
                          }
                      } else {
                          onStairSquished(scene, activeStep);

                          activeStep++;
                          t = startT;

                          waitCount = 0; // wait to start next loop;
                      }
                  }
              }

              renderer.render( scene, camera );
          }

          // renderer.render( scene, camera );
      }

      // setTimeout(() => animate(), 2000);
      animate()
    }

    init()
  }, [])

  return (
    <div>
      <canvas id="threeJsCanvas" style={{ width: 200, height: 200, borderRadius: 10 }}/>
    </div>
  )
}
export default ThreeAnimation