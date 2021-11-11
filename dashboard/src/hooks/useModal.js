import bus from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

// função responsável por manipular eventos do modal (é utilizado como se fosse serviço mas na vdd é um evento)
export default function useModal () {
  // responsável por emitir o evento de abrir o modal
  function open (payload = {}) {
    // payload vem do objeto de argumento quando utiliza o useModal em um componente
    bus.emit(EVENT_NAME, { status: true, ...payload })
  }

  function close (payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload })
  }

  function listen (fn) {
    bus.on(EVENT_NAME, fn)
  }

  function off (fn) {
    bus.off(EVENT_NAME, fn)
  }

  // listen: para saber ficar vendo quem utiliza o serviço (na vdd ouve eventos indiretamente)
  // off: por lidar com eventos precisa ser encerrado para não ter memory leak
  return { open, close, listen, off }
}
