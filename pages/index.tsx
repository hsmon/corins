import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import UrlForm from '~/components/pages/Url'

import { useSelector } from 'react-redux'
import { UrlState } from '~/redux/urls/reducer'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
}
type IndexTypes = {
  url: UrlState
}

// ===============================
// @Component
// ===============================
const urlSelector: ({ url: { src } }: IndexTypes) => string | null = ({
  url: { src }
}) => src

const View: React.FC<Props> = ({ className }) => {
  const urlStatus = useSelector(urlSelector)
  const router = useRouter()

  const linkTransition: () => void = () => {
    router.push({
      pathname: '/edit',
      query: { src: urlStatus }
    })
  }

  return (
    <div className={className}>
      <h1>修正指示を出したいページのURLを教えて下さい ✏️</h1>
      <UrlForm />
      {urlStatus && linkTransition()}
    </div>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

// ===============================
// @Styled
// ===============================
export default styled(View)`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 5rem;
  }
`
