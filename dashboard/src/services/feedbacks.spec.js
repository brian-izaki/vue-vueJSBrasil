import mockAxios from 'axios'
import FeedbackService from './feedbacks'

jest.mock('axios')

describe('Feedbacks service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should give a list of feedbacks', async () => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: mockedData })
    })

    const response = await FeedbackService(mockAxios).getAll({
      type: 'IDEA',
      offset: 0,
      limit: 5
    })

    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')

    expect(response.data.results).toHaveLength(5)
  })
})

const mockedData = {
  results: [
    {
      text: 'Podia ter um botão de solicitar demo 1',
      fingerprint: '490135491',
      id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
      apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
      type: 'IDEA',
      device: 'Chrome 85.0, macOS 10.14',
      page: 'https://feedbacker.com/pricing',
      createdAt: 1608681600000
    },
    {
      text: 'Muito bom!',
      fingerprint: '490135491',
      id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
      apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
      type: 'OTHER',
      device: 'Chrome 85.0, macOS 10.14',
      page: 'https://feedbacker.com/pricing',
      createdAt: 1605225600000
    },
    {
      text: 'Muitos erros slkkkkkkk',
      fingerprint: '490135491',
      id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
      apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
      type: 'ISSUE',
      device: 'Chrome 85.0, macOS 10.14',
      page: 'https://feedbacker.com/pricing',
      createdAt: 1603411200000
    },
    {
      text: 'Podia ter um botão de solicitar demo',
      fingerprint: '490135491',
      id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
      apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
      type: 'IDEA',
      device: 'Chrome 85.0, macOS 10.14',
      page: 'https://feedbacker.com/pricing',
      createdAt: 1600819200000
    },
    {
      text: 'Podia ter um botão de solicitar demo 2',
      fingerprint: '490135491',
      id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
      apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
      type: 'IDEA',
      device: 'Chrome 85.0, macOS 10.14',
      page: 'https://feedbacker.com/pricing',
      createdAt: 1598140800000
    }
  ],
  pagination: {
    offset: 0,
    limit: 5,
    total: 7
  }
}
