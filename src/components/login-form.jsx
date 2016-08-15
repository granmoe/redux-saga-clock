import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { attemptLogin } from 'ducks/auth'
import LoginError from './login-error.jsx'
// import './login-form.less'

export default class LoginForm extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    const { loginError, attemptLogin } = this.props

    return (
      <div>
        { loginError && <LoginError error={loginError} /> }
        login error <br />
        { /* username and password fields here, and submit button */ }
        login form
      </div>
    )
  }
}

export default connect(state => ({ loginError: state.loginError }), dispatch => bindActionCreators({ attemptLogin }, dispatch))(LoginForm)
