// import all saga actions from various ducks, then re-export below

export default function* () {
  yield (console.log('hello from saga'))
}
