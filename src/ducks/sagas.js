import { take, call, put, cancelled, fork, cancel } from 'redux-saga/effects'
import { HTTP } from 'utils/http'
import CONSTANTS from 'constants'

const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN' // TODO: Pull action type constants from common file and avoid namespacing problem somehow

export function* loginFlow () {
  while (true) {
    const { email, password } = yield take(ATTEMPT_LOGIN)
    const task = yield fork(authorize, email, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])

    if (action.type === 'LOGOUT') {
      yield cancel(task)
      // yield call(Api.clearItem, 'token')
      // reset auth data in app state
    }
  }
}

export function* authorize (username, password) { // SUBORDINATE of loginFlow
  try {
    const token = yield call(requestToken, username, password)
    yield put({ type: 'LOGIN_SUCCESS', token })
    return token
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
      // dispatch a dedicated action RESET_LOGIN_PENDING
      // more simply, make the reducer clear the isLoginPending on a LOGOUT action
    }
  }
}

export function requestToken (username, password) { // SUBORDINATE of authorize
  const contentHeader = { 'Content-Type': 'application/x-www-form-urlencoded' }
  const data = { username, password, appName: CONSTANTS.APP_NAME, grant_type: 'password' }

  HTTP.post(`${CONSTANTS.API_URL}/token`, data, contentHeader)
    .then(result => result)
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
