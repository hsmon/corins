import { MonitorSizeKey } from '~/assets/monitorSize'
import {
  ADD_URL_STATE,
  REMOVE_URL_STATE,
  ADD_URL_IMAGE,
  UrlStateType
} from './actions'

export type AddUrlProps = {
  src: string
  username?: string | null
  password?: string | null
  monitorSize?: MonitorSizeKey
}

export type RemoveUrlProps = {
  src: string | null
}

export type AddUrlImageProps = {
  imagePath: string
  imageWidth: number
  imageHeight: number
}

export type AllUrlProps = AddUrlProps | RemoveUrlProps | AddUrlImageProps

const init: AllUrlProps = {
  src: ''
}

export default function urlReducer(
  state: AllUrlProps = init,
  action: UrlStateType
): AllUrlProps {
  const { type, payload } = action

  switch (type) {
    case ADD_URL_STATE:
      return {
        ...state,
        ...payload
      }
    case REMOVE_URL_STATE:
      return {
        ...state,
        ...payload
      }
    case ADD_URL_IMAGE:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export type UrlState = ReturnType<typeof urlReducer>
