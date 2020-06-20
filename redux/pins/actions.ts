import { AddPinProps, allPinsProps } from '~/redux/pins/reducer'

// constants
export const ADD_PIN_STATE = 'ADD_PIN_STATE' as const

type Props = {
  type: string
  payload: allPinsProps
}

export const addPinStateValue: (payload: AddPinProps) => Props = (payload) => ({
  type: ADD_PIN_STATE,
  payload
})

export type PinStateType = ReturnType<typeof addPinStateValue>
