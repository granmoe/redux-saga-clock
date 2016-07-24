import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from 'components/app'

export default (store) => {
  return (
    <Route path="/" component={App}>
    </Route>
  )
}

// <Route path="/" component={App}>
//   <IndexRoute component={SomePage} />
//   <Route path="example" component={SomePage} />
//   <Route path="*" component={LoadFailureComponent} status={404} />
// </Route>/
