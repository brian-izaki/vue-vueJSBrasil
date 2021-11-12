import { reactive } from '@vue/reactivity'

// store para verifica loading entre requisições diferentes
const state = reactive({
  isLoading: false
})

export default state

export function setGlobalLoading (status) {
  state.isLoading = status
}
