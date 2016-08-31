import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { attemptLogin } from 'ducks/sagas'
import LoginError from './login-error.jsx'
import './login-form.less'

export default class LoginForm extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  state = { username: '', password: '' }

  render () {
    const { loginError, attemptLogin } = this.props
    const { username, password } = this.state

    return (
      <div className="login-form">
        { loginError && <LoginError error={ loginError } /> }
        <input className="login-form__username" value={ username }
          onChange={ (e) => this.setState({ username: e.target.value }) }
        />
        <input className="login-form__password" value={ password }
          onChange={ (e) => this.setState({ password: e.target.value }) }
        />
        <button className="login-form__submit-btn" onClick={ () => attemptLogin({ username, password }) }>
          Login
        </button>
      </div>
    )
  }
}

export default connect(state => ({ loginError: state.loginError }), dispatch => bindActionCreators({ attemptLogin }, dispatch))(LoginForm)
