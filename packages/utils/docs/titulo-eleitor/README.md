# Validação Titulo de Eleitor

## Sumário

- [Validação Titulo de Eleitor](#validação-titulo-de-eleitor)
  - [Sumário](#sumário)
  - [Informações](#informações)
  - [Validação](#validação)
    - [Cálculo do primeiro dígito verificador (11ª posição):](#cálculo-do-primeiro-dígito-verificador-11ª-posição)
    - [Cálculo do segundo dígito verificador (12ª posição):](#cálculo-do-segundo-dígito-verificador-12ª-posição)
    - [Resultado final:](#resultado-final)
    - [Observações](#observações)
  - [Estado Emissor do Titulo](#estado-emissor-do-titulo)

## Informações

- Tamanho: 12 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 2, 3, 4, 5, 6, 7, 8, 9, calculados da esquerda para a direita
  - 2º dígito: 7, 8, 9, calculados da esquerda para a direita
- Formato: 8 dígitos + 2 dígitos unidade federativa + 2 dígitos verificador (XXXXXXXXFFDD)
  - X: 8 dígitos base
  - F: 2 dígitos unidade federativa
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXXXXXXXFFDD
- Exemplo: 102385010671

## Validação

### Cálculo do primeiro dígito verificador (11ª posição):

Utiliza-se os 8 dígitos base, para o nosso exemplo temos: 10238501.

| Dígitos | 1          | 0          | 2          | 3           | 8           | 5           | 0          | 1          | ---   |
| ------- | ---------- | ---------- | ---------- | ----------- | ----------- | ----------- | ---------- | ---------- | ----- |
| Pesos   | 2          | 3          | 4          | 5           | 6           | 7           | 8          | 9          | ---   |
| Cálculo | 1 \* 2 = 2 | 0 \* 3 = 0 | 2 \* 4 = 8 | 3 \* 5 = 15 | 8 \* 6 = 48 | 5 \* 7 = 35 | 0 \* 8 = 0 | 1 \* 9 = 9 | = 117 |

O resultado da soma dos produtos é dividido por 11, e o dígito verificador é o resto dessa divisão.

| 117 / 11 = 10 | Resto 7 |

O 1º dígito verificador é 7.

### Cálculo do segundo dígito verificador (12ª posição):

Utiliza-se dos dígitos da unidade federativa + o primeiro dígito verificador encontrado, para o nosso exemplo temos: 067.

| Dígitos | 0          | 6           | 7           | ---   |
| ------- | ---------- | ----------- | ----------- | ----- |
| Pesos   | 7          | 8           | 9           | ---   |
| Cálculo | 0 \* 7 = 0 | 6 \* 8 = 48 | 7 \* 9 = 63 | = 111 |

O resultado da soma dos produtos é dividido por 11, e o dígito verificador é o resto dessa divisão.

| 111 / 11 = 10 | Resto 1 |

O 2º dígito verificador é 1.

### Resultado final:

102385010671

### Observações

- No cálculo do primeiro e do segundo Dígitos Verificadores, quando o resto da divisão
  por 11 for 10 , o respectivo dígito verificador é definido como 0.
- Nos títulos emitidos em São Paulo e Minas Gerais, os Dígitos Verificadores assumem o
  valor 1 , caso em seus respectivos processos de cálculo o resto da divisão por 11 seja
  zero.
- Alguns títulos eleitorais de São Paulo e Minas Gerais podem ter nove dígitos em seu
  número sequencial, em vez de oito. Tal fato não compromete o cálculo dos DVs, pois
  este é feito com base nos oito primeiros números sequenciais.

## Estado Emissor do Titulo

| Código | Estado |
| ------ | ------ |
| 01     | SP     |
| 02     | MG     |
| 03     | RJ     |
| 04     | RS     |
| 05     | BA     |
| 06     | PR     |
| 07     | CE     |
| 08     | PE     |
| 09     | SC     |
| 10     | GO     |
| 11     | MA     |
| 12     | PB     |
| 13     | PA     |
| 14     | ES     |
| 15     | PI     |
| 16     | RN     |
| 17     | AL     |
| 18     | MT     |
| 19     | MS     |
| 20     | DF     |
| 21     | SE     |
| 22     | AM     |
| 23     | RO     |
| 24     | AC     |
| 25     | AP     |
| 26     | RR     |
| 27     | TO     |
| 28     | ZZ     |
