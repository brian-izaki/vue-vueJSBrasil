import mockAxios from 'axios'
import AuthService from './auth'

// não está sendo utilizado o axios de "verdade"
jest.mock('axios')

describe('AuthService', () => {
  // depois de um teste ele limpa os mocks
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token = '123.123.123'

    // cria um retorno fake
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({
      email: 'brian@gmail.com',
      password: '123'
    })

    expect(response.data).toHaveProperty('token')

    // o jest cria um arquivo em string (para serviços n é bom... mas para componentes sim)
    // dps o jest faz um diff para ver se ocorreu alguma alteração
    expect(response).toMatchSnapshot()
  })

  it('should return an user when user register', async () => {
    const user = {
      name: 'brian',
      password: '123',
      email: 'brian@brian.me'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')

    expect(response).toMatchSnapshot()
  })

  it('should throw an error when there\'s not found', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).login({
      email: 'brian@gmail.com',
      password: '123'
    })
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
