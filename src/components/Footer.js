import React from 'react'

const Footer = () => (
  <footer className='bg-light p-3 text-center'>
    <div className='logo' />
    <p>
      App built on top of{' '}
      <a
        href='https://auth0.com'
        target='_blank'
        rel='noreferrer noopener'
        aria-label='External link to Auth0 website'
      >
        Auth0
      </a>
      's sample SPA project.
    </p>
  </footer>
)

export default Footer
