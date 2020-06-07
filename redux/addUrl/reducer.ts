import { ADD_URL_STATE, AddUrlStateType } from './actions'

export type AddUrlProps = {
  url: string
}

const init: AddUrlProps = {
  url: ''
}

export default function addUrlReducer(
  state: AddUrlProps = init,
  action: AddUrlStateType
): AddUrlProps {
  const { type, payload } = action

  switch (type) {
    case ADD_URL_STATE:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export type AddUrlState = ReturnType<typeof addUrlReducer>
