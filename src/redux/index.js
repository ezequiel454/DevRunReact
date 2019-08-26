import {
  createStore,
  applyMiddleware
} from 'redux'

import createSagaMidleware from 'redux-saga'
import logger from 'redux-logger'
import sagas from './sagas'
import reducers from './reducers'

const sagaMidleware = createSagaMidleware()
export default createStore(
  reducers,
  applyMiddleware(sagaMidleware, logger)
)
sagaMidleware.run(sagas)

/*
let store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) */
