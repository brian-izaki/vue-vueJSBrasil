import useStore from '../hooks/useStore'
import { setCurrentUser, resetUserStore, setApiKey, cleanCurrentUser } from './user'

describe('UserStore', () => {
  // utilizado para limpar o state e não atrapalhar outros testes
  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Brian' })

    expect(store.User.currentUser.name).toBe('Brian')
  })

  it('should set api_key on current user', () => {
    const store = useStore()
    setApiKey('123')

    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('should clean current user', () => {
    const store = useStore()

    setCurrentUser({ name: 'Brian' })
    expect(store.User.currentUser.name).toBe('Brian')

    cleanCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})
