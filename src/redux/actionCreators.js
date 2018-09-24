import { createActions } from 'reduxsauce'

export const {
  Types,
  Creators
} = createActions({
  signinRequest: ['email', 'passwd'],
  signinSuccess: ['user'],
  signinFailure: ['error'],

  authRequest: null,
  authSuccess: ['user'],
  authFailure: null,

  destroyAuthRequest: null,
  destroyAuthSuccess: null,

  getRunsRequest: ['admin'],
  getRunsSuccess: ['runs'],
  getRunsFailure: null,

  getUsersRequest: null,
  getUsersSuccess: ['users'],
  getUsersFailure: null,

  getUserRequest: ['id'],
  getUserSuccess: ['user'],
  getUserFailure: null,

  removeUserRequest: ['id'],
  removeUserSuccess: ['id'],
  removeUserFailure: ['error'],

  createRunRequest: ['run'],
  createRunSuccess: ['run'],
  createRunFailure: ['error'],
  createRunReset: null,

  removeRunRequest: ['id'],
  removeRunSuccess: ['id'],
  removeRunFailure: ['error'],

  updateProfileRequest: ['user'],
  updateProfileSuccess: ['user'],
  updateProfileFailure: ['error'],
  updateProfileReset: null,

  updateUserRequest: ['user'],
  updateUserSuccess: ['user'],
  updateUserFailure: ['error'],
  updateUserReset: null,

  createProfileRequest: ['user'],
  createProfileSuccess: ['user'],
  createProfileFailure: ['error'],
  createProfileReset: null
})
export default Creators

