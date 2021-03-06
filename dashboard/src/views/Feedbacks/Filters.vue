<template>
  <div class="flex flex-col">
    <h1 class="text-2x1 font-regular text-brand-darkgray">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        :class="{
          'bg-gray-200 bg-opacity-50': filter.active
        }"
        @click="() => handleSelect(filter)"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
      >
        <p>
          <span
            :class="filter.color.bg"
            class="inline-block w-2 h-2 mr-2 rounded-full"
          />

          {{ filter.label }}
        </p>
        <p>
          <span
            :class="filter.active ? filter.color.text : `text-brand-darkgray`"
            class="font-bold ml-auto"
          >
            {{ filter.amount }}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import useStore from '../../hooks/useStore'
import services from '../../services'

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: { text: 'text-brand-info', bg: 'bg-brand-info' },
  issue: { text: 'text-brand-danger', bg: 'bg-brand-danger' },
  idea: { text: 'text-brand-warning', bg: 'bg-brand-warning' },
  other: { text: 'text-brand-graydark', bg: 'bg-brand-graydark' }
}

function applyFiltersStructure (summary) {
  return Object.keys(summary).reduce((prev, curr) => {
    const currentFilter = {
      label: LABELS[curr],
      color: COLORS[curr],
      amount: summary[curr]
    }

    if (curr === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = curr
    }

    return [...prev, currentFilter]
  }, [])
}

export default {
  name: 'FeedbacksFilters',
  // só dá pra utilizar o async no setup quando utilizar feature do Vue3 que se chama Suspense.

  // no setup, o segundo parâmetro é o contexto do componente
  async setup (props, { emit }) {
    const store = useStore('Global')
    const state = reactive({
      hasError: false,
      filters: [
        { label: null, amount: null }
      ]
    })

    try {
      const { data } = await services.feedbacks.getSummary()
      state.filters = applyFiltersStructure(data)
    } catch (error) {
      state.hasError = !!error
      state.filters = applyFiltersStructure({ all: 0, issue: 0, idea: 0, other: 0 })
    }

    function handleSelect ({ type }) {
      if (store.isLoading) {
        return
      }

      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        }
        return { ...filter, active: false }
      })

      emit('select', type)
    }

    return {
      state,
      handleSelect
    }
  }
}
</script>
