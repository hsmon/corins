import { AppProps } from 'next/app'
import Head from 'next/head'
import { createTheme, ThemeProvider, PrimaryButton } from 'smarthr-ui'
const theme = createTheme({})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>🚤corins</title>
      </Head>
      <ThemeProvider theme={theme}>
        <PrimaryButton>Hello World</PrimaryButton>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
