import Immutable from 'immutable'

import { ATTEMPT_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from 'constants'

export const initialState = Immutable.fromJS({
  access_token: null,
  appName: null,
  expires_in: null,
  firstName: null,
  fullName: null,
  lastName: null,
  regId: null,
  role: null,
  token_type: null,
  userId: null,
  username: null
})

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Immutable.fromJS(action.userData)
    case LOGIN_ERROR:
      return currentState.set('errorMessage', action.errorMessage)
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
