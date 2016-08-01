import { createStore } from 'redux'
import enhancers from 'middleware'
import rootReducer from 'ducks'
import createSagaMiddleware from 'redux-saga'
import sagas from '../ducks/sagas'

export default function () {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    enhancers(sagaMiddleware)
  )

  sagaMiddleware.run(sagas)

  return store
}
