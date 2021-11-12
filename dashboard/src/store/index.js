import { readonly } from '@vue/reactivity'
import UserModule from './user'
import GlobalModule from './global'

// este arquivo segue o conceito da arquitetura flux, sendo o meu objeto um lugar que está centralizando
// states diferentes (neles possuem as mutations, state próprio, etc)

// o readonly vem do vue, ele é responsável por não permitir alterações!
export default readonly({
  User: UserModule,
  Global: GlobalModule
})
