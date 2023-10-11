# Brasil Interface

## Sumário

- [Brasil Interface](#brasil-interface)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
    - [Notas](#notas)
  - [Libs](#libs)
    - [@brasil-interface/utils](#brasil-interfaceutils)
    - [@brasil-interface/cli](#brasil-interfacecli)
  - [Informações Técnicas](#informações-técnicas)
  - [Como contribuir](#como-contribuir)
  - [Contribuidores](#contribuidores)
  - [Autor](#autor)
  - [Licença](#licença)

## Descrição

Este projeto visa ser a ferramenta principal para desenvolvedores brasileiros que desejam lidar com dados relacionados ao Brasil. A ideia é proporcionar todo tipo de recursos para facilitar a vida do desenvolvedor: lib, skds, cli, documentação, etc.

No presente momento o projeto possui 2 libraries:

- [@brasil-interface/utils](./packages/utils/README.md): Uma lib com funções utilitárias para lidar com dados do governo brasileiro, CPF, CNPJ, CEP, etc.
- [@brasil-interface/cli](./packages/cli/README.md): Uma cli para facilitar o acesso do desenvolvedor aos dados e funcionalidades que as outras libraries do projeto disponibilizam.

Este projeto é uma iniciativa pessoal e não possui nenhum vínculo com o governo brasileiro.

### Notas

- Dê uma olhada no [roadmap](./ROADMAP.md) para saber o que ainda está por vir.

## Libs

### @brasil-interface/utils

Uma lib com funções utilitárias para lidar com dados do governo brasileiro, atualmente a lib conta com funções para lidar com:

- CPF
- CNPJ
- PIS
- CNH
- RG - SSP-SP
- Titulo de Eleitor
- Inscrição Estadual - Todos os estados

Para todos estes dados, a lib conta com funções para validar, gerar aleatoriamente, aplicar máscara e remover máscara. Existem também alguns casos específicos para cada tipo de dado, por exemplo, para CPF, a lib conta com uma função para verificar o estado de origem do CPF.

Instalação:

```bash
yarn add @brasil-interface/utils
```

ou

```bash
npm install @brasil-interface/utils
```

ou

```bash
pnpm add @brasil-interface/utils
```

Após instalar basta importar a lib e utilizar as funções:

```ts
import { CPF } from "@brasil-interface/utils";

console.log(CPF.isValid("04379547060")); // true
console.log(CPF.isValid("11111547060")); // false

console.log(CPF.mask("04379547060"))); // 043.795.470-60

console.log(CPF.unmask("043.795.470-60"))); // 04379547060

console.log(CPF.generate()); // 04379547060
```

Leia mais sobre todos os métodos disponíveis em [@brasil-interface/utils](./packages/utils/README.md).

### @brasil-interface/cli

Uma cli para facilitar o acesso do desenvolvedor aos dados e funcionalidades que as outras libraries do projeto disponibilizam. Atualmente todas as funcionalidades da cli são baseadas na lib [@brasil-interface/utils](./packages/utils/README.md).

Instalação:

```bash
yarn global add @brasil-interface/cli
```

ou

```bash
npm install -g @brasil-interface/cli
```

ou

```bash
pnpm add -g @brasil-interface/cli
```

Após instalar basta executar o comando `@brasil-interface/cli` e começar a usar, alguns exemplos:

Verificar todas as funcionalidades disponíveis:

```bash
$ brasili --help
```

Gerando 5 CPFs aleatórios e salvando em um arquivo JSON:

```bash
$ brasili cpf generate -a 5 -o ./output.json
```

Validando um CPF:

```bash
$ brasili cpf validate 04379547060
```

Aplicando máscara em um CPF:

```bash
$ brasili cpf mask 04379547060
```

Removendo máscara de um CPF:

```bash
$ brasili cpf unmask 043.795.470-60
```

Leia mais sobre todos os métodos disponíveis em [@brasil-interface/cli](./packages/cli/README.md).

## Informações Técnicas

Este é um projeto monorepo, ou seja, possui várias libraries dentro de um mesmo repositório. Para gerenciar as dependências entre as libraries, foi utilizado o [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) e para gerenciar o publish/versionamento das libraries, foi utilizado o [lerna](https://lerna.js.org/).

## Como contribuir

Leia mais em [CONTRIBUTING.md](./CONTRIBUTING.md).

## Contribuidores

- [Pietro Bondioli](https://pietrobondioli.com.br/)

## Autor

- [Pietro Bondioli](https://pietrobondioli.com.br/)

## Licença

[MIT](./LICENSE.md)
