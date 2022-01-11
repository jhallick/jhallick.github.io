import Button from 'components/Button'
import React from 'react'

export default () => (
  <div className="background-half vertical-container justify-content-center" style={{ alignItems: 'flex-start', paddingLeft: 100 }}>
    <div className="page-title bold color-primary" style={{ paddingBottom: 12 }}>
      Hi, <br/> I'm Jared Hallick
    </div>
    <div className="page-subtitle color-dark-grey">
      Full Stack Software Engineer
    </div>
    <Button text="Contact Me" type="primary" className="button-extra-large" to="/contact-me"/>
  </div>
)
