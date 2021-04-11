import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import Home from '~/pages/index'
import styledTheme from '~/assets/styles/theme'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '~/redux/store'

afterEach(() => {
  cleanup()
})

describe('トップページのテスト', () => {
  it('タイトルが表示されるか', () => {
    render(
      <ReduxProvider store={store}>
        <StyledThemeProvider theme={styledTheme}>
          <Home />
        </StyledThemeProvider>
      </ReduxProvider>
    )
    // screen.debug()
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
