import { shallowMount } from '@vue/test-utils'
import Contact from './Contact.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Contact />', () => {
  it('should render contact correctly', async () => {
    router.push('/')

    await router.isReady()

    const wrapper = shallowMount(Contact, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
