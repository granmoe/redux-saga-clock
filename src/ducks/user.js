import Immutable from 'immutable'

const SOME_ACTION = 'some-action'

export const initialState = Immutable.fromJS({}) // nothing to see here...yet

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case SOME_ACTION:
      return currentState.set('someProperty', action.data)
    default:
      return currentState
  }
}

/* action creators below this line */
export function someAction (data) {
  return {
    type: SOME_ACTION,
    data
  }
}
