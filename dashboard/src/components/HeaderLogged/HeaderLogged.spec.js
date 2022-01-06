import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HeaderLogged from '.'
import { routes } from '../../router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// simula uma store apenas com os dados a serem utilizados no teste.
const mockStore = { currentUser: {} }
// o mock vai "enganar" o componente no momento da importação.
jest.mock('../../hooks/useStore', () => {
  // return deve simular o retorno que useStore faria.
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render 3 dots when there\'s not user logged', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLoggout = wrapper.find('#logout-button')
    expect(buttonLoggout.text()).toBe('...')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render user when there\'s not user logged', async () => {
    router.push('/')
    await router.isReady()

    // deve preparar o store pra ter dados ao montar o componente
    mockStore.currentUser.name = 'Brian'

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLoggout = wrapper.find('#logout-button')
    expect(buttonLoggout.text()).toBe('Brian (sair)')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
