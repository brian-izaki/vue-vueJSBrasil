import { wait } from './timeout'

describe('timeout utils', () => {
  // para voltar o tempo ao normal
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should called one time', () => {
    jest.useFakeTimers()

    wait()

    expect(setTimeout).toHaveBeenCalledTimes(1)
  })

  it.skip('should wait one second', () => {
    // TODO: faser teste esperando 1 segundo
  })
})
