import { ADD_URL_STATE, REMOVE_URL_STATE, UrlStateType } from './actions'

export type AddUrlProps = {
  src: string
}

export type RemoveUrlProps = {
  src: null
}

export type allUrlProps = AddUrlProps | RemoveUrlProps

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
    default:
      return state
  }
}

export type UrlState = ReturnType<typeof urlReducer>
