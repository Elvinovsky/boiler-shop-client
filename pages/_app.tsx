import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ProgressBar from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify'
import { withHydrate } from 'effector-next'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

const enhance = withHydrate()
function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <>
        <ProgressBar />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App)
