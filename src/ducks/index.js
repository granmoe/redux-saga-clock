export const initialState = {
  isPaused: true,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
}

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case 'start-clock':
      return {
        ...currentState,
        isPaused: false
      }
    case 'pause-clock':
      return {
        ...currentState,
        isPaused: true
      }
    case 'reset-minutes':
      return {
        ...currentState,
        minutes: 0
      }
    case 'reset-seconds':
      return {
        ...currentState,
        seconds: 0
      }
    case 'reset-milliseconds':
      return {
        ...currentState,
        milliseconds: 0
      }
    case 'increment-minutes':
      return {
        ...currentState,
        minutes: currentState.minutes + 1 // TODO: Put logic to set back to 0 here instead of in saga
      }
    case 'increment-seconds':
      return {
        ...currentState,
        seconds: currentState.seconds + 1
      }
    case 'increment-milliseconds':
      return {
        ...currentState,
        milliseconds: currentState.milliseconds + 100
      }
    default:
      return currentState
  }
}

// need these to be separate so they can be imported in saga
export const startClockAction = {
  type: 'start-clock'
}

export const pauseClockAction = {
  type: 'pause-clock'
}

export const startClock = () => startClockAction

export const pauseClock = () => pauseClockAction
