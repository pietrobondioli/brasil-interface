# Brasil Interface - Utils

## Sumário

- [Brasil Interface - Utils](#brasil-interface---utils)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
    - [Notas](#notas)
  - [Instalação](#instalação)
  - [Como usar](#como-usar)
    - [CPF](#cpf)
    - [CNPJ](#cnpj)
    - [PIS](#pis)
    - [CNH](#cnh)
    - [RG](#rg)
    - [Titulo de Eleitor](#titulo-de-eleitor)
    - [Inscrição Estadual](#inscrição-estadual)
  - [Como contribuir](#como-contribuir)
  - [Contribuidores](#contribuidores)
  - [Autor](#autor)
  - [Licença](#licença)

## Descrição

Após perceber que muitos desenvolvedores brasileiros precisam lidar com dados do governo brasileiro, como CPF, CNPJ, CEP, etc, decidi criar uma lib com funções utilitárias para lidar com estes dados. Minha motivação veio ao perceber o quão disperso está o conhecimento sobre estes dados, e o quão difícil é encontrar uma lib que faça tudo o que é necessário para lidar com eles. Todos os métodos desta lib são baseados em informações encontradas pela internet, em sua maioria, em sites do governo brasileiro, antes de implementar cada um deles, uma documentação foi criada para que o conhecimento não se perca novamente. Sinta-se livre para contribuir com a lib e com a documentação.

### Notas

- Um sumário das documentações para cada método pode ser encontrado [aqui](./docs/README.md).
- A lib conta com uma cli para facilitar o acesso aos métodos, você pode encontrar a documentação da cli [aqui](../cli/README.md).
- A lib funciona tanto no browser quanto no node.

## Instalação

```bash
yarn add @brasil-interface/utils
```

ou

```bash
npm install @brasil-interface/utils
```

ou

```bash
pnpm install @brasil-interface/utils
```

## Como usar

A lib conta com funções para validar, gerar aleatoriamente, aplicar máscara e remover máscara para os seguintes dados:

### CPF

```ts
import { CPF } from '@brasil-interface/utils';

CPF.isValid('123.456.789-09'); // true

CPF.generate(); // '123.456.789-09'

CPF.mask('12345678909'); // '123.456.789-09'

CPF.unmask('123.456.789-09'); // '12345678909'

CPF.getEstado('123.456.789-09'); // ["PR","SC"]
```

### CNPJ

```ts
import { CNPJ } from '@brasil-interface/utils';

CNPJ.isValid('11.155.336/1865-70'); // true

CNPJ.generate(); // '11.155.336/1865-70'

CNPJ.mask('11155336186570'); // '11.155.336/1865-70'

CNPJ.unmask('11.155.336/1865-70'); // '11155336186570'
```

### PIS

```ts
import { PIS } from '@brasil-interface/utils';

PIS.isValid('325.89112.12-9'); // true

PIS.generate(); // '325.89112.12-9'

PIS.mask('32589112129'); // '325.89112.12-9'

PIS.unmask('325.89112.12-9'); // '32589112129'
```

### CNH

```ts
import { CNH } from '@brasil-interface/utils';

CNH.isValid('65719372220'); // true

CNH.generate(); // '65719372220'
```

### RG

Note que o RG tem implementações diferentes para cada estado, por isso, é necessário acessar o estado específico para utilizar os métodos. No momento, a lib conta apenas com a implementação para o estado de São Paulo.

```ts
import { RG } from '@brasil-interface/utils';

RG.SP.isValid('72.445.865-7'); // true

RG.SP.generate(); // '724458657'

RG.SP.mask('724458657'); // '72.445.865-7'

RG.SP.unmask('72.445.865-7'); // '724458657'
```

### Titulo de Eleitor

```ts
import { TituloDeEleitor } from '@brasil-interface/utils';

TituloDeEleitor.isValid('737877331023'); // true

TituloDeEleitor.generate(); // '737877331023'

TituloDeEleitor.getEstado('737877331023'); // 'GO'
```

### Inscrição Estadual

A inscrição estadual tem implementações diferentes para cada estado, por isso, é necessário acessar o estado específico para utilizar os métodos. A lib conta com implementações para todos os estados.

Para fins de brevidade, o estado de São Paulo será utilizado como exemplo.

```ts
import { InscricaoEstadual } from '@brasil-interface/utils';

InscricaoEstadual.SP.isValid('447746234481'); // true

InscricaoEstadual.SP.generate(); // '447746234481'

InscricaoEstadual.SP.mask('447746234481'); // '447.746.234.481'

InscricaoEstadual.SP.unmask('447.746.234.481'); // '447746234481'
```

## Como contribuir

Leia o arquivo [CONTRIBUTING.md](https://github.com/pietrobondioli/brasil-interface/blob/main/CONTRIBUTING.md) no repositório principal.

## Contribuidores

- [Pietro Bondioli](https://github.com/pietrobondioli)

## Autor

- [Pietro Bondioli](https://github.com/pietrobondioli)

## Licença

[MIT](https://github.com/pietrobondioli/brasil-interface/blob/main/LICENSE.md)
