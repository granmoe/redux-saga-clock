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
    case 'reset-clock':
      return {
        ...currentState,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      }
    case 'increment-minutes':
      let minutes = currentState.minutes + 1
      if (minutes > 59) { minutes = 0 }
      return {
        ...currentState,
        minutes
      }
    case 'increment-seconds':
      let seconds = currentState.seconds + 1
      if (seconds > 59) { seconds = 0 }
      return {
        ...currentState,
        seconds
      }
    case 'increment-milliseconds':
      let milliseconds = currentState.milliseconds + 100
      if (milliseconds > 999) { milliseconds = 0 }
      return {
        ...currentState,
        milliseconds
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
