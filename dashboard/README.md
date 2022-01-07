# Dashboard Layout Front-end principal
Aplicação desenvolvida no curso do vue Brasil.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2f0af836-7665-4935-9c85-b5447380fd71/deploy-status)](https://app.netlify.com/sites/brian-izaki-feedbacker-dashboard/deploys)

## Iniciar projeto
- **(não é obrigatório)** Utilizado o node na versão 14
  - caso utilize o nvm, digite o comando `nvm use`
- estar no diretório dashboard
```shell
# Instalar dependencias
npm install

# Iniciar projeto em modo Desenvolvimento
npm run serve

## COMANDO PARA TESTES
# unitários
npm run test:unit

# testes e2e
npm run test:e2e
```
- Aplicação estará rodando em: http://localhost:8080/

---

## Dependencias utilizadas
- criado aplicação com a CLI do vue
  - Vue 3
  - testes unitários (Jest) 
  - E2E (Cypress).
- animate-css : utilizado para animações na aplicação apenas usando css.
- [tiny-emitter](https://github.com/scottcorgan/tiny-emitter#readme): serve para emitir eventos na aplicação, [ir sessão](/#sobre-vue3)
- [vee-validate](https://vee-validate.logaretm.com/v3): para validação de formulários
- [vue-toastification](): para exibição de mensagens toast (possui suporte para vue 3)

---

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

<br />

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
  <summary> Sobre o Vue3 </summary>

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

<br />

<details>
  <summary> Testes unitários </summary>

### Testes unitários com Jest

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

- testes com anotações:
  - [Home.spec.js](src/views/Home/Home.spec.js)
  - [auth.spec.js](src/services/auth.spec.js)
  - [user.spec.js](src/store/user.spec.js)
  - teste do store: [HeaderLogged.spec.js](src/components/HeaderLogged/HeaderLogged.spec.js)

- vocabulário:
  - **snapshot**: seria uma "fotografia" do código gerado e compilado pela lib do teste. Ele que é o responsável de poder verificar se o conteudo do html foi alterado ou n.

- comandos utilizados no projeto:
```shell
# comando regerar snapshots
npm run test:unit -- -u
```

</details>

<details>
  <summary> Testes End-to-end </summary>

### Teste com Cypress

- utiliza a lib do Cypress
- estrutura de testes é semelhante ao de testes unitários
- `cypress run`: o cypress além dos teste também vai **gerar relatórios**
  - é necessário que o front end a ser testado esteja rodando em outro terminal.
  - gera: **vídeos**

- comandos: 
```shell
# executando cypress no projeto para gerar relatórios (deve utilizar o cifrão)
$(npm bin)/cypress run
```

</details>

</details>

<details>
  <summary> Dica npm </summary>

### Dica npm

- no teste com cypress, posso utilizar diretamente o cypress que tem no `node_modules`. Mas é necessário passar o caminho 
  corretamente, o npm permite ver o caminho do node_modules basta digitar `npm bin`

- comandos: 
```shell
# ver caminho dos binarios no node_modules
npm bin

# executando uma lib através dos binarios
$(npm bin)/cypress run
```

</details>


<details>
  <summary> CI </summary>

### CI (Continous Integration) com o github

- foi criado no diretório raiz o diretório `.github/workflow` com arquivos `.yml` para realizar as ações com o github actions
- nos arquivos `.yml` são feitos os `steps`(passos) que o CI irá fazer pra realizar os testes.

</details>


<details>
  <summary> Deploy do front end </summary>

### build
- caso **tailwind**
  - o build ficará muito grande caso não use o `purge`. Para evitar isso, é necessário passar no `tailwind.config.js` dentro de `purge` os arquivos que tem css e no build será colocado
    apenas as classes utilizadas no arquivo
  - **_obs_**: classes que forem passadas usando template string não são lidas pelo tailwind e isso **resulta na remoção delas durante o build**.
    ```js
    // errado
    color = 'blue'    
    <div :class="`bg-${color}`"></div>
    
    // certo
    color2 = 'bg-color'
    <div :class="color2"></div>
    ```

### redirects
- o comportamento de SPA no vue utiliza o `#` para redirecionamentos
  - como nesse projeto utiliza o webHistory evitando o `#` é necessário criar o arquivo `public/_redirects` para evitar o `404`

### Docker file
- tem o objetivo de compilar uma imagem docker pra q fique mais fácil no momento de subir na cloud

- foi feito 2 processos para o dockerfile, (multi staging builds)
  - 1 pro build da aplicação
  - 2 pra subir o nginx
  - Os processos foram feitos para que no nginx não precise realizar o build com node_modules novamente e **ter apenas o dist** dentro do nginx.

- após criar o dockerfile, foi feito build com docker para gerar uma imagem do front-end
  ```shell
  docker build -t feedbacker-dashboard .
  
  ## ver o build do nginx (80 é a porta padrão do ngnix)
  # a aplicação irá roda em http://localhost:80
  docker run -p 80:80 feedbacker-dashboard
  ```
</details>

---

## Referências

- Testes:
  - [métodos do jest](https://jestjs.io/pt-BR/docs/api)
  - [métodos do cypress](https://docs.cypress.io/api/table-of-contents)