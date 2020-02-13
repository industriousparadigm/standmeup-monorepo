import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import PrivateRoute from './PrivateRoute'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Topics from '../views/Topics'
import ExternalApi from '../views/ExternalApi'

const Main = () => {
  return (
    <Container className='flex-grow-1 mt-5'>
      <Switch>
        <Route path='/' exact component={Home} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/middleware-tester' component={ExternalApi} />
        <PrivateRoute path='/topics' component={Topics} />
      </Switch>
    </Container>
  )
}

export default Main
