import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import PrivateRoute from './PrivateRoute'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Topics from '../views/Topics'
import MiddlewareTester from '../views/MiddlewareTester'

const Main = () => {
  return (
    <Container className='flex-grow-1 mt-5'>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/middleware-tester' exact component={MiddlewareTester} />
        <PrivateRoute path='/profile' exact component={Profile} />
        <PrivateRoute path='/topics' exact component={Topics} />
      </Switch>
    </Container>
  )
}

export default Main
