# Validação CNH

## Sumário

- [Validação CNH](#validação-cnh)
  - [Sumário](#sumário)
  - [Informações](#informações)
  - [Validação](#validação)
    - [Cálculo do primeiro dígito verificador (10ª posição)](#cálculo-do-primeiro-dígito-verificador-10ª-posição)
    - [Cálculo do segundo dígito verificador (11ª posição)](#cálculo-do-segundo-dígito-verificador-11ª-posição)
    - [Resultado final](#resultado-final)
    - [Observações](#observações)

## Informações

- Tamanho: 11 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 2, 3, 4, 5, 6, 7, 8, 9, 10, calculados da esquerda para a direita
  - 2º dígito: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, calculados da esquerda para a direita
- Formato: 9 dígitos + 2 dígitos verificadores (XXXXXXXXXDD)
  - X: 9 dígitos base
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXXXXXXXXDD
- Exemplo: 79143829831

## Validação

### Cálculo do primeiro dígito verificador (10ª posição)

Utiliza-se os 9 dígitos base, para o nosso exemplo temos: 791438298.

| Dígitos | 7           | 9           | 1          | 4           | 3           | 8           | 2           | 9           | 8            | ---   |
| ------- | ----------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ------------ | ----- |
| Pesos   | 2           | 3           | 4          | 5           | 6           | 7           | 8           | 9           | 10           | ---   |
| Cálculo | 7 \* 2 = 14 | 9 \* 3 = 27 | 1 \* 4 = 4 | 4 \* 5 = 20 | 3 \* 6 = 18 | 8 \* 7 = 56 | 2 \* 8 = 16 | 9 \* 9 = 81 | 8 \* 10 = 80 | = 316 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (316 % 11) = 11 - 8. O dígito verificador é 3.

### Cálculo do segundo dígito verificador (11ª posição)

Utiliza-se o primeiro dígito verificador + os 9 dígitos base, para o nosso exemplo temos: 3791438298.

| Dígitos | 3          | 7           | 9           | 1          | 4           | 3           | 8           | 2           | 9            | 8            | ---   |
| ------- | ---------- | ----------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ------------ | ------------ | ----- |
| Pesos   | 2          | 3           | 4           | 5          | 6           | 7           | 8           | 9           | 10           | 11           | ---   |
| Cálculo | 3 \* 2 = 6 | 7 \* 3 = 21 | 9 \* 4 = 36 | 1 \* 5 = 5 | 4 \* 6 = 24 | 3 \* 7 = 21 | 8 \* 8 = 64 | 2 \* 9 = 18 | 9 \* 10 = 90 | 8 \* 11 = 88 | = 373 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (373 % 11) = 11 - 10. O dígito verificador é 1.

### Resultado final

79143829831

### Observações

- Caso o resultado do cálculo do dígito verificador seja 10 ou 11, o dígito verificador será 0.
- A validação acima não verifica se a CNH é válida, apenas se o número é válido.
