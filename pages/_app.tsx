import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyle from '~/assets/styles/global'
import styledTheme from '~/assets/styles/theme'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { createTheme, ThemeProvider } from 'smarthr-ui'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '~/redux/store'

import Layout from '~/components/templates/Layout'

import texts from '~/assets/text/index'
const theme = createTheme({})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{texts.title}</title>
      </Head>
      
      <ReduxProvider store={store}>
        <StyledThemeProvider theme={styledTheme}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
          <GlobalStyle />
        </StyledThemeProvider>
      </ReduxProvider>
    </>
  )
}

export default App
