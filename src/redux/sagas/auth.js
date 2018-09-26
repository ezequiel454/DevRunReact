import jwtDecode from 'jwt-decode'

import { put, call } from 'redux-saga/effects'
import ActionCreators from '../actionCreators'

export const login = ({ api }) => function* (action) {
  let token = ''
  const login = yield call(api.login, {
    email: action.email,
    passwd: action.passwd
  })
  if (login.data.token) {
    token = login.data.token
    localStorage.setItem('token', token)

    const user = jwtDecode(token)
    yield put(ActionCreators.signinSuccess(user))
  } else {
    yield put(ActionCreators.signinFailure(login.data.message))
  }
}

export const updateProfile = ({ api }) => function* (action){
  const userToSave = {
    ...action.user
  }
  yield call (api.updateUser, userToSave)
  yield put(ActionCreators.updateProfileSuccess(userToSave))
}

export const createProfile = ({ api }) => function* (action){
  const userToSave = {
    ...action.user
  }
  const user = yield call(api.createUser, userToSave)
  if(user && user.data && user.data.error){
    yield put(ActionCreators.createProfileFailure(user.data.message))
  }else{
    yield put(ActionCreators.updateProfileSuccess(user))
    yield put(ActionCreators.signinRequest(userToSave.email, userToSave.passwd))
  }
}

export const auth = ({ api }) => function* () {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      //const user = jwtDecode(token)
      const user = yield call(api.getUser, 'me')
      yield put(ActionCreators.authSuccess(user.data))
    } catch (err) {
      yield put(ActionCreators.authFailure('invalid token'))
    }
  } else {
    yield put(ActionCreators.authFailure('no token'))
  }
}

export function* destroyAuth () {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  yield put(ActionCreators.destroyAuthSuccess())
}