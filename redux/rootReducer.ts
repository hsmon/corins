import { combineReducers } from 'redux'
import urlReducer from './urls/reducer'
import { UrlStateType } from './urls/actions'

export type allActionTypes = UrlStateType

const rootReducer = combineReducers({
  url: urlReducer
})

export type StoreState = ReturnType<typeof rootReducer>
export default rootReducer
