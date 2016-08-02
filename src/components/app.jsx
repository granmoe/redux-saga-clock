import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { callIncrementAsync } from '../ducks/auth'
import './app.less'

class AuthApp extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    return (
      <div>
        <div className="app">Yo!</div>
        <button onClick={ () => this.props.actions.callIncrementAsync() }>
          Click Me
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ callIncrementAsync }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(AuthApp)
