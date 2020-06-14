import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import getScreenshot, {
  ScreenshotAllType,
  ScreenshotType
} from '~/pages/api/screenshot'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  src: string
  screenshot: string
  screenshotWidth: number
  screenshotHeight: number
  error?: string | undefined
}

// ===============================
// @Component
// ===============================

const Retry: React.FC = () => {
  return (
    <>
      <p>もう一度はじめからやり直してください</p>
      <Link href="/">
        <a>やりなおす</a>
      </Link>
    </>
  )
}

const View: React.FC<Props> = ({
  className,
  src,
  screenshot,
  screenshotWidth,
  screenshotHeight,
  error
}) => {
  if (error) return <Retry />
  // TODO 戻るボタンを押したときに、redux-urlをリセット

  return (
    <div className={className}>
      <h1>修正指示を編集しましょう ✍️</h1>
      <div id="edit">
        {screenshot ? (
          <div
            style={{
              background: `url(data:image/png;base64,${screenshot})`,
              backgroundSize: 'cover',
              width: '100%',
              height: 0,
              paddingTop: `${(screenshotHeight / screenshotWidth) * 100}%`
            }}
          />
        ) : (
          <Retry />
        )}
      </div>
    </div>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  screenshot: PropTypes.string.isRequired,
  screenshotWidth: PropTypes.number.isRequired,
  screenshotHeight: PropTypes.number.isRequired,
  error: PropTypes?.string.isRequired
}

export const getServerSideProps:
  | GetServerSideProps
  | ScreenshotAllType = async ({ query: { src, error } }) => {
  if (error || !src) {
    return {
      props: {
        error: 'error'
      }
    }
  }

  const {
    screenshot,
    screenshotWidth,
    screenshotHeight
  }: ScreenshotType = await getScreenshot(src)

  return {
    props: {
      src,
      screenshot,
      screenshotWidth,
      screenshotHeight
    }
  }
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
