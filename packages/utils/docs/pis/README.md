# Validação PIS

## Sumário

- [Validação PIS](#validação-pis)
  - [Sumário](#sumário)
  - [Informações](#informações)
  - [Validação](#validação)
    - [Cálculo do dígito verificador (11ª posição)](#cálculo-do-dígito-verificador-11ª-posição)
    - [Resultado final](#resultado-final)
    - [Observações](#observações)

## Informações

- Tamanho: 11 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 10 dígitos + 1 dígito verificador (XXXXXXXXXXX-D)
  - X: 10 dígitos base
  - D: Dígito verificador
- Máscara: XXX.XXXXX.XX-D
- Exemplo: 469.52280.63-7

## Validação

### Cálculo do dígito verificador (11ª posição)

Utiliza-se os 10 primeiros dígitos do PIS para calcular o dígito verificador.

| Dígitos | 4           | 6           | 9           | 5           | 2           | 2           | 8           | 0          | 6           | 3          | ---   |
| ------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----------- | ---------- | ----- |
| Pesos   | 3           | 2           | 9           | 8           | 7           | 6           | 5           | 4          | 3           | 2          | ---   |
| Cálculo | 4 \* 3 = 12 | 6 \* 2 = 12 | 9 \* 9 = 81 | 5 \* 8 = 40 | 2 \* 7 = 14 | 2 \* 6 = 12 | 8 \* 5 = 40 | 0 \* 4 = 0 | 6 \* 3 = 18 | 3 \* 2 = 6 | = 235 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima por 11. Então, 11 - (235 % 11) = 11 - 4 = 7.

O dígito verificador é 7.

### Resultado final

469.52280.63-7

### Observações

- Caso o dígito verificador calculado seja 10 ou 11, o dígito verificador será 0.
