import { delay } from 'redux-saga'
import { put, call, take } from 'redux-saga/effects'

export function* incrementAsync () {
  while (yield take('CALL_INCREMENT_ASYNC')) {
    yield call(delay, 2000)
    yield put({ type: 'INCREMENT_ASYNC' })
  }
}

// THUNK VERSION
// export const incrementAsync () {
//   fetch(stuff)
//     .then(res => res.JSONorSomething)
//     .then(actualStuffWeCareAbout => {
//       dispatch(someAction(actualStuffWeCareAbout))
//     })
// }

export default function* rootSaga () {
  // could import arrays of generators from various ducks, then yield gens.map(call) like below
  const generators = [incrementAsync]

  yield generators.map(call)
}
