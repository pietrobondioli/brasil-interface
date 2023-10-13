# Brasil Interface - Cli

## Sumário

- [Brasil Interface - Cli](#brasil-interface---cli)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
  - [Instalação](#instalação)
  - [Como usar](#como-usar)
  - [Utils CLI](#utils-cli)
    - [CPF](#cpf)
      - [Validar CPF](#validar-cpf)
      - [Gerar CPF](#gerar-cpf)
      - [Aplicar máscara em CPF](#aplicar-máscara-em-cpf)
      - [Remover máscara de CPF](#remover-máscara-de-cpf)
      - [Verificar estado de origem de CPF](#verificar-estado-de-origem-de-cpf)
    - [CNPJ](#cnpj)
      - [Validar CNPJ](#validar-cnpj)
      - [Gerar CNPJ](#gerar-cnpj)
      - [Aplicar máscara em CNPJ](#aplicar-máscara-em-cnpj)
      - [Remover máscara de CNPJ](#remover-máscara-de-cnpj)
    - [PIS](#pis)
      - [Validar PIS](#validar-pis)
      - [Gerar PIS](#gerar-pis)
      - [Aplicar máscara em PIS](#aplicar-máscara-em-pis)
      - [Remover máscara de PIS](#remover-máscara-de-pis)
    - [CNH](#cnh)
      - [Validar CNH](#validar-cnh)
      - [Gerar CNH](#gerar-cnh)
    - [RG](#rg)
      - [Validar RG](#validar-rg)
      - [Gerar RG](#gerar-rg)
      - [Aplicar máscara em RG](#aplicar-máscara-em-rg)
      - [Remover máscara de RG](#remover-máscara-de-rg)
  - [Sdks CLI](#sdks-cli)
    - [Cep Aberto](#cep-aberto)
      - [Pesquisar CEP por número de CEP](#pesquisar-cep-por-número-de-cep)
      - [Pesquisar CEP por Coordenadas](#pesquisar-cep-por-coordenadas)
      - [Pesquisar CEP por Endereço](#pesquisar-cep-por-endereço)
      - [Pesquisar CEP por Estado](#pesquisar-cep-por-estado)
      - [Atualizar uma lista de ceps](#atualizar-uma-lista-de-ceps)
  - [Como contribuir](#como-contribuir)
  - [Contribuidores](#contribuidores)
  - [Autor](#autor)
  - [Licença](#licença)

## Descrição

Este projeto foi desenvolvido para facilitar o acesso de desenvolvedores as funcionalidades presentes nas libs do projeto [Brasil Interface](https://github.com/pietrobondioli/brasil-interface).

## Instalação

```bash
yarn global add @brasil-interface/cli
```

ou

```bash
npm install -g @brasil-interface/cli
```

## Como usar

Ao instalar a cli, você terá acesso a um comando chamado `brasili`. Este comando possui alguns sub-comandos que são as funcionalidades disponíveis na cli. Para saber mais sobre cada funcionalidade, basta executar o comando `brasili --help` e você verá uma lista com todos os sub-comandos disponíveis e uma breve descrição sobre cada um deles. Para saber mais sobre cada sub-comando, basta executar o comando `brasili <sub-comando> --help` e você verá uma descrição mais detalhada sobre o sub-comando.

## Utils CLI

Os comandos tendem a seguir o mesmo padrão de nomenclatura dos sub-comandos. Então para fins de brevidade, o maior detalhamento será feito apenas para o sub-comando `cpf`, e para os outros comandos apenas haverá maior detalhamento caso haja alguma particularidade ou um novo comando seja adicionado.

### CPF

Note que todos os comandos terão algumas opções em comum, para fins de brevidade, estas opções serão listadas aqui:

| Opção                        | Descrição                                                   |
| ---------------------------- | ----------------------------------------------------------- |
| `-i, --input <input_file>`   | Arquivo de entrada com os CPFs a serem processados.         |
| `-o, --output <output_file>` | Arquivo de saída com o resultado do comando.                |
| `-c, --copy`                 | Copiar o resultado da pesquisa para a área de transferência |

#### Validar CPF

```bash
brasili cpf validate [...cpfs] -i <input_file> -o <output_file>
```

Validar um único CPF:

```bash
brasili cpf validate 04379547060
```

Validar uma lista de CPFs:

```bash
brasili cpf validate 04379547060,04379547061,04379547062
```

ou ainda:

Validar uma lista de CPFs em formato JSON:

```bash
brasili cpf validate '["04379547060","04379547061"]'
```

Validar uma lista de CPFs em formato JSON e salvar o resultado em um arquivo:

```bash
brasili cpf validate '["04379547060","04379547061"]' -o cpf-validation.json
```

Validar uma lista de CPFs a partir de um arquivo:

```txt
// cpf-list.txt
04379547060,04379547061
```

```bash
brasili cpf validate -i cpf-list.txt
```

O resultado de qualquer uma das validações acima será uma lista de objetos com o CPF e o resultado da validação:

```json
[
  {
    "cpf": "04379547060",
    "valid": true
  },
  {
    "cpf": "04379547061",
    "valid": false
  }
]
```

#### Gerar CPF

```bash
brasili cpf generate -a <amount> -o <output_file> --mask
```

| Opção                   | Descrição                                                                 |
| ----------------------- | ------------------------------------------------------------------------- |
| `-a, --amount <amount>` | Quantidade de CPFs a serem gerados.                                       |
| `-m, --mask`            | Aplicar máscara nos CPFs gerados. Caso não seja informado, não será usada |

Gerar um único CPF:

```bash
brasili cpf generate
```

Gerar uma lista de CPFs:

```bash
brasili cpf generate -a 3
```

Gerar uma lista de CPFs e salvar o resultado em um arquivo:

```bash
brasili cpf generate -a 3 -o cpf-list.txt
```

O resultado de qualquer uma das gerações acima será um array de CPFs:

```json
["04379547060","04379547061","04379547062"]
```

#### Aplicar máscara em CPF

```bash
brasili cpf mask [...cpfs] -i <input_file> -o <output_file> --sensitive
```

| Opção             | Descrição                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `-s, --sensitive` | Se a máscara deve esconder os caracteres do CPF. Caso não seja informado, o CPF será mascarado normalmente |

Aplicar máscara em um único CPF:

```bash
brasili cpf mask 04379547060
```

Aplicar máscara em uma lista de CPFs:

```bash
brasili cpf mask 04379547060,04379547061,04379547062
```

ou ainda:

Aplicar máscara em uma lista de CPFs em formato JSON:

```bash
brasili cpf mask '["04379547060","04379547061"]'
```

Aplicar máscara em uma lista de CPFs em formato JSON e salvar o resultado em um arquivo:

```bash
brasili cpf mask '["04379547060","04379547061"]' -o cpf-mask.json
```

Aplicar máscara em uma lista de CPFs a partir de um arquivo:

```txt
// cpf-list.txt
04379547060,04379547061
```

```bash
brasili cpf mask -i cpf-list.txt
```

O resultado de qualquer uma das aplicações de máscara acima será uma lista de objetos com o CPF e o resultado da aplicação de máscara:

```json
[
  {
    "cpf": "043.795.470-60",
    "masked": true
  },
  {
    "cpf": "043.795.470-61",
    "masked": true
  }
]
```

#### Remover máscara de CPF

```bash
brasili cpf unmask [...cpfs] -i <input_file> -o <output_file>
```

Remover máscara de um único CPF:

```bash
brasili cpf unmask 043.795.470-60
```

Remover máscara de uma lista de CPFs:

```bash
brasili cpf unmask 043.795.470-60,043.795.470-61,043.795.470-62
```

ou ainda:

Remover máscara de uma lista de CPFs em formato JSON:

```bash
brasili cpf unmask '["043.795.470-60","043.795.470-61"]'
```

Remover máscara de uma lista de CPFs em formato JSON e salvar o resultado em um arquivo:

```bash
brasili cpf unmask '["043.795.470-60","043.795.470-61"]' -o cpf-unmask.json
```

Remover máscara de uma lista de CPFs a partir de um arquivo:

```txt
// cpf-list.txt
043.795.470-60,043.795.470-61
```

```bash
brasili cpf unmask -i cpf-list.txt
```

O resultado de qualquer uma das remoções de máscara acima será uma lista de objetos com o CPF e o resultado da remoção de máscara:

```json
[
  {
    "cpf": "04379547060",
    "unmasked": true
  },
  {
    "cpf": "04379547061",
    "unmasked": true
  }
]
```

#### Verificar estado de origem de CPF

```bash
brasili cpf get-estados [...cpfs] -i <input_file> -o <output_file>
```

Pesquisar estado de origem de um único CPF:

```bash
brasili cpf get-estados 04379547060
```

Pesquisar estado de origem de uma lista de CPFs:

```bash
brasili cpf get-estados 04379547060,04379547061,04379547062
```

ou ainda:

Pesquisar estado de origem de uma lista de CPFs em formato JSON:

```bash
brasili cpf get-estados '["04379547060","04379547061"]'
```

Pesquisar estado de origem de uma lista de CPFs em formato JSON e salvar o resultado em um arquivo:

```bash
brasili cpf get-estados '["04379547060","04379547061"]' -o cpf-estados.json
```

Pesquisar estado de origem de uma lista de CPFs a partir de um arquivo:

```txt
// cpf-list.txt
04379547060,04379547061
```

```bash
brasili cpf get-estados -i cpf-list.txt
```

O resultado de qualquer uma das pesquisas de estado de origem acima será uma lista de objetos com o CPF e uma lista dos estados de origem:

```json
[
  {
    "cpf": "04379547060",
    "estado": ["SP"]
  },
  {
    "cpf": "04379547061",
    "estado": ["SP"]
  }
]
```

### CNPJ

Note que todos os comandos terão algumas opções em comum, para fins de brevidade, estas opções serão listadas aqui:

| Opção                        | Descrição                                                    |
| ---------------------------- | ------------------------------------------------------------ |
| `-i, --input <input_file>`   | Arquivo de entrada com os CNPJs a serem processados.         |
| `-o, --output <output_file>` | Arquivo de saída com o resultado do comando.                 |
| `-c, --copy`                 | Copiar o resultado da pesquisa para a área de transferência. |

#### Validar CNPJ

```bash
brasili cnpj validate [...cnpjs] -i <input_file> -o <output_file>
```

#### Gerar CNPJ

```bash
brasili cnpj generate [...cnpjs] -i <input_file> -o <output_file> -a <amount> --mask
```

| Opção                   | Descrição                                                                  |
| ----------------------- | -------------------------------------------------------------------------- |
| `-a, --amount <amount>` | Quantidade de CNPJs a serem gerados.                                       |
| `-m, --mask`            | Aplicar máscara nos CNPJs gerados. Caso não seja informado, não será usada |

#### Aplicar máscara em CNPJ

```bash
brasili cnpj mask [...cnpjs] -i <input_file> -o <output_file> --sensitive
```

| Opção             | Descrição                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `-s, --sensitive` | Se a máscara deve esconder os caracteres do CNPJ. Caso não seja informado, o CNPJ será mascarado normalmente |


#### Remover máscara de CNPJ

```bash
brasili cnpj unmask [...cnpjs] -i <input_file> -o <output_file>
```

| Opção                        | Descrição                                                   |
| ---------------------------- | ----------------------------------------------------------- |
| `-i, --input <input_file>`   | Arquivo de entrada com os CNPJs a terem a máscara removida. |
| `-o, --output <output_file>` | Arquivo de saída com os CNPJs com a máscara removida.       |

### PIS

Note que todos os comandos terão algumas opções em comum, para fins de brevidade, estas opções serão listadas aqui:

| Opção                        | Descrição                                                    |
| ---------------------------- | ------------------------------------------------------------ |
| `-i, --input <input_file>`   | Arquivo de entrada com os PIS a serem processados.           |
| `-o, --output <output_file>` | Arquivo de saída com o resultado do comando.                 |
| `-c, --copy`                 | Copiar o resultado da pesquisa para a área de transferência. |

#### Validar PIS

```bash
brasili pis validate [...pis] -i <input_file> -o <output_file>
```

#### Gerar PIS

```bash
brasili pis generate -a <amount> -o <output_file> --mask
```

| Opção                   | Descrição                                                                |
| ----------------------- | ------------------------------------------------------------------------ |
| `-a, --amount <amount>` | Quantidade de PIS a serem gerados.                                       |
| `-m, --mask`            | Aplicar máscara nos PIS gerados. Caso não seja informado, não será usada |

#### Aplicar máscara em PIS

```bash
brasili pis mask [...pis] -i <input_file> -o <output_file> --sensitive
```

| Opção                        | Descrição                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `-i, --input <input_file>`   | Arquivo de entrada com os PIS a terem a máscara aplicada.                                                  |
| `-o, --output <output_file>` | Arquivo de saída com os PIS com a máscara aplicada.                                                        |
| `-s, --sensitive`            | Se a máscara deve esconder os caracteres do PIS. Caso não seja informado, o PIS será mascarado normalmente |

#### Remover máscara de PIS

```bash
brasili pis unmask [...pis] -i <input_file> -o <output_file>
```

| Opção                        | Descrição                                                 |
| ---------------------------- | --------------------------------------------------------- |
| `-i, --input <input_file>`   | Arquivo de entrada com os PIS a terem a máscara removida. |
| `-o, --output <output_file>` | Arquivo de saída com os PIS com a máscara removida.       |

### CNH

#### Validar CNH

```bash
brasili cnh validate [...cnhs] -i <input_file> -o <output_file>
```

| Opção                        | Descrição                                         |
| ---------------------------- | ------------------------------------------------- |
| `-i, --input <input_file>`   | Arquivo de entrada com os CNHs a serem validados. |
| `-o, --output <output_file>` | Arquivo de saída com os CNHs validados.           |

#### Gerar CNH

```bash
brasili cnh generate -a <amount> -o <output_file>
```

| Opção                        | Descrição                             |
| ---------------------------- | ------------------------------------- |
| `-a, --amount <amount>`      | Quantidade de CNHs a serem gerados.   |
| `-o, --output <output_file>` | Arquivo de saída com os CNHs gerados. |

### RG

O RG tem uma particularidade que é o fato de que ele não possui um padrão nacional. Cada estado possui seu próprio padrão de RG. Por isso, para executar comandos relacionados ao rg é necessário informar o estado de origem do RG. Para isso, basta informar a sigla do estado de origem do RG logo após a lista de RGs.

Note que todos os comandos terão algumas opções em comum, para fins de brevidade, estas opções serão listadas aqui:

| Opção                        | Descrição                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `estado`                     | Obrigatório. Sigla do estado de origem do RG a ser processado. A única opção disponível é `SP`.                     |
| `-i, --input <input_file>`   | Arquivo de entrada com os RGs a serem processados.                                                                  |
| `-o, --output <output_file>` | Arquivo de saída com o resultado do comando.                                                                        |
| `-c, --copy`                 | Copiar o resultado da pesquisa para a área de transferência. Caso não seja informado, o resultado não será copiado. |

#### Validar RG

```bash
brasili rg validate [...rgs] <estado> -i <input_file> -o <output_file>
```

#### Gerar RG

```bash
brasili rg generate <estado> -a <amount> -o <output_file> --mask
```

| Opção                   | Descrição                                            |
| ----------------------- | ---------------------------------------------------- |
| `-a, --amount <amount>` | Quantidade de RGs a serem gerados.                   |
| `-m, --mask`            | Aplicar máscara nos RGs gerados. Caso não seja usado |

#### Aplicar máscara em RG

```bash
brasili rg mask [...rgs] <estado> -i <input_file> -o <output_file> --sensitive
```

| Opção             | Descrição                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `-s, --sensitive` | Se a máscara deve esconder os caracteres do RG. Caso não seja informado, o RG será mascarado normalmente |

#### Remover máscara de RG

```bash
brasili rg unmask [...rgs] <estado> -i <input_file> -o <output_file>
```

## Sdks CLI

### Cep Aberto

Esta funcionalidade permite que você faça consultas de CEPs utilizando a API do [Cep Aberto](https://cepaberto.com/), para checar o wrapper utilizado, acesse o package [@brasil-interface/sdks]([/packages/sdks](https://github.com/pietrobondioli/brasil-interface/tree/main/packages/sdks)) deste projeto.

Note que todos os comandos terão algumas opções em comum, para fins de brevidade, estas opções serão listadas aqui:

| Opção                        | Descrição                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `token`                      | Obrigatório. Token de acesso a API do Cep Aberto.                                                                   |
| `-o, --output <output_file>` | Arquivo de saída com o endereço pesquisado.                                                                         |
| `-c, --copy`                 | Copiar o resultado da pesquisa para a área de transferência. Caso não seja informado, o resultado não será copiado. |

#### Pesquisar CEP por número de CEP

```bash
brasili cep-aberto get-by-number <cep> --token <token> -o <output_file> -c
```

| Opção | Descrição                          |
| ----- | ---------------------------------- |
| `cep` | Obrigatório. CEP a ser pesquisado. |

Em caso de sucesso o resultado será algo como:

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "cidade": {
    "nome": "São Paulo",
    "ddd": 11,
    "ibge": "3550308"
  },
  "estado": {
    "sigla": "SP"
  },
  "altitude": 760.0,
  "latitude": "-23.5503",
  "longitude": "-46.6342"
}
```

#### Pesquisar CEP por Coordenadas

```bash
brasili cep-aberto get-by-coordinates <latitude> <longitude> --token <token> -o <output_file> -c
```

| Opção       | Descrição                                |
| ----------- | ---------------------------------------- |
| `latitude`  | Obrigatório. Latitude a ser pesquisada.  |
| `longitude` | Obrigatório. Longitude a ser pesquisada. |

Em caso de sucesso o JSON será o mesmo da pesquisa por CEP.

#### Pesquisar CEP por Endereço

```bash
brasili cep-aberto get-by-address <state> <city> [street] [neighborhood] --token <token> -o <output_file> -c
```

| Opção          | Descrição                                      |
| -------------- | ---------------------------------------------- |
| `state`        | Obrigatório. Sigla do estado a ser pesquisado. |
| `city`         | Obrigatório. Nome da cidade a ser pesquisada.  |
| `street`       | Opcional. Nome da rua a ser pesquisada.        |
| `neighborhood` | Opcional. Nome do bairro a ser pesquisado.     |

Em caso de sucesso o JSON será o mesmo da pesquisa por CEP.

#### Pesquisar CEP por Estado

```bash
brasili cep-aberto get-cities-by-state <state> --token <token> -o <output_file> -c
```

| Opção   | Descrição                                      |
| ------- | ---------------------------------------------- |
| `state` | Obrigatório. Sigla do estado a ser pesquisado. |

Em caso de sucesso o resultado será uma lista de objetos com o nome das cidades:

```json
[
  {
    "nome": "São Paulo",
  },
  {
    "nome": "São Pedro",
  },
  {
    "nome": "São Pedro do Turvo",
  }
]
```

#### Atualizar uma lista de ceps

```bash
brasili cep-aberto update-ceps <cepList> --token <token> -i <input_file> -o <output_file> -c
```

| Opção                      | Descrição                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `cepList`                  | Obrigatório. Lista de CEPs a serem atualizados.                                                                                        |
| `-i, --input <input_file>` | Arquivo de entrada com os CEPs a serem atualizados, pode ser um arquivo JSON ou um arquivo de texto com os CEPs separados por vírgula. |

Em caso de sucesso o resultado será uma lista de strings com os ceps atualizados:

```json
[
  "01001-000",
  "01002-000",
  "01003-000"
]
```

## Como contribuir

Leia o arquivo [CONTRIBUTING.md](https://github.com/pietrobondioli/brasil-interface/blob/main/CONTRIBUTING.md) no repositório principal.

## Contribuidores

- [Pietro Bondioli](https://github.com/pietrobondioli)

## Autor

- [Pietro Bondioli](https://github.com/pietrobondioli)

## Licença

[MIT](https://github.com/pietrobondioli/brasil-interface/blob/main/LICENSE.md)
