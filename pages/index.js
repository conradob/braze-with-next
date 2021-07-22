import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const appboy = dynamic(() => import('@braze/web-sdk'), { ssr: false })

// CAN'T USE WEB-SDK WITH NEXT.JS
// Server Error: ReferenceError: window is not defined
// import appboy from '@braze/web-sdk'

const Index = () => {
  const [isStarted, setIsStarted] = useState(false)

  const handleClick = () => {
    appboy.logCustomEvent('send me push')
    appboy.requestImmediateDataFlush()
  }

  useEffect(() => {
    console.log(appboy)
    if (typeof appboy !== 'undefined') {
      const started = appboy.initialize?.('some-key', {
        baseUrl: 'https://sdk.iad-05.braze.com/api/v3',
        enableLogging: true,
      })
      setIsStarted(started)
    }
  }, [])

  useEffect(() => {
    if (isStarted) {
      console.log('started')
      appboy.changeUser('some-id')
      appboy.openSession()
    }
  }, [isStarted])

  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>Next.js + PWA = AWESOME!</h1>
      <button type="button" onClick={handleClick}>
        Send me push
      </button>
    </>
  )
}

export default Index
