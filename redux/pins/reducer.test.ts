import { ADD_PIN_STATE } from './actions'
import pinReducer, { PinProps } from './reducer'

const dummyPinState: PinProps = {
  x: 0,
  y: 0,
  text: 'test'
}

describe('URLS REDUCER', () => {
  it('登録されていないACTIONを渡すと初期値を返すか', () => {
    expect(
      pinReducer(undefined, {
        type: 'FOOBAR',
        payload: [dummyPinState]
      })
    ).toEqual({
      pins: []
    })
  })
  it('[ACTION]ADD_PIN_STATE', () => {
    expect(
      pinReducer(undefined, {
        type: ADD_PIN_STATE,
        payload: {
          pins: [dummyPinState]
        }
      })
    ).toEqual({
      pins: {
        pins: [dummyPinState]
      }
    })
  })
})
