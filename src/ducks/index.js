export const initialState = {
  milliseconds: 0
}

export const START_CLOCK = 'start-clock'
export const PAUSE_CLOCK = 'pause-clock'

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case 'reset-clock':
      return {
        ...currentState,
        milliseconds: 0
      }
    case 'increment-milliseconds':
      let milliseconds = currentState.milliseconds + 100
      return {
        ...currentState,
        milliseconds
      }
    default:
      return currentState
  }
}

export const startClock = () => ({ type: START_CLOCK })
export const pauseClock = () => ({ type: PAUSE_CLOCK })

export const resetClock = () => {
  return {
    type: 'reset-clock'
  }
}
