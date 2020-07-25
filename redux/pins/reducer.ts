import { ADD_PIN_STATE, PinStateType } from './actions'

export type PinProps = {
  x: number | 0
  y: number | 0
  text?: string | null
} | null

export type AddPinProps =
  | {
      pins: PinProps[]
    }
  | PinProps[]

export type allPinsProps = AddPinProps

const init: allPinsProps = {
  pins: []
}

export default function pinReducer(
  state: allPinsProps = init,
  action: PinStateType
): allPinsProps {
  const { type, payload } = action

  switch (type) {
    case ADD_PIN_STATE:
      return {
        ...state,
        pins: payload as PinProps[]
      }
    default:
      return state
  }
}

export type PinState = ReturnType<typeof pinReducer>
