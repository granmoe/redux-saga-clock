import { delay, takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
// import all saga actions from various ducks, then re-export below

// watcher
export function* watchIncrementAsync () {
  yield* takeEvery('CALL_INCREMENT_ASYNC', incrementAsync)
}

// worker
export function* incrementAsync () {
  yield call(delay, 2000)
  yield put({ type: 'INCREMENT_ASYNC' })
}

// single entry point to start all Sagas at once
export default function* rootSaga () {
  yield [
    watchIncrementAsync()
  ]
}
