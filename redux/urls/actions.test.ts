import {
  ADD_URL_STATE,
  REMOVE_URL_STATE,
  ADD_URL_IMAGE,
  addUrlStateValue,
  removeUrlStateValue,
  addUrlImage
} from './actions'

describe('URLS ACTIONS', () => {
  it('[ACTION]ADD_URL_STATE', () => {
    const testPayload = {
      src: 'test'
    }
    const expectedAction = {
      type: ADD_URL_STATE,
      payload: testPayload
    }
    expect(addUrlStateValue(testPayload)).toEqual(expectedAction)
  })
  it('[ACTION]REMOVE_URL_STATE', () => {
    const testPayload = {
      src: 'test'
    }
    const expectedAction = {
      type: REMOVE_URL_STATE,
      payload: testPayload
    }
    expect(removeUrlStateValue(testPayload)).toEqual(expectedAction)
  })
  it('[ACTION]ADD_URL_IMAGE', () => {
    const testPayload = {
      imagePath: 'test',
      imageWidth: 1000,
      imageHeight: 500
    }
    const expectedAction = {
      type: ADD_URL_IMAGE,
      payload: testPayload
    }
    expect(addUrlImage(testPayload)).toEqual(expectedAction)
  })
})
