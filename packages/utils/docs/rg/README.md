# Validação RG

## Sumário

- [Validação RG](#validação-rg)
  - [Sumário](#sumário)
  - [Estados](#estados)
    - [SP](#sp)
      - [Informações](#informações)
      - [Validação](#validação)
        - [Cálculo do dígito verificador (9ª posição):](#cálculo-do-dígito-verificador-9ª-posição)
      - [Resultado final:](#resultado-final)
      - [Observações](#observações)

## Estados

### SP

#### Informações

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XXXXXXXXD)
  - X: 8 dígitos base
  - D: Dígito verificador
- Máscara: XX.XXX.XXX-D
- Exemplo: 31.203.131-2

#### Validação

##### Cálculo do dígito verificador (9ª posição):

Utiliza-se os 8 dígitos base, para o nosso exemplo temos: 31.203.131.

| Dígitos | 3           | 1          | 2           | 0          | 3           | 1          | 3          | 1          | ---  |
| ------- | ----------- | ---------- | ----------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---- |
| Pesos   | 9           | 8          | 7           | 6          | 5           | 4          | 3          | 2          | ---  |
| Cálculo | 3 \* 9 = 27 | 1 \* 8 = 8 | 2 \* 7 = 14 | 0 \* 6 = 0 | 3 \* 5 = 15 | 1 \* 4 = 4 | 3 \* 3 = 9 | 1 \* 2 = 2 | = 79 |

O resultado da soma dos produtos é dividido por 11, e o dígito verificador é o resto dessa divisão. Então, 79 / 11 = 7 e resto 2.

O 1º dígito verificador é 2.

#### Resultado final:

31.203.131-2

#### Observações

- O dígito verificador será "X" quando o resultado da divisão for 10.
