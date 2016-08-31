import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { attemptLogin } from 'ducks/sagas'
import LoginError from './login-error.jsx'
import './login-form.less'

export default class LoginForm extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  state = { email: '', password: '' }

  render () {
    const { loginError, attemptLogin } = this.props
    const { email, password } = this.state
    const maskedPassword = password.replace(/./g, '•')

    return (
      <div className="login-form">
        { loginError && <LoginError error={ loginError } /> }
        <input className="login-form__email" value={ email }
          onChange={ e => this.setState({ email: e.target.value }) }
        />
        <input className="login-form__password" value={ maskedPassword }
          onChange={ this.handlePasswordChange }
        />
        <button className="login-form__submit-btn" onClick={ () => attemptLogin({ email, password }) }>
          Login
        </button>
      </div>
    )
  }

  handlePasswordChange = e => {
    let newValue = e.target.value
    let oldValue = this.state.password
    let password = oldValue.slice(0, newValue.length) + newValue.slice(oldValue.length, newValue.length)

    this.setState({ password })
  }
}

export default connect(state => ({ loginError: state.loginError }), dispatch => bindActionCreators({ attemptLogin }, dispatch))(LoginForm)
