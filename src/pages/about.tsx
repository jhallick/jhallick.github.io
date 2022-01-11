import List from 'components/List'
import Container from 'components/Container'
import ThreeAnimation from 'components/ThreeAnimation'
import React from 'react'

export type SkillType = 'frontend' | 'backend' | 'devops'

export interface Skill {
  name: string
  types: SkillType[]
}

const skills: Skill[] = [
  {
    name: 'Javascript',
    types: ['frontend', 'backend']
  },
  {
    name: 'Typescript',
    types: ['frontend', 'backend']
  },
  {
    name: 'NodeJS',
    types: ['backend']
  },
  {
    name: 'Angular',
    types: ['frontend']
  },
  {
    name: 'Vue',
    types: ['frontend']
  },
  {
    name: 'React',
    types: ['frontend']
  },
  {
    name: 'Postgres',
    types: ['backend']
  },
  {
    name: 'MySQL',
    types: ['backend']
  },
  {
    name: 'ThreeJS',
    types: ['frontend']
  },
  {
    name: 'CSS / SASS / SCSS',
    types: ['frontend']
  },
  {
    name: 'HTML',
    types: ['frontend']
  },
  {
    name: 'C#',
    types: ['frontend', 'backend']
  },
  {
    name: 'Cypress',
    types: ['frontend']
  },
  {
    name: 'Docker',
    types: ['devops']
  },
  {
    name: 'Kubernetes',
    types: ['devops']
  },
  {
    name: 'AWS S3',
    types: ['devops']
  },
  {
    name: 'AWS EC2',
    types: ['devops']
  },
  {
    name: 'AWS Lambda',
    types: ['devops']
  },
  {
    name: 'CircleCI',
    types: ['devops']
  }
]

export default () => {
  const getFilteredSkillsList = (filter: SkillType) => {
    return <List idField="name" labelField="name" items={skills.filter(s => s.types.includes(filter))}/>
  }
  
  return (
    <div className="vertical-container">
      <div className="page-title">About Me</div>

      <svg className="background-svg" height="100%" width="100%">
        <line x1="15%" y1="0" x2="15%" y2="600"/>
        <line x1="15%" y1="600" x2="98%" y2="600"/>
      </svg>
      <h1>Skills</h1>
      <ThreeAnimation />
      <div className="horizontal-container" style={{ marginTop: 24 }}>
        <Container className="list-container" title="Front End" content={getFilteredSkillsList('frontend')}/>
        <Container className="list-container" title="Back End" content={getFilteredSkillsList('backend')} />
          <Container className="list-container" title="Devops" content={getFilteredSkillsList('devops')} />
      </div>
    </div>
  )
}
