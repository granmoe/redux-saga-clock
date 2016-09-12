import React from 'react'

import './login-error.less'

export default class LoginError extends React.Component {
  render () {
    const { errorMessage } = this.props

    return (
      <div className="login-error">{ errorMessage }</div>
    )
  }
}
