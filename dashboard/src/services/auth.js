export default httpClient => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post('/auth/register', {
      email,
      password,
      name
    })

    // serve para adicionar as mensagens de erro e status
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },
  login: async ({ email, password }) => {
    const response = await httpClient.post('/auth/login', {
      email,
      password
    })

    // serve para adicionar as mensagens de erro e status
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})
