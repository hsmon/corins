import { AddUrlProps, RemoveUrlProps, allUrlProps } from '~/redux/urls/reducer'

// constants
export const ADD_URL_STATE = 'ADD_URL_STATE' as const
export const REMOVE_URL_STATE = 'REMOVE_URL_STATE' as const

type Props = {
  type: string
  payload: allUrlProps
}

export const addUrlStateValue: (payload: AddUrlProps) => Props = (payload) => ({
  type: ADD_URL_STATE,
  payload
})

export const removeUrlStateValue: (payload: RemoveUrlProps) => Props = () => ({
  type: REMOVE_URL_STATE,
  payload: {
    src: ''
  }
})

export type UrlStateType =
  | ReturnType<typeof addUrlStateValue>
  | ReturnType<typeof removeUrlStateValue>
