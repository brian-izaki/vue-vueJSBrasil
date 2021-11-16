<template>
  <custom-header @create-account="handleAcconuntCreate" @login="handleLogin" />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">Feedbacker &copy; 2021</p>
  </div>
</template>

<script>
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import useModal from '../../hooks/useModal'

export default {
  name: 'Home',
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {
      modal.open({
        component: 'ModalLogin'
      })
    }

    function handleAcconuntCreate () {
      modal.open({
        component: 'ModalAccountCreate'
        // poderia passar props para que carreguem dentro do modal
      })
    }

    return {
      handleLogin,
      handleAcconuntCreate
    }
  }
}
</script>
