import { createStore } from 'redux'
import rootReducer from 'ducks'
import enhancers from 'middleware'

export default function () {
  return createStore(
    rootReducer,
    enhancers()
  )
}
