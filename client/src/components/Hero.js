import React from 'react'

import logo from '../assets/chat.svg'

const Hero = () => (
  <div className='text-center hero my-5'>
    <img
      className='mb-3 app-logo'
      src={logo}
      alt='Standmeup logo'
      width='120'
    />
    <h1 className='mb-4'>standmeup</h1>

    <p className='lead'>
      Say goodbye to mumbling when you should have been shining in front of your
      colleagues. <br /> <br />
      Standmeup <strong>will not</strong> stand you up today!
    </p>
  </div>
)

export default Hero
