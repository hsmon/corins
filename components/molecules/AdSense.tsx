import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

type Props = {
  className?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any
  }
}

const View: React.FC<Props> = ({ className }) => {
  React.useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
      window.adsbygoogle.push({})
    }
  }, [])

  return (
    <ins
      className={`${className} adsbygoogle`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2229321775479825"
      data-ad-slot="2346491777"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(View)`
  width: 500px;
  height: 300px;
  margin: 0 auto;
`
