<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button
      @click="close"
      class="text-4xl text-gray-600 focus:outline-none"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handlerSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{'border-brand-danger': !!state.email.errorMessage}"
          class="block w-full px-4 py-3 my-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="joe.doe@gmail.com"
        >
        <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{'border-brand-danger': !!state.password.errorMessage}"
          class="block w-full px-4 py-3 my-1 text-lg bg-gray-100 border-2 border-transparent rounded"
        >
        <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{'opacity-50': state.isLoading}"
        class="py-3 px-8 mt-10 text-2x1 font-bold text-white bg-brand-main rounded-full focus:outline-none transition-all duration-150"
      >
        Entrar
      </button>

    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useField } from 'vee-validate'
import useModal from '../../hooks/useModal'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'

export default {
  setup () {
    const modal = useModal()

    // com o hook useField, value passa a representar a model do respectivo input
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    // o segundo argumento se refere a uma fn de validação que recebe o nosso value
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    function handlerSubmit () {

    }

    return { state, close: modal.close, handlerSubmit }
  }
}
</script>
