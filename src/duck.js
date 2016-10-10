import { MINIMUM_MS } from 'config'

export const initialState = {
  milliseconds: 0
}

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case RESET_CLOCK:
      return {
        ...currentState,
        milliseconds: 0
      }
    case INCREMENT_MILLISECONDS:
      return {
        ...currentState,
        milliseconds: currentState.milliseconds + MINIMUM_MS
      }
    case DECREMENT_MILLISECONDS:
      if (!currentState.milliseconds) { return currentState }

      return {
        ...currentState,
        milliseconds: currentState.milliseconds - MINIMUM_MS
      }
    default:
      return currentState
  }
}

const RESET_CLOCK = 'reset-clock'
const INCREMENT_MILLISECONDS = 'increment-milliseconds'
const DECREMENT_MILLISECONDS = 'decrement-milliseconds'

export const resetClock = () => ({ type: RESET_CLOCK })
export const incrementMilliseconds = () => ({ type: INCREMENT_MILLISECONDS })
export const decrementMilliseconds = () => ({ type: DECREMENT_MILLISECONDS })
