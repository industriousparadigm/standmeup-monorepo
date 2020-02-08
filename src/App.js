import React, { useContext } from 'react'
import { Router, Route, Switch, __RouterContext } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { Container } from 'reactstrap'
import PrivateRoute from './components/PrivateRoute'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './views/Home'
import Profile from './views/Profile'
import Topics from './views/Topics'
import ExternalApi from './views/ExternalApi'
import { useAuth0 } from './react-auth0-spa'
import history from './utils/history'

// styles
import './App.css'
import './auth0-styles.css'

// fontawesome
import initFontAwesome from './utils/initFontAwesome'
initFontAwesome()

// TODO! figure out why this won't work. Why does routerContext come back undefined?!
const useRouter = () => useContext(__RouterContext)

const App = () => {
  console.log({ __RouterContext })
  const routerContext = useRouter()
  console.log({ routerContext })

  const { loading } = useAuth0()

  // const transitions = useTransition(location, location => location.key, {
  //   from: {
  //     opacity: 0,
  //     position: 'absolute',
  //     width: '100%',
  //     transform: 'translate3d(100%, 0, 0)'
  //   },
  //   enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' }
  // })

  if (loading) {
    return <Loading />
  }

  return (
    <Router history={history}>
      <div id='app' className='d-flex flex-column h-100'>
        <NavBar />
        <Container className='flex-grow-1 mt-5'>
          <Switch>
            <Route path='/' exact component={Home} />
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path='/external-api' component={ExternalApi} />
            <PrivateRoute path='/topics' component={Topics} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

export default App
