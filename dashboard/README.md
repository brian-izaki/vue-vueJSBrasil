# Dashboard Layout Front-end principal
Aplicação desenvolvida no curso do vue Brasil.

## Iniciar projeto
- estar no diretório dashboard
```shell
# Instalar dependencias
npm install

# Iniciar projeto em modo Desenvolvimento
npm run serve
```

## Dependencias utilizadas
- criado aplicação com a CLI do vue
  - Vue 3
  - testes unitários (Jest) 
  - E2E (Cypress).
- animate-css : utilizado para animações na aplicação apenas usando css.
- [tiny-emitter](https://github.com/scottcorgan/tiny-emitter#readme): serve para emitir eventos na aplicação, [ir sessão](/#sobre-vue3)
- [vee-validate](https://vee-validate.logaretm.com/v3): para validação de formulários

## Anotações



<details>
  <summary>Libs externas (dependencias)</summary>

### Vee-validate
- utilizado no [modal de login](./src/components/ModalLogin/index.vue)
- na versão mais nova ele possui integração com o Vue 3
  - é possível utilizar hooks para validação

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

</details>

