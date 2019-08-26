import ActionCreators from '../actionCreators'
import { put } from 'redux-saga/effects'

export const getRuns = ({ api }) => function * (action) {
  let filter = ''
  if (action.admin) {
    filter = '?admin=true'
  }
  try {
    const runs = yield api.getRuns(filter)
    yield put(ActionCreators.getRunsSuccess(runs.data.data))
  } catch (e) {
    yield put(ActionCreators.authFailure(e))
  }
}

export const createRun = ({ api }) => function * (action) {
  const run = yield api.createRun(action.run)
  yield put(ActionCreators.createRunSuccess(run.data))
}

export const removeRun = ({ api }) => function * (action) {
  yield api.removeRun(action.id)
  yield put(ActionCreators.removeRunSuccess(action.id))
}
