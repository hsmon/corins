import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { usePreventWindowUnload } from '~/hooks/usePreventWindowUnload'
import { PinProps } from '~/redux/pins/reducer'
import Edit from '~/components/pages/Edit'
import { MonitorSizeKey } from '~/assets/monitorSize'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
}

type IndexTypes = {
  url: {
    src: string
    imagePath: string
    imageWidth: number
    imageHeight: number
    monitorSize: MonitorSizeKey
  }
  pin: {
    pins: PinProps[]
  }
}

// ===============================
// @Component
// ===============================

const urlSelector: ({
  url: { src, imagePath, imageWidth, imageHeight, monitorSize },
  pin: { pins }
}: IndexTypes) => {
  src: string
  imagePath: string
  imageWidth: number
  imageHeight: number
  monitorSize: MonitorSizeKey
  pins: PinProps[]
} = ({
  url: { src, imagePath, imageWidth, imageHeight, monitorSize },
  pin: { pins }
}) => ({
  src,
  imagePath,
  imageWidth,
  imageHeight,
  monitorSize,
  pins
})

const View: React.FC<Props> = ({ className }) => {
  const urlStatus = useSelector(urlSelector)
  const { imagePath, imageWidth, imageHeight, monitorSize, pins } = urlStatus

  usePreventWindowUnload(true)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={className}>
      <h1>フィードバックをしましょう ✍️</h1>
      <Edit
        screenshot={imagePath}
        screenshotWidth={imageWidth}
        screenshotHeight={imageHeight}
        monitorSize={monitorSize}
        pins={pins}
      />
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
