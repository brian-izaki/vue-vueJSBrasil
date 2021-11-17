import { getDiffTimeBetweenCurrentDate } from './date'

describe('date utils', () => {
  it('should give null, undefined, true and false values', () => {
    const dataAte = new Date('2021-11-10 00:00:00')

    expect(getDiffTimeBetweenCurrentDate(null, dataAte))
      .toBeNull()

    expect(getDiffTimeBetweenCurrentDate(undefined, dataAte))
      .toBe('')

    expect(getDiffTimeBetweenCurrentDate(true, dataAte))
      .toBe(true)

    expect(getDiffTimeBetweenCurrentDate(false, dataAte))
      .toBe(false)
  })

  it('should return a invalid date', () => {
    const dataDe = '2021-99-00'
    const dataAte = new Date('2021-11-10 00:00:00')

    expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
      .toBe(dataDe)
  })

  describe('should give quantity days between 2 days', () => {
    it('with diferent months', () => {
      const dataDe = '2021-10-10 00:00:00'
      const dataAte = new Date('2021-11-10 00:00:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('31 dias atrás')
    })

    it('with same month', () => {
      const dataDe = '2021-11-10 00:00:00'
      const dataAte = new Date('2021-11-12 00:00:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('2 dias atrás')
    })
  })

  describe('should give quantity hours between 2 hours', () => {
    it('with diference of 1 hour', () => {
      const dataDe = '2021-11-10 09:00:00'
      const dataAte = new Date('2021-11-10 10:00:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('1 hora atrás')
    })

    it('with difference of 2 hours', () => {
      const dataDe = '2021-11-10 09:00:00'
      const dataAte = new Date('2021-11-10 11:00:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('2 horas atrás')
    })
  })
})
