import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// TODO: Logout button component

class UserHome extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    return (
      <div>
        <p>User home placeholder</p>
      </div>
    )
  }
}

export default connect(state => ({ userData: state.userData }))(UserHome)
