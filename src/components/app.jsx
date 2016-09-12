import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import LoginForm from './login-form.jsx'
import UserHome from './user-home.jsx'

import './app.less'

class AuthApp extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    return (
      <div className="app">
        Saga async flow example

        { this.props.isLoggedIn ? (
          <UserHome />
        ) : (
          <LoginForm />
        ) }
      </div>
    )
  }
}

export default connect(state => ({ isLoggedIn: state.isLoggedIn }))(AuthApp)
