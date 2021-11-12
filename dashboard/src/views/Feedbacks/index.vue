<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black to-brand-graydark">
          Listagem
        </h1>

        <!-- tag nova do Vue3, está sendo utilizada pos o componente filters possui um setup com async -->
        <suspense>
          <template #default>
            <filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>

          <template #fallback>
            <filters-loading class="mt-8"/>
          </template>
        </suspense>

      </div>

      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks
        </p>

        <p
          v-if="state.feedbacks.length && state.isLoading"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido
        </p>

        <feedback-card-loading v-if="state.isLoading"/>
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

      </div>
    </div>
  </div>

</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import FiltersLoading from './FiltersLoading.vue'
import Filters from './Filters.vue'
import { reactive } from '@vue/reactivity'
import FeedbackCard from '../../components/FeedbackCard'
import FeedbackCardLoading from '../../components/FeedbackCard/Loading'
import services from '../../services'
import { onMounted } from '@vue/runtime-core'

export default {
  components: {
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading,
    HeaderLogged
  },
  setup () {
    const state = reactive({
      isLoading: false,
      feedbacks: [],
      currentFeedbacktype: '',
      pagination: {
        limit: 5,
        offset: 0
      },
      hasError: false
    })

    onMounted(() => {
      fetchFeedbacks()
    })

    function handleErrors (error) {
      state.hasError = !!error
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbacktype
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoading = false
      }
    }

    return { state }
  }

}
</script>
