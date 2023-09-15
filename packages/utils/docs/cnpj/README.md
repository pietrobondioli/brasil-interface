# Validação CNPJ

## Sumário

- [Validação CNPJ](#validação-cnpj)
  - [Sumário](#sumário)
  - [Informações](#informações)
  - [Validação](#validação)
    - [Cálculo do primeiro dígito verificador (13ª posição)](#cálculo-do-primeiro-dígito-verificador-13ª-posição)
    - [Cálculo do segundo dígito verificador (14ª posição)](#cálculo-do-segundo-dígito-verificador-14ª-posição)
    - [Resultado final](#resultado-final)
    - [Observações](#observações)
  - [Alternativas](#alternativas)

## Informações

- Tamanho: 14 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
  - 2º dígito: 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 12 dígitos + 2 dígitos verificadores (XX.XXX.XXX/XXXX-DD)
  - X: 12 dígitos base
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XX.XXX.XXX/XXXX-DD
- Exemplo: 64.786.204/0001-82

## Validação

### Cálculo do primeiro dígito verificador (13ª posição)

Utiliza-se os 12 dígitos base, para o nosso exemplo temos: 64.786.204/0001.

| Dígitos | 6           | 4           | 7           | 8           | 6           | 2           | 0          | 4           | 0          | 0          | 0          | 1          | ---   |
| ------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ----- |
| Pesos   | 5           | 4           | 3           | 2           | 9           | 8           | 7          | 6           | 5          | 4          | 3          | 2          | ---   |
| Cálculo | 6 \* 5 = 30 | 4 \* 4 = 16 | 7 \* 3 = 21 | 8 \* 2 = 16 | 6 \* 9 = 54 | 2 \* 8 = 16 | 0 \* 7 = 0 | 4 \* 6 = 24 | 0 \* 5 = 0 | 0 \* 4 = 0 | 0 \* 3 = 0 | 1 \* 2 = 2 | = 179 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (179 % 11) = 11 - 3 = 8.

### Cálculo do segundo dígito verificador (14ª posição)

Utiliza-se os 13 dígitos base + o primeiro dígito verificador, para o nosso exemplo temos: 64.786.204/0001-8.

| Dígitos | 6           | 4           | 7           | 8           | 6           | 2           | 0          | 4           | 0          | 0          | 0          | 1          | 8           | ---   |
| ------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ----------- | ----- |
| Pesos   | 6           | 5           | 4           | 3           | 2           | 9           | 8          | 7           | 6          | 5          | 4          | 3          | 2           | ---   |
| Cálculo | 6 \* 6 = 36 | 4 \* 5 = 20 | 7 \* 4 = 28 | 8 \* 3 = 24 | 6 \* 2 = 12 | 2 \* 9 = 18 | 0 \* 8 = 0 | 4 \* 7 = 28 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 1 \* 3 = 3 | 8 \* 2 = 16 | = 185 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (185 % 11) = 11 - 9 = 2.

### Resultado final

64.786.204/0001-82

### Observações

- O dígito verificador será "0" quando o resultado for 10.

## Alternativas

O método de verificação mostrado acima é um dos métodos difundidos na internet, mas através de pesquisas, é possivel encontrar outras formas de validação, a mais comum é a seguinte:

- O que muda:
  - Pesos
    - Para o primeiro dígito usa-se: 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, calculados da esquerda para a direita
    - Para o segundo dígito usa-se: 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, calculados da esquerda para a direita
  - Para chegar ao dígito verificador não é feita a subtração de 11 pelo resto da divisão, e sim, retorna-se o resto da divisão diretamente
- Todo o resto permanece igual, caso deseje testar basta ir nas funções desta library, trocar os pesos e adicionar a propriedade para que o mod seja retornado diretamente, todos os testes irão passar.
