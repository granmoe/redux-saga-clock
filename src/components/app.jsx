import React from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import LoginForm from './login-form.jsx'
import UserHome from './user-home.jsx'

import './app.less'

class AuthApp extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    return (
      <div>
        app component
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
