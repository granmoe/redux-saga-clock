import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import Inspector from 'redux-devtools-inspector'
import MultipleMonitors from 'redux-devtools-multiple-monitors'

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultIsVisible={false}>
    <MultipleMonitors>
      <Dispatcher />
      <Inspector supportImmutable={true} />
    </MultipleMonitors>
    <LogMonitor />
  </DockMonitor>
)
