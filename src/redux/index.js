import {
  createStore,
  applyMiddleware
} from 'redux'

import createSagaMidleware from 'redux-saga'
import sagas from './sagas'
import reducers from './reducers'

const sagaMidleware = createSagaMidleware()
export default createStore(
  reducers,
  applyMiddleware(sagaMidleware)
)
sagaMidleware.run(sagas)
