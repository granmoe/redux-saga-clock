import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './app.less'

export default class AuthApp extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    return (
      <div className="app">Yo!</div>
    )
  }
}
