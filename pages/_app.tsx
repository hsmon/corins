import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyle from '~/assets/styles/global'
import styledTheme from '~/assets/styles/theme'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { createTheme, ThemeProvider, Loader } from 'smarthr-ui'
import router from 'next/router'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '~/redux/store'

import Layout from '~/components/templates/Layout'

import texts from '~/assets/text/index'
const theme = createTheme({})

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [loading])
  return (
    <>
      <Head>
        <title>{texts.title}</title>
      </Head>
      <ReduxProvider store={store}>
        <StyledThemeProvider theme={styledTheme}>
          <ThemeProvider theme={theme}>
            <Layout>
              {!!loading ? (
                <div
                  style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Loader size="l" color="#00a5ab" />
                </div>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </ThemeProvider>
          <GlobalStyle />
        </StyledThemeProvider>
      </ReduxProvider>
    </>
  )
}

export default App
