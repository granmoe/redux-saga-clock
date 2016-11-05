import { delay, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { MINIMUM_MS } from 'config'

const initialState = {
  milliseconds: 0
}

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case 'reset-clock':
      return {
        ...currentState,
        milliseconds: 0
      }
    case 'increment-milliseconds':
      return {
        ...currentState,
        milliseconds: currentState.milliseconds + MINIMUM_MS
      }
    case 'decrement-milliseconds':
      if (!currentState.milliseconds) { return currentState }

      return {
        ...currentState,
        milliseconds: currentState.milliseconds - MINIMUM_MS
      }
    default:
      return currentState
  }
}

// actions
export const resetClock = () => ({ type: 'reset-clock' })
export const incrementMilliseconds = () => ({ type: 'increment-milliseconds' })
export const decrementMilliseconds = () => ({ type: 'decrement-milliseconds' })

// saga actions
export const startClock = () => ({ type: 'start-clock' })
export const pauseClock = () => ({ type: 'pause-clock' })
export const rewindClock = () => ({ type: 'rewind-clock' })

// saga
export function* rootSaga () {
  yield takeLatest(['start-clock', 'pause-clock', 'rewind-clock'], handleClockAction)
}

function* handleClockAction (action) {
  if (action.type === 'start-clock') {
    yield call(runClockForwards)
  } else if (action.type === 'rewind-clock') {
    yield call(runClockBackwards)
  }
}

function* runClockForwards () {
  while (true) {
    yield call(delay, MINIMUM_MS)
    yield put(incrementMilliseconds())
  }
}

function* runClockBackwards () {
  while (true) {
    yield call(delay, MINIMUM_MS)
    yield put(decrementMilliseconds())
  }
}
