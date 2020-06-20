import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GetServerSideProps } from 'next'

import getScreenshot, {
  ScreenshotAllType,
  ScreenshotType
} from '~/pages/api/screenshot'

import Retry from '~/components/organisms/Retry'
import Edit from '~/components/pages/Edit'

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

// const pinsSelector = ({ pin: { pins } }) => pins

const View: React.FC<Props> = ({
  className,
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
      <Edit
        screenshot={screenshot}
        screenshotWidth={screenshotWidth}
        screenshotHeight={screenshotHeight}
      />
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

export const getServerSideProps: GetServerSideProps<ScreenshotAllType> = async ({
  query: { src, error }
}) => {
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
  } = (await getScreenshot(src as string)) as ScreenshotType

  return {
    props: {
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
