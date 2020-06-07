import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import texts from '~/assets/text/index'

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Link href="/">
        <a>{texts.title}</a>
      </Link>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 1em;
  text-align: right;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  position: relative;
  margin: 0 auto;
  @media screen and (max-width: ${({ theme }) => theme.responsive.large}) {
    max-width: 760px;
  }
  @media screen and (max-width: ${({ theme }) => theme.responsive.small}) {
    padding: 2.5em ${({ theme }) => theme.sideSpace.small};
  }
  a {
    text-decoration: none;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.black};
    margin-right: 3em;
  }
`

export default Header
