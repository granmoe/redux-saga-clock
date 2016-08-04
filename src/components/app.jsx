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
        <button onClick={ () => this.props.actions.callIncrementAsync() }>
          Increment Async
        </button>
        <p>Counter: { this.props.counter }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({ counter: state.getIn(['auth', 'counter']) })

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ callIncrementAsync }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthApp)
