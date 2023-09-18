# Contributing - Brasil Interface

## Summary

- [Contributing - Brasil Interface](#contributing---brasil-interface)
  - [Summary](#summary)
  - [Regras](#regras)
  - [Template de pull-request](#template-de-pull-request)
  - [Como rodar o projeto](#como-rodar-o-projeto)
    - [Instalação](#instalação)
    - [Comandos úteis](#comandos-úteis)

## Regras

- Ao contribuir com mudanças que afetam regras de algoritmos que já foram documentados (com referências), é necessário atualizar a documentação do algoritmo com a nova regra e prover no mínimo uma referência que comprove a nova regra.
- Todo pull-request deve ser feito para a branch `develop`.
- Todo pull-request deve contar com testes que cubram as mudanças feitas, principalmente cobrindo regras e exceções de algoritmos.

## Template de pull-request

[Template de pull-request](./.github/PULL_REQUEST_TEMPLATE.md)

## Como rodar o projeto

### Instalação

- Requisitos:
  - [nodejs](https://nodejs.org/en/).
  - [yarn](https://yarnpkg.com/).
    - Com o node instalado, execute o comando `npm install -g yarn` para instalar o yarn globalmente.

1. Clone o repositório:

```bash
git clone https://github.com/bondiolipietro/brasil-interface.git
cd brasil-interface
```

2. Instale as dependências:

```bash
yarn install
```

### Comandos úteis

1. Rodando os testes:

```bash
yarn run test
```

2. Buildando o projeto:

```bash
yarn run build
```

3. Buildando apenas uma library:

```bash
yarn run build:nome-da-library
```
