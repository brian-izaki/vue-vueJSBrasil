<template>
  <router-view />
  <modal-factory />
</template>

<script>
import { watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import ModalFactory from './components/ModalFactory'
import services from './services'
import { setCurrentUser } from './store/user'

// manipulação de usuário logado fica aqui
// pois, aqui é o "marco zero" onde todo componente acaba passando antes da montagem.

export default {
  components: {
    ModalFactory
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem('token')
          if (!token) {
            router.push({ name: 'Home' })
            return
          }

          const { data } = await services.users.getMe()
          setCurrentUser(data)
        }
      }
    )
  }
}
</script>
