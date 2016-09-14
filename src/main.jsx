import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import routes from './routes'

import configureStore from 'store/configure-store'

const store = configureStore()

// start clock

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ browserHistory }>
        { routes(store) }
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
)
