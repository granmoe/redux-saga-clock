import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import firebase from 'firebase'

import firebaseConfig from './firebase-config'
import routes from './routes'
import { setFirebaseRef } from './ducks/firebase' // BROKEN: need to implement

import DevTools from 'components/devtools.jsx'

import configureStore from 'store/configure-store'

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development'

const store = configureStore()

// Any actions that should fire on page load...saga?
const app = firebase.initializeApp(firebaseConfig)
store.dispatch(setFirebaseRef(app.database().ref()))

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ browserHistory }>
        { routes(store) }
      </Router>
      { __DEVELOPMENT__ && !window.devToolsExtension ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('app')
)
