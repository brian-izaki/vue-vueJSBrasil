/**
 * validações possuem o seguinte fluxo:
 * |_ se for válido
 *   |_ retorna um valor booleano true
 * |_ se não for válido
 *   |_ retorna uma string de mensagem
 */

// é uma boa prática permitir retorno com tipos diferentes?
export function validateEmptyAndLength3 (value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }

  if (value.length < 3) {
    return '*Este campo precisa de no mínimo 3 caracteres'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }

  // o método test() é algo do próprio regex no JS.
  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!isValid) {
    return '*Este campo precisa ser um e-mail'
  }

  return true
}
