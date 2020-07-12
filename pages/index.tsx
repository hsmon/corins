import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import UrlForm from '~/components/pages/Url'

import { useSelector } from 'react-redux'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
}
type IndexTypes = {
  url: {
    src: string
    username: number | null
    password: number | null
    monitor: string | null
  }
}

// ===============================
// @Component
// ===============================
const urlSelector: ({
  url: { src, username, password }
}: IndexTypes) => {
  src: string
  username?: number | null
  password?: number | null
  monitorSize?: string | null
} = ({ url: { src, username, password, monitorSize } }) => ({
  src,
  username,
  password,
  monitorSize
})

const View: React.FC<Props> = ({ className }) => {
  const { src, username, password, monitorSize } = useSelector(urlSelector)
  const [urlStatus] = [src]
  const router = useRouter()

  const linkTransition: () => void = () => {
    router.push({
      pathname: '/edit',
      query: { src: urlStatus, username, password, monitorSize }
    })
  }

  React.useEffect(() => {
    if (urlStatus) linkTransition()
  }, [urlStatus])

  return (
    <div className={className}>
      <h1>
        フィードバックするページ<small style={{ fontSize: '80%' }}>(URL)</small>
        を教えて下さい ✏️
      </h1>
      <UrlForm />
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
    margin: 2rem 0 3rem;
  }
`
