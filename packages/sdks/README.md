# Brasil Interface - Sdks

## Sumário

- [Brasil Interface - Sdks](#brasil-interface---sdks)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
    - [Notas](#notas)
  - [Instalação](#instalação)
  - [Como usar](#como-usar)
    - [CepAberto](#cepaberto)
      - [Buscar endereço por CEP](#buscar-endereço-por-cep)
      - [Buscar endereço por coordenadas](#buscar-endereço-por-coordenadas)
      - [Buscar endereço por nome da cidade/estado/rua/bairro](#buscar-endereço-por-nome-da-cidadeestadoruabairro)
      - [Buscar lista de cidades por estado](#buscar-lista-de-cidades-por-estado)
      - [Atualizar CEPs pelo número](#atualizar-ceps-pelo-número)
  - [Como contribuir](#como-contribuir)
  - [Contribuidores](#contribuidores)
  - [Autor](#autor)
  - [Licença](#licença)

## Descrição

Essa lib tem como propósito facilitar a vida de desenvolvedores brasileiros que precisam acessar dados de APIs abertas existentes no Brasil. A lib conta com uma classe para cada API, tendo esta classe métodos que referencia os endpoints da API, assim como as tipagens para cada um dos métodos.

### Notas

- Qualquer API listada aqui está sujeita a limitações e regras que não são de responsabilidade desta lib, para mais informações sobre as limitações e regras de cada API, consulte a documentação oficial da mesma.
- Os sites e repositorios oficiais de cada API estão listados abaixo, para mais informações sobre cada uma delas, consulte a documentação oficial da mesma.
- Esta lib não tem como propósito substituir a documentação oficial de cada API, mas sim facilitar o acesso a mesma.
- A lib funciona tanto no browser quanto no node.

## Instalação

```bash
yarn add @brasil-interface/sdks
```

ou

```bash
npm install @brasil-interface/sdks
```

ou

```bash
pnpm install @brasil-interface/sdks
```

## Como usar

### CepAberto

A documentação oficial da API pode ser encontrada [aqui](https://cepaberto.com/). Para usar a API é necessário criar uma conta e gerar um token de acesso, para mais informações sobre seu token de acesso, acesse [este link](https://cepaberto.com/api_key).

#### Buscar endereço por CEP

Dado um CEP, retorna um objeto com as informações do endereço.

```ts
import { CepAbertoAPI } from '@brasil-interface/sdks';

const cepAberto = new CepAbertoAPI('token');

async function main() {
    const endereco = await cepAberto.getCepByNumber('01001000');

    console.log(endereco); // { cep: '01001-000', logradouro: 'Praça da Sé', complemento: 'lado ímpar', bairro: 'Sé', cidade: { ddd: '11', ibge: '3550308', nome: 'São Paulo' }, estado: { sigla: 'SP' }, altitude: 799.3333333333334, latitude: -23.550519, longitude: -46.633309 }
}
```

#### Buscar endereço por coordenadas

Dadas as coordenadas de latitude e longitude, retorna um objeto com as informações do endereço.

```ts
import { CepAbertoAPI } from '@brasil-interface/sdks';

const cepAberto = new CepAbertoAPI('token');

async function main() {
    const endereco = await cepAberto.getCepByCoordinates(-23.550519, -46.633309);

    console.log(endereco); // { cep: '01001-000', logradouro: 'Praça da Sé', complemento: 'lado ímpar', bairro: 'Sé', cidade: { ddd: '11', ibge: '3550308', nome: 'São Paulo' }, estado: { sigla: 'SP' }, altitude: 799.3333333333334, latitude: -23.550519, longitude: -46.633309 }
}
```

#### Buscar endereço por nome da cidade/estado/rua/bairro

Dado o nome da cidade, estado, rua e bairro, retorna um objeto com as informações do endereço. A rua e bairro são opcionais.

```ts
import { CepAbertoAPI } from '@brasil-interface/sdks';

const cepAberto = new CepAbertoAPI('token');

async function main() {
    const endereco = await cepAberto.getCepByAddress('SP', 'São Paulo', 'Rua João Ramalho', 'Perdizes');

    console.log(endereco); // { cep: '05008-010', logradouro: 'Rua João Ramalho', complemento: 'até 999/1000', bairro: 'Perdizes', cidade: { ddd: '11', ibge: '3550308', nome: 'São Paulo' }, estado: { sigla: 'SP' }, altitude: 661.3333333333334, latitude: -23.537583, longitude: -46.680511 }
}
```

#### Buscar lista de cidades por estado

Dado o nome do estado, retorna um array com as cidades do estado. O nome do estado deve ser a sigla do estado em caixa alta.

```ts
import { CepAbertoAPI } from '@brasil-interface/sdks';

const cepAberto = new CepAbertoAPI('token');

async function main() {
  const cidades = await cepAberto.getCitiesByState('SP');

  console.log(cidades) // [{ nome: "Adamantina" }, { nome: "Adolfo" }, { nome: "Aguaí" }, { nome: "Águas da Prata" }, ...]
}
```

#### Atualizar CEPs pelo número

Se você possui uma lista de CEPs e deseja atualizar os dados deles, você pode usar este método para atualizar os dados de todos os CEPs de uma vez. O método retorna um array com os CEPs que foram atualizados.

```ts
import { CepAbertoAPI } from '@brasil-interface/sdks';

const cepAberto = new CepAbertoAPI('token');

async function main() {
  const cepsAtualizados = await cepAberto.updateCeps(["01001-000", "01002-000", "01003-000"]);

  console.log(cepsAtualizados) // ["01001-000", "01002-000"]
}
```

## Como contribuir

Leia o arquivo [CONTRIBUTING.md](https://github.com/pietrobondioli/brasil-interface/blob/main/CONTRIBUTING.md) no repositório principal.

## Contribuidores

- [Pietro Bondioli](https://github.com/pietrobondioli)

## Autor

- [Pietro Bondioli](https://github.com/pietrobondioli)

## Licença

[MIT](https://github.com/pietrobondioli/brasil-interface/blob/main/LICENSE.md)
