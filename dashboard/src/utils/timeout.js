export function wait (timeMs = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMs)
  })
}
