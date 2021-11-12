import Store from '../store'

// hook responsável por me retornar dados do store (flux)
export default function useStore (module) {
  if (module) {
    return Store[module]
  }

  return Store
}
