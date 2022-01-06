<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div
      class="flex flex-col w-4/5 max-w-6xl py-10"
    >
      <h1 class="text-3x1 font-black text-brand-graydark">
        Instalação e Configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua nova chave de api
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div v-else class="flex py-3 pl-5 w-full lg:w-1/2 mt-2 rounded items-center justify-between bg-brand-gray">
        <span v-if="state.hasError">Erro ao carregar a apikey</span>
        <span v-else id="apikey">{{store.User.currentUser.apiKey}}</span>
        <div class="flex ml-20 mr-5">
          <icon
            @click="handleCopy"
            id="copy-apikey"
            name="copy"
            :color="brandColors.graydark"
            size="34"
            class="p-1 rounded cursor-pointer hover:bg-gray-800 hover hover:bg-opacity-5"
          />

          <icon
            id="generate-apikey"
            @click="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="34"
            class="p-1 rounded cursor-pointer hover:bg-gray-400 hover hover:bg-opacity-5"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-3 pl-5 pr-5 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre id="script-with-apikey">&lt;script src="https://brian-izaki-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import Icon from '../../components/Icon'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import { reactive } from '@vue/reactivity'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { watch } from '@vue/runtime-core'
import { useToast } from 'vue-toastification'

export default {
  name: 'Credencials',
  components: {
    HeaderLogged,
    ContentLoader,
    Icon
  },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      isLoading: false,
      hasError: false
    })

    function handleError (error) {
      state.hasError = !!error
    }

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true

        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)
      } catch (error) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    async function handleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.info('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
