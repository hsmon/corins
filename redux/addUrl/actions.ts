import { AddUrlProps } from '~/redux/addUrl/reducer'

// constants
export const ADD_URL_STATE = 'ADD_URL_STATE' as const

type Props = {
  type: string
  payload: AddUrlProps
}

export const addUrlStateValue: (payload: AddUrlProps) => Props = (payload) => ({
  type: ADD_URL_STATE,
  payload
})
export type AddUrlStateType = ReturnType<typeof addUrlStateValue>
