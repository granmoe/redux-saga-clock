import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { attemptLogin } from 'ducks/auth'
import LoginError from './login-error.jsx'
import './login-form.less'

export default class LoginForm extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  state = { email: '', password: '' }

  render () {
    const { loginError, attemptLogin } = this.props
    const { email, password } = this.state

    return (
      <div className="login-form">
        { loginError && <LoginError error={ loginError } /> }
        <input className="login-form__email" value={ email }
          onChange={ e => this.setState({ email: e.target.value }) }
        />
        <input className="login-form__password" value={ password } type="password"
          onChange={ e => this.setState({ password: e.target.value }) }
        />
        <button className="login-form__submit-btn" onClick={ () => attemptLogin({ email, password: this.refs.password.state.value }) }>
          Login
        </button>
      </div>
    )
  }
}

export default connect(state => ({ loginError: state.loginError }), { attemptLogin })(LoginForm)
