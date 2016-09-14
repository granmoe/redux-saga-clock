import { delay } from 'redux-saga'
import { call, cancel, fork, put, select, take } from 'redux-saga/effects'

export default function* rootSaga () {
  while (yield take('start-clock')) {
    const clock = yield fork(minutes)
    yield take('pause-clock')
    yield cancel(clock)
  }
}

function* minutes () {
  let _minutes = yield select(state => state.minutes)
  for (let minutes = _minutes; minutes < 60; minutes++) {
    yield call(seconds)
    yield put({ type: 'increment-minutes' })
  }
}

function* seconds () {
  let _seconds = yield select(state => state.seconds)
  for (let seconds = _seconds; seconds < 60; seconds++) {
    yield call(milliseconds)
    yield put({ type: 'increment-seconds' })
  }
}

function* milliseconds () {
  let _milliseconds = yield select(state => state.milliseconds)
  for (let milliseconds = _milliseconds; milliseconds < 1000; milliseconds = milliseconds + 100) {
    yield call(delay, 100)
    yield put({ type: 'increment-milliseconds' })
  }
}
