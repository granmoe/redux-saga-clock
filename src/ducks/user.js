import Immutable from 'immutable'

const SOME_ACTION = 'some-action'

export default function reducer (currentState, action) {
  currentState = currentState.get('user')

  switch (action.type) {
    case SOME_ACTION:
      return currentState.set('someProperty', action.data)
    default:
      return currentState
  }
}

/* action creators below this line */
export function someAction (data) {
  type: SOME_ACTION,
  data
}
