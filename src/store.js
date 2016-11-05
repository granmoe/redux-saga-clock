import { applyMiddleware, createStore } from 'redux'
import rootReducer, { rootSaga } from 'duck'
import createSagaMiddleware from 'redux-saga'

export default function () {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  return store
}
