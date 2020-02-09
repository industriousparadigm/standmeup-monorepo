import React, { useContext } from 'react'
import { Route, Switch, __RouterContext } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { Container } from 'reactstrap'
import PrivateRoute from './PrivateRoute'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Topics from '../views/Topics'
import ExternalApi from '../views/ExternalApi'

// custom hook to access RouterContext easily
const useRouter = () => useContext(__RouterContext)

const Main = () => {
  const { location } = useRouter()
  console.log({ location })

  const transitions = useTransition(location, location => location.key, {
    from: {
      opacity: 0,
      position: 'absolute',
      width: '100%',
      transform: 'translate3d(100%, 0, 0)'
    },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' }
  })

  return (
    <Container className='flex-grow-1 mt-5'>
      {transitions.map(({ section, props: transition, key }) => (
        <animated.div style={transition} key={key}>
          <Switch location={section}>
            <Route path='/' exact component={Home} />
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path='/external-api' component={ExternalApi} />
            <PrivateRoute path='/topics' component={Topics} />
          </Switch>
        </animated.div>
      ))}
    </Container>
  )
}

export default Main
