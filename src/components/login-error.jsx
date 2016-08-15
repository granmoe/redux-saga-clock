import React from 'react'

// import './login-error.less'

export default class LoginError extends React.Component {
  render () {
    const { error } = this.props

    return (
      <div>login error{error}</div>
    )
  }
}
