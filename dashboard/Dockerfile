## Criar 2 estágios de build, por causa do node_modules
# alpine é uma versão mais leve, o "as" é um alias
FROM node:14-alpine as build

# inicio o diretório no docker em /
WORKDIR /

# copio tudo do meu arquivo atual pra dentro do container
COPY . .

ENV NODE_ENV=production
RUN npm install --production
RUN npm run build


# só de usar outro FROM, digo q estou com 2 estágios de compilação de container
# este será o segundo estágio
FROM nginx:1.18.0-alpine as final

WORKDIR /

# copia do estágio de build a pasta dist para o novo container do nginx.
# o ultimo é o caminho padrão do ngnix de arquivos estáticos
COPY --from=build ./dist /usr/share/nginx/html
