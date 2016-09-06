import Immutable from 'immutable'

const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN' // TODO: Pull action type constants from common file and avoid namespacing problem somehow

export const initialState = Immutable.fromJS({ token: null })

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    default:
      return currentState
  }
}

/* action creators below this line */
export function attemptLogin ({ email, password }) {
  return {
    type: ATTEMPT_LOGIN,
    email,
    password
  }
}
