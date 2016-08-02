import { createStore } from 'redux'
import enhancers from 'middleware'
import rootReducer from 'ducks'
import rootSaga from 'ducks/sagas'
import createSagaMiddleware from 'redux-saga'

export default function () {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    enhancers(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  return store
}
