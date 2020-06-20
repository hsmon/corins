import {
  ADD_URL_STATE,
  REMOVE_URL_STATE,
  ADD_URL_IMAGE,
  UrlStateType
} from './actions'

export type AddUrlProps = {
  src: string
}

export type RemoveUrlProps = {
  src: null
}

export type AddUrlImageProps = {
  imagePath: string
  imageWidth: number
  imageHeight: number
}

export type allUrlProps = AddUrlProps | RemoveUrlProps | AddUrlImageProps

const init: allUrlProps = {
  src: ''
}

export default function urlReducer(
  state: allUrlProps = init,
  action: UrlStateType
): allUrlProps {
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
