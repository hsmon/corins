import { ADD_PIN_STATE, addPinStateValue } from './actions'
import { PinProps } from './reducer'

const dummyPinState: PinProps = {
  x: 0,
  y: 0,
  text: 'test'
}

describe('URLS ACTIONS', () => {
  it('[ACTION]ADD_URL_STATE', () => {
    const testPayload = {
      pins: [dummyPinState]
    }
    const expectedAction = {
      type: ADD_PIN_STATE,
      payload: testPayload
    }
    expect(addPinStateValue(testPayload)).toEqual(expectedAction)
  })
})
