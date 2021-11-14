<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />

      <span class="font-regular text-brand-grayDark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>

    <div
      class="flex mt-8 animate__animated animate__fadeInUp animante__faster"
      :class="{
        animate__fadeOutUp: state.isClosing
      }"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Página</span
          >
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Dispositivo</span
          >
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Usuário</span
          >
          <span class="font-medium text-gray-700">{{
            feedback.fingerprint
          }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-if="!state.isOpen">
      <icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import Badge from './Badge'
import Icon from '../../components/Icon'
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'
import { wait } from '../../utils/timeout'
import { reactive } from '@vue/reactivity'
import palette from '../../../palette'

export default {
  components: {
    Icon,
    Badge
  },
  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true }
  },
  setup (props) {
    // o iscloing é utilizado para animação qnd fechar o card.
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    // a ideia aqui é ele ativar uma classe de animação por 250ms quando estiver fechando
    // procure o fadeOutUp no código, o animate css aplica o efeito qnd a classe é adicionada ao código
    // ou seja, msm já tendo o animate__fadeInUp, o fadeOut irá aplicar animação qnd for adicionada ao código
    // o tempo de espera, serve para que o card não feche abruptamente, e espere a animação do conteudo desaparecer
    async function handleToggle () {
      state.isClosing = true

      await wait(250)
      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>
