import { delay } from 'redux-saga'
import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { START_CLOCK, PAUSE_CLOCK } from 'ducks'

const MINIMUM_MS = 100

export default function* rootSaga () {
  while (yield take(START_CLOCK)) {
    const clock = yield fork(runClock)
    yield take(PAUSE_CLOCK)
    yield cancel(clock)
  }
}

function* runClock () {
  while (true) {
    yield call(delay, MINIMUM_MS)
    yield put({ type: 'increment-milliseconds' })
  }
}
