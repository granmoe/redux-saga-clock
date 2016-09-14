import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { startClock, pauseClock } from 'ducks'
import './app.less'

class ClockApp extends React.Component {
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

  render () {
    const { minutes, seconds, milliseconds, paused, startClock, pauseClock } = this.props

    return (
      <div className="app">
        Redux Saga Clock
        <ul>
          <li>Minutes: { minutes }</li>
          <li>Seconds: { seconds }</li>
          <li>Milliseconds { milliseconds }</li>
        </ul>
        <button className="app__btn" onClick={ () => paused ? startClock() : pauseClock() }>
          { paused ? 'Start Clock' : 'Pause Clock' }
        </button>
      </div>
    )
  }
}

export default connect(state => ({
  minutes: state.minutes,
  seconds: state.seconds,
  milliseconds: state.milliseconds,
  paused: state.isPaused
}), ({
  startClock,
  pauseClock
}))(ClockApp)
