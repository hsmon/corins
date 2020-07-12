import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { usePreventWindowUnload } from '~/hooks/usePreventWindowUnload'
import { AddUrlImageProps } from '~/redux/urls/reducer'
import { PinProps } from '~/redux/pins/reducer'
import Edit from '~/components/pages/Edit'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
}

type IndexTypes = {
  url: {
    imagePath: string
    imageWidth: number
    imageHeight: number
    monitorSize: string
  }
  pin: {
    pins: PinProps[]
  }
}

// ===============================
// @Component
// ===============================

const urlSelector: ({
  url: { imagePath, imageWidth, imageHeight, monitorSize },
  pin: { pins }
}: IndexTypes) => AddUrlImageProps & { pins: PinProps[] } = ({
  url: { imagePath, imageWidth, imageHeight, monitorSize },
  pin: { pins }
}) => ({
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
