import ActionCreators from '../actionCreators'
import { put } from 'redux-saga/effects'

export const getUsers = ({ api }) => function * getUsers () {
  try {
    const users = yield api.getUsers()
    yield put(ActionCreators.getUsersSuccess(users.data))
  } catch (e) {
    yield put(ActionCreators.getUsersFailure())
    console.log(e)
  }
}

export const getUser = ({ api }) => function * (action) {
  try {
    const user = yield api.getUser(action.id)
    yield put(ActionCreators.getUserSuccess(user.data))
  } catch (e) {
    yield put(ActionCreators.getUserFailure())
  }
}

export const removeUser = ({ api }) => function * (action) {
  try {
    yield api.removeUser(action.id)
    yield put(ActionCreators.removeUserSuccess(action.id))
  } catch (e) {
    yield put(ActionCreators.removeUserFailure())
  }
}

export const updateUser = ({ api }) => function * (action) {
  try {
    const data = yield api.updateUser(action.user)
    console.log(data)
    yield put(ActionCreators.updateUserSuccess(action.user))
  } catch (e) {
    yield put(ActionCreators.removeUserFailure())
  }
}
