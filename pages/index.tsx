import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UrlForm from '~/components/pages/Url'

interface Props {
  className?: string
}

const View: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <h1>修正指示を出したいページのURLを教えて下さい ✏️</h1>
      <UrlForm />
    </div>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(View)`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 5rem;
  }
`
