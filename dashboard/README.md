# Dashboard Layout Front-end principal
Aplicação desenvolvida no curso do vue Brasil.

## Iniciar projeto
- **(não é obrigatório)** Utilizado o node na versão 14
  - caso utilize o nvm, digite o comando `nvm use`
- estar no diretório dashboard
```shell
# Instalar dependencias
npm install

# Iniciar projeto em modo Desenvolvimento
npm run serve

# (a vulso) realizar testes unitários
npm run test:unit
```

## Dependencias utilizadas
- criado aplicação com a CLI do vue
  - Vue 3
  - testes unitários (Jest) 
  - E2E (Cypress).
- animate-css : utilizado para animações na aplicação apenas usando css.
- [tiny-emitter](https://github.com/scottcorgan/tiny-emitter#readme): serve para emitir eventos na aplicação, [ir sessão](/#sobre-vue3)
- [vee-validate](https://vee-validate.logaretm.com/v3): para validação de formulários
- [vue-toastification](): para exibição de mensagens toast (possui suporte para vue 3)

## Anotações



<details>
  <summary>Libs externas (dependencias)</summary>

### Vee-validate
- utilizado no [modal de login](./src/components/ModalLogin/index.vue)
- na versão mais nova ele possui integração com o Vue 3
  - é possível utilizar hooks para validação

### vue-toastification
- utilizado para mostrar mensagens toast na aplicação
- é necessário configurar ele no nosso [main.js](./src/main.js), adicionando imports do css e do global dele.

</details>

<details>
  <summary>Padrões de projeto</summary>

### arquivos de view
- os diretórios na view representam uma página, e o componente da página é o arquivo `index.vue` de cada diretório
- outros arquivos de componentes dentro delas são subcomponentes do componenten principal (`index.vue`).
- no caso da home, por questões do header ser diferente que das páginas de área logada, o header dela ficou como subcomponente.

### Para modal
- component factory: a ideia principal seria um componente responsável por verificar qual modal que deseja utilizar, que o factory irá entregar.

- para ativar o modal ele foi montado como um serviço, mas que na vdd é um evento por trás. [arquivo useModal](./src/hooks/useModal.js)

</details>


<details>
  <summary> <a href="/#sobre-vue3"> Sobre o Vue3 </a> </summary>

- está sendo utilizado setup ao invés da options API (atributos methods, computed, watch...)
- não possui mais events, é necessário utiliza lib de terceiros (no projeto utiliza o `tiny-emitter`).

### Suspense
- utilizada no componenete [Feedbacks](./src/views/Feedbacks/index.vue)
- contexto: os browsers são single thread, e eles fazem renderização do html, css, handling de JS, tudo nessa mesma thread.
- a ideia do suspense é fazer o que fala no contexto, de uma maneira que possamos ter maior controle quando muitas atividades estão fazendo ao mesmo tempo. ex: desenhadndo CSS e handling de JS
- ele tem melhor funcionamento quando a aplicação é muito grande.
- para utilzar ela
  - é necessário utilizar a tag `templates` e declarar quem é o `#default` é quem é `#fallback`(seria o loading)
- utilizando ele, foi possível tornar o setup em uma função assíncrona no componente [Filters](./src/views/Feedbacks/Filters.vue)

</details>


<details>
  <summary> Testes </summary>

### Testes unitários

- eles estão ficando junto com  o arquivo a ser testado
- é necessário configurar o arquivo do jest config para que procure pelos arquivos em todo o diretório, pois estamos colocando os arquivos de teste unitário perto do arquivo a ser testado.
- para realizar os testes utilize o comando `npm run test:unit`

- _"erro dos métodos do jest não serem achados"_, são alertas do eslint, pois os métodos do jest são salvos no node de forma global em momento de execução deles (quando rodar o script do npm run).
  - para corrigir deve alterar o config do eslint para:
    ```javascript
    overrides: [
      {
        files: [
          '**/*.spec.js'
        ],
        env: {
          jest: true
        }
      }
    ]
    ```

</details>


