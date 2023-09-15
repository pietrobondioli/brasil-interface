# Validação CPF

## Sumário

- [Validação CPF](#validação-cpf)
  - [Sumário](#sumário)
  - [Informações](#informações)
  - [Validação](#validação)
    - [Cálculo do primeiro dígito verificador (10ª posição):](#cálculo-do-primeiro-dígito-verificador-10ª-posição)
    - [Cálculo do segundo dígito verificador (11ª posição):](#cálculo-do-segundo-dígito-verificador-11ª-posição)
    - [Resultado final:](#resultado-final)
    - [Observações](#observações)
  - [Alternativas](#alternativas)

## Informações

- Tamanho: 11 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 10, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
  - 2º dígito: 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 9 dígitos + 2 dígitos verificadores (XXX.XXX.XXX-DD)
  - X: 9 dígitos base
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXX.XXX.XXX-DD
- Exemplo: 043.795.470-60

## Validação

### Cálculo do primeiro dígito verificador (10ª posição):

Utiliza-se os 9 dígitos base, para o nosso exemplo temos: 043.795.470.

| Dígitos | 0           | 4           | 3           | 7           | 9           | 5           | 4           | 7           | 0          | ---   |
| ------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----- |
| Pesos   | 10          | 9           | 8           | 7           | 6           | 5           | 4           | 3           | 2          | ---   |
| Cálculo | 0 \* 10 = 0 | 4 \* 9 = 36 | 3 \* 8 = 24 | 7 \* 7 = 49 | 9 \* 6 = 54 | 5 \* 5 = 25 | 4 \* 4 = 16 | 7 \* 3 = 21 | 0 \* 2 = 0 | = 225 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (225 % 11) = 11 - 5 = 6.

O 1º dígito verificador é 6.

### Cálculo do segundo dígito verificador (11ª posição):

Utiliza-se os 9 dígitos base + o primeiro dígito verificador, para o nosso exemplo temos: 043.795.470-6.

| Dígitos | 0           | 4            | 3           | 7           | 9           | 5           | 4           | 7           | 0          | 6           | ---   |
| ------- | ----------- | ------------ | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----------- | ----- |
| Pesos   | 11          | 10           | 9           | 8           | 7           | 6           | 5           | 4           | 3          | 2           | ---   |
| Cálculo | 0 \* 11 = 0 | 4 \* 10 = 40 | 3 \* 9 = 27 | 7 \* 8 = 56 | 9 \* 7 = 63 | 5 \* 6 = 30 | 4 \* 5 = 20 | 7 \* 4 = 28 | 0 \* 3 = 0 | 6 \* 2 = 12 | = 276 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (276 % 11) = 11 - 1 = 10.

O 2º dígito verificador é 0.

### Resultado final:

043.795.470-60

### Observações

- O dígito verificador será "0" quando o resultado for 10.

## Alternativas

O método de verificação mostrado acima é um dos métodos difundidos na internet, mas através de pesquisas, é possivel encontrar outras formas de validação, a mais comum é a seguinte:

- O que muda:
  - Pesos
    - Para o primeiro dígito usa-se: 1, 2, 3, 4, 5, 6, 7, 8, 9, calculados da esquerda para a direita
    - Para o segundo dígito usa-se: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, calculados da esquerda para a direita
  - Para chegar ao dígito verificador não é feita a subtração de 11 pelo resto da divisão, e sim, retorna-se o resto da divisão diretamente
- Todo o resto permanece igual, caso deseje testar basta ir nas funções desta library, trocar os pesos e adicionar a propriedade para que o mod seja retornado diretamente, todos os testes irão passar.
