import { createStore, compose, applyMiddleware } from 'redux'
import reducers, { StoreState, allActionTypes } from './rootReducer'
import createSagaMiddleware from 'redux-saga'

// Windowの型を拡張する
interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}
declare let window: ExtendedWindow

// Redux DevTools用のEnhancers
const composeEnhancers = (() => {
  return (
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose
  )
})()

const rootReducer: (
  state: StoreState | undefined,
  action: allActionTypes
) => StoreState = (state, action) => {
  if (action?.type === '_TEST_RESET_ALL_STORE') {
    state = undefined
  }
  return reducers(state, action)
}

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
