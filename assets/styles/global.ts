import { createGlobalStyle } from 'styled-components'
import { ThemeType } from './theme'

const globalStyle = createGlobalStyle<{ theme: ThemeType }>`
  /* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    word-break: break-all;
  }
  html, body {
    height: 100%;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.black};
    line-height: 1.6;
    font-size: 100%;
    font-weight: 400;
    font-family: "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    padding: 0;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  a {
    color: ${({ theme }) => theme.colors.highlight};
    text-decoration: none;
    transition: .5s color;
    :focus{
      outline: none;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.blue4};
    }
  }
  ol, ul, li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote::before, blockquote::after,
  q::before, q::after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  img {
  max-width: 100%;
  }
  button,
  input {
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 0;
    resize: none;
    &:focus {
      outline: none;
    }
  }
`
export default globalStyle
