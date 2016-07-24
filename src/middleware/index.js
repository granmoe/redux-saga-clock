import Immutable from 'immutable'
import { applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import createLogger from 'redux-logger'
import { persistState } from 'redux-devtools'

import DevTools from 'components/devtools.jsx'

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development'

export default function buildEnhancers () {
  const middleware = [routerMiddleware(hashHistory)]
  let enhancers

  if (__DEVELOPMENT__) {
    middleware.push(createLogger({
      collapsed: true,
      stateTransformer (state) {
        if (Immutable.Map.isMap(state) || Immutable.List.isList(state)) {
          return state.toJS()
        }
        return state
      }
    }))

    enhancers = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  } else {
    enhancers = applyMiddleware(...middleware)
  }

  return enhancers
}
