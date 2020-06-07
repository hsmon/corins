import { combineReducers } from 'redux'
import addUrlReducer from './addUrl/reducer'
import { AddUrlStateType } from './addUrl/actions'

export type allActionTypes = AddUrlStateType

const rootReducer = combineReducers({
  addUrl: addUrlReducer
})

export type StoreState = ReturnType<typeof rootReducer>
export default rootReducer
