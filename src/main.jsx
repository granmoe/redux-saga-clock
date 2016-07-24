import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import routes from './routes'

import DevTools from 'components/devtools.jsx'

import configureStore from 'store/configure-store'

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development'

const store = configureStore()

// Any actions that should fire on page load
// store.dispatch(actions.action(data))

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={hashHistory}>
        { routes(store) }
      </Router>
      { __DEVELOPMENT__ && !window.devToolsExtension ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('app')
)
