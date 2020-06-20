import { combineReducers } from 'redux'
import urlReducer from './urls/reducer'
import { UrlStateType } from './urls/actions'
import pinReducer from './pins/reducer'
import { PinStateType } from './pins/actions'

export type allActionTypes = UrlStateType | PinStateType

const rootReducer = combineReducers({
  url: urlReducer,
  pin: pinReducer
})

export type StoreState =
  | ReturnType<typeof rootReducer>
  | ReturnType<typeof pinReducer>
export default rootReducer
