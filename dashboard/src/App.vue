<template>
  <router-view />
  <modal-factory />
</template>

<script>
import ModalFactory from './components/ModalFactory'
export default {

  components: {
    ModalFactory
  }
}
</script>
