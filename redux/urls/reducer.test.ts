import { ADD_URL_STATE, REMOVE_URL_STATE, ADD_URL_IMAGE } from './actions'
import urlReducer, { AllUrlProps } from './reducer'

const dummyUrlState: AllUrlProps = {
  src: 'http://example.com',
  username: 'test',
  password: 'test',
  monitorSize: 'PC'
}

describe('URLS REDUCER', () => {
  it('登録されていないACTIONを渡すと初期値を返すか', () => {
    expect(
      urlReducer(undefined, {
        type: 'FOOBAR',
        payload: dummyUrlState
      })
    ).toEqual({
      src: ''
    })
  })
  it('[ACTION]ADD_URL_STATE', () => {
    expect(
      urlReducer(undefined, {
        type: ADD_URL_STATE,
        payload: dummyUrlState
      })
    ).toEqual({
      src: 'http://example.com',
      username: 'test',
      password: 'test',
      monitorSize: 'PC'
    })
  })
  it('[ACTION]REMOVE_URL_STATE', () => {
    expect(
      urlReducer(undefined, {
        type: REMOVE_URL_STATE,
        payload: dummyUrlState
      })
    ).toEqual({
      src: 'http://example.com',
      username: 'test',
      password: 'test',
      monitorSize: 'PC'
    })
  })
  it('[ACTION]ADD_URL_IMAGE', () => {
    expect(
      urlReducer(undefined, {
        type: ADD_URL_IMAGE,
        payload: dummyUrlState
      })
    ).toEqual({
      src: 'http://example.com',
      username: 'test',
      password: 'test',
      monitorSize: 'PC'
    })
  })
})
