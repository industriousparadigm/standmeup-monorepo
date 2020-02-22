import React, { useState } from 'react'
import { NavLink as RouterNavLink, Link } from 'react-router-dom'

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap'

import { useAuth0 } from '../react-auth0-spa'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className='nav-container'>
      <Navbar color='light' light expand='md'>
        <Container>
          <NavbarBrand className='logo' />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to='/'
                  exact
                  activeClassName='router-link-exact-active'
                >
                  Home
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to='/topics'
                    exact
                    activeClassName='router-link-exact-active'
                  >
                    Topics
                    </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to='/middleware-tester'
                  exact
                  activeClassName='router-link-exact-active'
                >
                  Middleware Tester
                    </NavLink>
              </NavItem>
            </Nav>
            <Nav className='d-none d-md-block' navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id='qsLoginBtn'
                    color='primary'
                    className='btn-margin'
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <Link to='/profile'>
                  <img
                    src={user.picture}
                    alt='Profile'
                    className='nav-user-profile rounded-circle'
                    width='50'
                  />
                </Link>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className='d-md-none' navbar>
                <NavItem>
                  <Button
                    id='qsLoginBtn'
                    color='primary'
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className='d-md-none justify-content-between'
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className='user-info'>
                    <img
                      src={user.picture}
                      alt='Profile'
                      className='nav-user-profile d-inline-block rounded-circle mr-3'
                      width='50'
                    />
                    <h6 className='d-inline-block'>{user.name}</h6>
                  </span>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
