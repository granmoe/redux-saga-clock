import { take, call, put, cancelled, fork, cancel } from 'redux-saga/effects'

import { HTTP } from 'utils/http'
import CONSTANTS, { ATTEMPT_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from 'constants'

export function* loginFlow () {
  while (true) {
    const { email, password } = yield take(ATTEMPT_LOGIN)
    const task = yield fork(authorize, email, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])

    if (action.type === 'LOGOUT') {
      yield cancel(task)
      // yield call(Api.clearItem, 'token') actually logout with backend
    }
  }
}

export function* authorize (username, password) { // SUBORDINATE of loginFlow
  try {
    const userData = yield call(requestToken, username, password)
    yield put({ type: LOGIN_SUCCESS, userData })
  } catch (error) {
    const errorMessage = error && error.body && error.body.error_description || CONSTANTS.UNKNOWN_ERROR_MESSAGE
    yield put({ type: LOGIN_ERROR, errorMessage })
  } finally {
    // ... put special cancellation handling code here "dispatch a dedicated action RESET_LOGIN_PENDING, more simply, make the reducer clear the isLoginPending on a LOGOUT action"
    if (yield cancelled()) {}
  }
}

export function requestToken (username, password) { // SUBORDINATE of authorize
  const contentHeader = { 'Content-Type': 'application/x-www-form-urlencoded' }
  const data = { username, password, appName: CONSTANTS.APP_NAME, grant_type: 'password' }

  return HTTP.post(`${CONSTANTS.API_URL}/token`, data, contentHeader)
    .then(res => res, res => { throw res })
}

export default function* rootSaga () {
  // could do...
  // const generators = [...someDuckGens, ...someOtherDuckGens, ...yetAnotherDuckGens]
  const generators = [loginFlow]

  yield generators.map(call)
  // or could use fork effect on generator array?
}

// export function* incrementAsync () {
//   while (yield take('CALL_INCREMENT_ASYNC')) {
//     yield call(delay, 1000)
//     yield put({ type: 'INCREMENT_ASYNC' })
//   }
// }
//
