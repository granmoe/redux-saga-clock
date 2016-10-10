import { delay, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { MINIMUM_MS } from 'config'
import { incrementMilliseconds, decrementMilliseconds } from 'duck'

const START_CLOCK = 'start-clock'
const PAUSE_CLOCK = 'pause-clock'
const REWIND_CLOCK = 'rewind-clock'

export const startClock = () => ({ type: START_CLOCK })
export const pauseClock = () => ({ type: PAUSE_CLOCK })
export const rewindClock = () => ({ type: REWIND_CLOCK })

export default function* rootSaga () {
  yield takeLatest([START_CLOCK, PAUSE_CLOCK, REWIND_CLOCK], handleClockAction)
}

function* handleClockAction (action) {
  if (action.type === START_CLOCK || action.type === REWIND_CLOCK) {
    yield call(runClock, action.type === START_CLOCK)
  }
}

function* runClock (forward = true) {
  while (true) {
    yield call(delay, MINIMUM_MS)

    if (forward) {
      yield put(incrementMilliseconds())
    } else {
      yield put(decrementMilliseconds())
    }
  }
}
