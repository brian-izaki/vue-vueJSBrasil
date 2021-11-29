import Home from '.'
import { routes } from '../../router'
import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

// ele é necessário pois o componente faz uso do vue-router, e ele é algo que vai
// ficar no nosso main do projeto. para testes é necessário acessar aqui.
const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Home />', () => {
  // é feito um teste snapshot
  it('should render home crrenctly', async () => {
    router.push('/')
    await router.isReady()

    // mount renderiza o componente e os descedentes.
    // shallowMount renderiza apenas o componente, os descendentes não.
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router] // utilizado pois no componente fiz a importação dele
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
