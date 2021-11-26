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

  describe('should give quantity days between days', () => {
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

  describe('should give quantity hours between hours', () => {
    it('with diference of 1 hour', () => {
      const dataDe = '2021-11-10 09:00:00'
      const dataAte = new Date('2021-11-10 10:00:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('1 hora atrás')
    })

    it('with difference of hours', () => {
      const dataDe = '2021-11-10 09:00:00'
      const dataAte = new Date('2021-11-10 11:00:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('2 horas atrás')
    })
  })

  describe('should give quantity minutes between minutes', () => {
    it('with difference of 10 minutes', () => {
      const dataDe = '2021-11-10 10:40:00'
      const dataAte = new Date('2021-11-10 10:50:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('10 minutos atrás')
    })

    it('with diference of 1 minute', () => {
      const dataDe = '2021-11-10 10:40:00'
      const dataAte = new Date('2021-11-10 10:41:00')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('1 minuto atrás')
    })
  })

  describe('should give seconds between seconds', () => {
    it('with difference of 10 seconds', () => {
      const dataDe = '2021-11-10 10:00:10'
      const dataAte = new Date('2021-11-10 10:00:30')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('20 segundos atrás')
    })

    it('with diference of 1 second', () => {
      const dataDe = '2021-11-10 10:00:02'
      const dataAte = new Date('2021-11-10 10:00:03')

      expect(getDiffTimeBetweenCurrentDate(dataDe, dataAte))
        .toBe('1 segundo atrás')
    })
  })
})
