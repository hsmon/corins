import { PinProps } from '~/redux/pins/reducer'

type IndexTypes = {
  url: {
    src: string
    imagePath: string
    imageWidth: number
    imageHeight: number
    username: string
    password: string
    monitorSize: string
  }
  pin: {
    pins: PinProps[]
  }
}

export const urlSelector: ({
  url: {
    src,
    imagePath,
    imageWidth,
    imageHeight,
    username,
    password,
    monitorSize
  },
  pin: { pins }
}: IndexTypes) => {
  src: string
  imagePath: string
  imageWidth: number
  imageHeight: number
  username: string
  password: string
  monitorSize: string
  pins: PinProps[]
} = ({
  url: {
    src,
    imagePath,
    imageWidth,
    imageHeight,
    username,
    password,
    monitorSize
  },
  pin: { pins }
}) => ({
  src,
  imagePath,
  imageWidth,
  imageHeight,
  username,
  password,
  monitorSize,
  pins
})
