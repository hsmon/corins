/* eslint-disable @typescript-eslint/no-empty-interface */
const variables = {
  colors: {
    base: '#e8eaf6',
    background: '#fff',
    black: '#333',
    blackLight: '#444',
    gray: '#727d86',
    silver: '#969fa7',
    white: '#e8eaf6',
    whitesmoke: '#f1f4f7',
    highlight: '#20a8ea',
    red: '#ff585d',
    orange: '#f99d09',
    yellow: '#ffb549',
    lightYellow: '#CDCFA1',
    gradient:
      'linear-gradient(225deg, rgba(48,79,254,1) 0%, rgba(197,202,233,1) 100%)',
    blue1: '#D5F4FF',
    blue2: '#80DDFF',
    blue3: '#2AC6FF',
    blue4: '#00BBFF',
    green: '#008c92'
  },
  sizes: {
    bioWidth: '290px',
    maxWidth: '1200px'
  },
  sideSpace: {
    small: '20px',
    large: '1.5em',
    contentSmall: '20px',
    contentLarge: '2.5em'
  },
  responsive: {
    small: '500px',
    medium: '768px',
    large: '950px'
  }
} as const

export type ThemeType = typeof variables
export default variables

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
