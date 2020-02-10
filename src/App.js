import React from 'react'
import { Router } from 'react-router-dom'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Main from './components/Main'
import Footer from './components/Footer'
import { useAuth0 } from './react-auth0-spa'
import history from './utils/history'

// load styles and fontawesome
import './App.css'
import './auth0-styles.css'
import initFontAwesome from './utils/initFontAwesome'
initFontAwesome()

const App = () => {
  const { loading } = useAuth0()

  if (loading) {
    return <Loading />
  }

  return (
    <Router history={history}>
      <div id='app' className='d-flex flex-column h-100'>
        <NavBar />
        <Main />
        <Footer />
      </div>
    </Router>
  )
}

export default App
