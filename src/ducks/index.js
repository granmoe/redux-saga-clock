import user from './user'
import initialState from 'store/initial-state'

const reducers = {
  user
}

export default function (currentState = initialState, action) {
  let nextState = currentState

  Object.keys(reducers).forEach(reducerName => {
    const reducedState = reducers[reducerName](nextState, action)

    if (typeof reducedState === 'undefined') {
      throw new Error(`Reducer "${reducerName}" returned undefined when handling "${action.type}" action. To ignore an action, you must explicitly return the previous state.`)
    }

    nextState = nextState.set(reducerName, reducedState)
  })

  return nextState
}
