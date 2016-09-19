import React from 'react'
import { connect } from 'react-redux'

import { startClock, pauseClock, resetClock } from 'ducks'
import './app.less'

// TODO: Generate clock hand and background colors?
// TODO: Generate clock hand values pseudo-randomly on mount
// TODO: What to do with last hand?

// BINARY
// const CLOCK_HANDS_IN_MS = [ 12800, 6400, 3200, 1600, 800, 400, 200, 100 ]

// TERNARY
// const CLOCK_HANDS_IN_MS = [ 72600, 24300, 8100, 2700, 900, 300, 100 ]

// mixed
const CLOCK_HANDS_IN_MS = [ 144000, 36000, 12000, 2000, 400, 100 ]

const MAX_RADIUS = 40

class ClockApp extends React.Component {
  render () {
    const { hands, startClock, pauseClock, resetClock, strokeWidth } = this.props

    return (
      <svg onMouseEnter={ () => startClock() } onMouseLeave={ () => pauseClock() }
        onClick={ () => resetClock() } className="clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        { hands.map((hand, index) => {
          const { radius, circumference, position, alpha } = hand
          return (
            <circle key={ index } cx="50" cy="50" r={ radius } stroke={ `rgba(1,1,1,${alpha})` } fill="none"
              strokeWidth={ strokeWidth } strokeDasharray={ circumference } strokeDashoffset={ position } />
          )
        }) }
      </svg>
    )
  }
}

const getTicks = (currentTime, clockHandValues) => {
  let remainingTime = currentTime
  return clockHandValues.reduce((ticks, msPerTick) => {
    ticks.push(Math.floor(remainingTime / msPerTick))
    remainingTime = remainingTime % msPerTick
    return ticks
  }, [])
}

export default connect(state => {
  const strokeWidth = MAX_RADIUS / CLOCK_HANDS_IN_MS.length
  const currentTime = state.milliseconds
  const ticks = getTicks(currentTime, CLOCK_HANDS_IN_MS)

  const hands = CLOCK_HANDS_IN_MS.map((ms, idx) => {
    const radius = strokeWidth * (CLOCK_HANDS_IN_MS.length - idx)
    const circumference = 2 * Math.PI * radius
    const offset = state.milliseconds >= ms ? 1 : 0
    const alpha = 1 - idx / CLOCK_HANDS_IN_MS.length

    const numTicks = ticks[idx]
    let maxTicks = CLOCK_HANDS_IN_MS[idx - 1] / ms
    if (isNaN(maxTicks)) { maxTicks = 1 }

    const position = circumference - ((numTicks + offset) / maxTicks * circumference)

    return {
      radius,
      circumference,
      position,
      alpha
    }
  })

  return {
    strokeWidth,
    hands
  }
}, ({
  startClock,
  pauseClock,
  resetClock
}))(ClockApp)
