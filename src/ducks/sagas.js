import { take, call, put, cancelled, fork, cancel } from 'redux-saga/effects'
const Api = 'just a placeholder for now'

const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN'

export function attemptLogin ({ email, password }) {
  return {
    type: ATTEMPT_LOGIN,
    email,
    password
  }
}

export function* loginFlow () {
  while (true) {
    const { email, password } = yield take(ATTEMPT_LOGIN)
    // yield* call(ensureFirebaseConnection)
    const task = yield fork(authorize, email, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']) // or INVALIDATE_AUTH
    if (action.type === 'LOGOUT') { yield cancel(task) }
    yield call(Api.clearItem, 'token')
  }
}

export function* authorize (username, password) {
  try {
    // const token = yield call(firebase.authorize, username, password)
    const token = 'asdf'
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
