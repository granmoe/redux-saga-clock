import Immutable from 'immutable'

import user, { initialState as userInitialState } from './user'
import auth, { initialState as authInitialState } from './auth'

const reducers = {
  user,
  auth
}

const initialState = Immutable.Map(userInitialState, authInitialState)

export default function (currentState = initialState, action) {
  Object.keys(reducers).forEach(reducerName => {
    const reducedState = reducers[reducerName](currentState.get(reducerName), action)

    if (typeof reducedState === 'undefined') {
      throw new Error(`Reducer "${reducerName}" returned undefined when handling "${action.type}" action. To ignore an action, you must explicitly return the previous state.`)
    }

    currentState = currentState.set(reducerName, reducedState)
  })

  return currentState
}
