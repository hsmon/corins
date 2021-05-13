import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { removeUrlStateValue } from '~/redux/urls/actions'

import texts from '~/assets/text/index'

interface Props {
  className?: string
}

const View: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()

  const resetUrlStatus: () => void = () => {
    dispatch(removeUrlStateValue({ src: '' }))
  }
  return (
    <header className={className}>
      <Link href="/">
        <a onClick={resetUrlStatus}>
          {texts.icon} {texts.title}
        </a>
      </Link>
    </header>
  )
}

export default styled(View)`
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
