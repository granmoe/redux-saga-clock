import { take, call, put, cancelled, fork, cancel } from 'redux-saga/effects'
const Api = 'just a placeholder for now'

// export function* incrementAsync () {
//   while (yield take('CALL_INCREMENT_ASYNC')) {
//     yield call(delay, 1000)
//     yield put({ type: 'INCREMENT_ASYNC' })
//   }
// }
//
export function* loginFlow () {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST')
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT') { yield cancel(task) }
    yield call(Api.clearItem, 'token')
  }
}

export function* authorize (user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
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
}
