import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { useAuth0 } from '../react-auth0-spa'

const MiddlewareTester = () => {
  const [showResult, setShowResult] = useState(false)
  const [apiMessage, setApiMessage] = useState('')
  const { getTokenSilently } = useAuth0()

  const callApi = async () => {
    try {
      const token = await getTokenSilently()

      const response = await fetch('/api/test', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const responseData = await response.json()

      setShowResult(true)
      setApiMessage(responseData)
    } catch ({ error, error_description }) {
      setShowResult(true)
      setApiMessage({ error, error_description })
    }
  }

  return (
    <>
      <div className='mb-5'>
        <h1>Middleware Tester</h1>
        <p>
          Standmeup is talking to an external API which is protected. The button below tests whether
          you can get past the JWT check.
        </p>

        <Button color='primary' className='mt-5' onClick={callApi}>
          Ping API
        </Button>
      </div>

      <div className='result-block-container'>
        <div className={`result-block ${showResult && 'show'}`}>
          <h6 className='muted'>Result</h6>
          {JSON.stringify(apiMessage, null, 2)}
        </div>
      </div>
    </>
  )
}

export default MiddlewareTester
