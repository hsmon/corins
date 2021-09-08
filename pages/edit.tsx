import React from 'react'
import styled from 'styled-components'
import { GetServerSideProps } from 'next'

import getScreenshot, {
  ScreenshotAllType,
  ScreenshotErrorType,
  ScreenshotInterface
} from '~/lib/screenshot'

import Retry from '~/components/organisms/Retry'
import Edit from '~/components/pages/Edit'
import { MonitorSizeKey } from '~/assets/monitorSize'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  src: string
  screenshot: string
  screenshotWidth: number
  screenshotHeight: number
  monitorSize: MonitorSizeKey
  error?: string | undefined
}

// ===============================
// @Component
// ===============================

const View: React.FC<Props> = ({
  className,
  screenshot,
  screenshotWidth,
  screenshotHeight,
  monitorSize,
  error
}) => {
  if (error || !screenshot) return <Retry />

  return (
    <div className={className}>
      <h1>フィードバックをしましょう ✍️</h1>
      <Edit
        screenshot={screenshot}
        screenshotWidth={screenshotWidth}
        screenshotHeight={screenshotHeight}
        monitorSize={monitorSize}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ScreenshotAllType> =
  async ({ query }) => {
    if (query === undefined) {
      return {
        props: {
          error: 'error'
        }
      }
    }

    const { src, username, password, monitorSize, error } =
      query as unknown as ScreenshotInterface & Required<ScreenshotErrorType>

    if (error || !src) {
      return {
        props: {
          error: 'error'
        }
      }
    }

    const chunks = await getScreenshot(src, username, password, monitorSize)
    const { screenshotWidth, screenshotHeight } = chunks

    return {
      props: {
        screenshot: chunks?.screenshot,
        screenshotWidth,
        screenshotHeight,
        monitorSize
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
