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
        <br />
        <br />
        { [...Array(milliseconds / 10)].map((val, idx) => <span key={ idx }>{ '.' }</span>) }
        <br />
        <br />
        { [...Array(seconds)].map((val, idx) => <span key={ idx }>{ "-" }</span>) }
        <br />
        <br />
        { [...Array(minutes)].map((val, idx) => <span key={ idx }>{ "=" }</span>) }
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
