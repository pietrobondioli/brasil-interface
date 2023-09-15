# Validação Inscrição Estadual

## Sumário

- [Validação Inscrição Estadual](#validação-inscrição-estadual)
  - [Sumário](#sumário)
  - [Estados](#estados)
    - [São Paulo](#são-paulo)
      - [Caso 1: Industriais e comerciantes](#caso-1-industriais-e-comerciantes)
      - [Caso 2: Inscrição estadual de Produtor Rural](#caso-2-inscrição-estadual-de-produtor-rural)
    - [Acre](#acre)
    - [Alagoas](#alagoas)
    - [Amapá](#amapá)
    - [Amazonas](#amazonas)
    - [Bahia](#bahia)
      - [Caso 1: Inscrições com 8 digitos cujo primeiro dígito da I.E. é 0, 1, 2, 3, 4, 5 ou 8](#caso-1-inscrições-com-8-digitos-cujo-primeiro-dígito-da-ie-é-0-1-2-3-4-5-ou-8)
      - [Caso 2: Inscrições com 8 digitos cujo primeiro dígito da I.E. é 6, 7 ou 9](#caso-2-inscrições-com-8-digitos-cujo-primeiro-dígito-da-ie-é-6-7-ou-9)
      - [Caso 3: Inscrições com 9 digitos cujo primeiro dígito da I.E. é 0, 1, 2, 3, 4, 5 ou 8](#caso-3-inscrições-com-9-digitos-cujo-primeiro-dígito-da-ie-é-0-1-2-3-4-5-ou-8)
      - [Caso 4: Inscrições com 9 digitos cujo primeiro dígito da I.E. é 6, 7 ou 9](#caso-4-inscrições-com-9-digitos-cujo-primeiro-dígito-da-ie-é-6-7-ou-9)
    - [Ceará](#ceará)
    - [Distrito Federal](#distrito-federal)
    - [Espírito Santo](#espírito-santo)
    - [Goiás](#goiás)
    - [Maranhão](#maranhão)
    - [Mato Grosso](#mato-grosso)
    - [Mato Grosso do Sul](#mato-grosso-do-sul)
    - [Minas Gerais](#minas-gerais)
    - [Pará](#pará)
    - [Paraíba](#paraíba)
    - [Paraná](#paraná)

## Estados

### São Paulo

#### Caso 1: Industriais e comerciantes

- Tamanho: 12 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 1, 3, 4, 5, 6, 7, 8, 10, calculados da esquerda para a direita
  - 2º dígito: 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador + 2 dígitos + 1 dígito verificador (XXX.XXX.XXD.YYD)
  - X: 8 dígitos utilizados para o cálculo do primeiro dígito verificador
  - D: Primeiro dígito verificador
  - Y: 2 dígitos utilizados para o cálculo do segundo dígito verificador (junta-se ao restante da inscrição estadual à esquerda)
  - D: Segundo dígito verificador
- Máscara: XXX.XXX.XXX.XXX
- Exemplo: 110042490114

**Validação**

1. Cálculo do primeiro dígito verificador (9ª posição):

| Inscrição | 1          | 1          | 0          | 0          | 4           | 2           | 4           | 9            | -     |
| --------- | ---------- | ---------- | ---------- | ---------- | ----------- | ----------- | ----------- | ------------ | ----- |
| Pesos     | 1          | 3          | 4          | 5          | 6           | 7           | 8           | 10           | -     |
| Cálculo   | 1 \* 1 = 1 | 1 \* 3 = 3 | 0 \* 4 = 0 | 0 \* 5 = 0 | 4 \* 6 = 24 | 2 \* 7 = 14 | 4 \* 8 = 32 | 9 \* 10 = 90 | = 164 |

O dígito verificador será o algarismo mais à direita do resto da divisão do resultado obtido acima (164) por 11 à 164/11 = 14 com resto = 10, então o 1º dígito verificador (9ª posição) é 0.

OBS: Caso o resultado seja 10, o dígito verificador será 0. Caso o resultado seja 11, o dígito verificador será 1.

2. Cálculo do segundo dígito verificador (12ª posição):

| Inscrição | 1          | 1          | 0           | 0          | 4           | 2           | 4           | 9           | 0          | 1          | 1          | -     |
| --------- | ---------- | ---------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ---------- | ---------- | ---------- | ----- |
| Pesos     | 3          | 2          | 10          | 9          | 8           | 7           | 6           | 5           | 4          | 3          | 2          | -     |
| Cálculo   | 1 \* 3 = 3 | 1 \* 2 = 2 | 0 \* 10 = 0 | 0 \* 9 = 0 | 4 \* 8 = 32 | 2 \* 7 = 14 | 4 \* 6 = 24 | 9 \* 5 = 45 | 0 \* 4 = 0 | 1 \* 3 = 3 | 1 \* 2 = 2 | = 125 |

O dígito verificador será o algarismo mais à direita do resto da divisão do resultado obtido acima (118) por 11 à 125/11 = 11 com resto = 4, então o 2º dígito verificador (12ª posição) é 4.

Consequentemente, a inscrição estadual do produtor rural fica como 110042490114.

#### Caso 2: Inscrição estadual de Produtor Rural

- Tamanho: 13 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 1, 3, 4, 5, 6, 7, 8, 10, calculados da esquerda para a direita
- Formato: P + 0 + 8 dígitos + 1 dígito verificador + 3 dígitos (P-0XXXXXXX.D/YYY)
  - P: A inscrição estadual de produtor rural inicia com a letra "P"
  - 0: Constante 0
  - X: 7 dígitos utilizados para o cálculo do dígito verificador (junta-se ao dígito 0)
  - D: Dígito verificador
  - Y: 3 dígitos que compõem o número de inscrição, mas que não são utilizados no cálculo do dígito verificador
- Máscara: X-XXXXXXXX-X/XXX
- Exemplo: P-01100424.3/002

**Validação**

1. Cálculo do dígito verificador (10º posição):

| Inscrição | P   | 0   | 1          | 1          | 0          | 0          | 4           | 2           | 4            | 3    | -   | -   | -   |
| --------- | --- | --- | ---------- | ---------- | ---------- | ---------- | ----------- | ----------- | ------------ | ---- | --- | --- | --- |
| Pesos     | -   | 1   | 3          | 4          | 5          | 6          | 7           | 8           | 10           | -    | -   | -   | -   |
| Cálculo   | -   | 0   | 1 \* 3 = 3 | 1 \* 4 = 4 | 0 \* 5 = 0 | 0 \* 6 = 0 | 4 \* 7 = 28 | 2 \* 8 = 16 | 4 \* 10 = 40 | = 91 | -   | -   | -   |

O dígito verificador será o algarismo mais à direita do resto da divisão do resultado obtido acima (91) por 11. O resto da divisão de 91 por 11 é 3. Assim, o dígito verificador (10º posição) é 3.

Consequentemente, a inscrição estadual do produtor rural fica como P-01100424.3/002.

### Acre

- Tamanho: 13 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
  - 2º dígito: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, calculados da esquerda para a direita
- Formato: 11 dígitos + 2 dígitos verificadores (01.XXX.XXX/XXX-DD)
  - 01: Deve ser o valor constante 01
  - X: 9 dígitos utilizados para o cálculo do primeiro dígito verificador (junta-se ao código 01)
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XX.XXX.XXX/XXX-XX
- Exemplo: 01.004.823/001-12

**Validação**

1. Cálculo do primeiro dígito verificador (12ª posição):

| Inscrição | 0         | 1         | 0         | 0         | 4          | 8          | 2          | 3          | 0         | 0         | 1         | -     | -   |
| --------- | --------- | --------- | --------- | --------- | ---------- | ---------- | ---------- | ---------- | --------- | --------- | --------- | ----- | --- |
| Pesos     | 4         | 3         | 2         | 9         | 8          | 7          | 6          | 5          | 4         | 3         | 2         | -     | -   |
| Cálculo   | 4 x 0 = 0 | 3 x 1 = 3 | 2 x 0 = 0 | 9 x 0 = 0 | 8 x 4 = 32 | 7 x 8 = 56 | 6 x 2 = 12 | 5 x 3 = 15 | 4 x 0 = 0 | 3 x 0 = 0 | 2 x 1 = 2 | = 120 | -   |

O dígito verificador é o algarismo resultante de 11 menos o resto da divisão do resultado obtido acima (120) por 11. A divisão de 120 por 11 resulta em resto 10. Então, 11 - 10 = 1. O 1º dígito verificador (12ª posição) é 1.

2. Cálculo do segundo dígito verificador (13ª posição):

| Inscrição | 0         | 1         | 0         | 0         | 4          | 8          | 2          | 3          | 0         | 0         | 1         | 1         | -     |
| --------- | --------- | --------- | --------- | --------- | ---------- | ---------- | ---------- | ---------- | --------- | --------- | --------- | --------- | ----- |
| Pesos     | 5         | 4         | 3         | 2         | 9          | 8          | 7          | 6          | 5         | 4         | 3         | 2         | -     |
| Cálculo   | 5 x 0 = 0 | 4 x 1 = 4 | 3 x 0 = 0 | 2 x 0 = 0 | 9 x 4 = 36 | 8 x 8 = 64 | 7 x 2 = 14 | 6 x 3 = 18 | 5 x 0 = 0 | 4 x 0 = 0 | 3 x 1 = 3 | 2 x 1 = 2 | = 141 |

O dígito verificador é o algarismo resultante de 11 menos o resto da divisão do resultado obtido acima (141) por 11. A divisão de 141 por 11 resulta em resto 9. Então, 11 - 9 = 2. O 2º dígito verificador (13ª posição) é 2.

Consequentemente, a inscrição estadual do Acre fica como 01.004.823/001-12.

### Alagoas

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (24XXXXXX-D)
  - Primeiros 2 dígitos: Deve ser o valor constante 24
  - X: 6 dígitos utilizados para o cálculo do dígito verificador (junta-se ao código 24)
  - D: Dígito verificador
- Máscara: XXX.XXX.XXX
- Exemplo: 240000048

**Cálculo do dígito verificador (9ª posição):**

| Inscrição | 2           | 4           | 0          | 0          | 0          | 0          | 0          | 4          | -    |
| --------- | ----------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 9           | 8           | 7          | 6          | 5          | 4          | 3          | 2          | -    |
| Cálculo   | 2 \* 9 = 18 | 4 \* 8 = 32 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 0 \* 3 = 0 | 4 \* 2 = 8 | = 58 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (58) por 11. A divisão de 58 por 11 resulta em resto 3. Então, 11 - 3 = 8. O dígito verificador (9ª posição) é 8.

OBS: Caso o resultado seja 10, o dígito verificador será 0. Caso o resultado seja 11, o dígito verificador será 0.

Consequentemente, a inscrição estadual para Alagoas fica como 240000048.

### Amapá

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 2 dígitos constantes (03) + 6 dígitos (empresa) + 1 dígito verificador (03XXXXXX-D)
  - 03: Deve ser o valor constante 03
  - X: 6 dígitos referentes à empresa
  - D: Dígito verificador
- Máscara: 03.XXX.XXX-X
- Exemplo: 030123459

**Validação**

1. Verificação dos dois primeiros dígitos:

Deve-se certificar de que os dois primeiros dígitos são 03.

2. Antes de calcular o dígito verificador, é necessário definir 2 valores de acordo com a faixa de inscrição estadual, chamaremos estes valores de "p" e "d":

Neste caso consideramos apenas os 8 primeiros dígitos, ou seja, 03012345.

De 03000001 a 03017000 -> `p = 5 e d = 0`

De 03017001 a 03019022 -> `p = 9 e d = 1`

De 03019023 em diante -> `p = 0 e d = 0`

1. Cálculo do dígito verificador (9ª posição):

Neste caso temos p = 5 e d = 0, então:

| Inscrição | 0          | 3           | 0          | 1          | 2           | 3           | 4           | 5           | -   | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ----------- | ----------- | ----------- | ----------- | --- | ---- |
| Pesos     | 9          | 8           | 7          | 6          | 5           | 4           | 3           | 2           | -   | -    |
| Cálculo   | 0 \* 9 = 0 | 3 \* 8 = 24 | 0 \* 7 = 0 | 1 \* 6 = 6 | 2 \* 5 = 10 | 3 \* 4 = 12 | 4 \* 3 = 12 | 5 \* 2 = 10 | p   | = 79 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (79) por 11. A divisão de 79 por 11 resulta em resto 2. Então, 11 - 2 = 9. O dígito verificador (9ª posição) é 9.

Caso o resultado seja 10, o dígito verificador será 0. Caso o resultado seja 11, o dígito verificador será d.

### Amazonas

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XXXXXXXX-D)
  - X: 8 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XXXXXXXX-X
- Exemplo: 806089008

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 8           | 0          | 6           | 0          | 8           | 9           | 0          | 0          | -     |
| --------- | ----------- | ---------- | ----------- | ---------- | ----------- | ----------- | ---------- | ---------- | ----- |
| Pesos     | 9           | 8          | 7           | 6          | 5           | 4           | 3          | 2          | -     |
| Cálculo   | 8 \* 9 = 72 | 0 \* 8 = 0 | 6 \* 7 = 42 | 0 \* 6 = 0 | 8 \* 5 = 40 | 9 \* 4 = 36 | 0 \* 3 = 0 | 0 \* 2 = 0 | = 190 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (190) por 11. A divisão de 190 por 11 resulta em resto 9. Então, 11 - 9 = 2. O dígito verificador (9ª posição) é 2.

### Bahia

#### Caso 1: Inscrições com 8 digitos cujo primeiro dígito da I.E. é 0, 1, 2, 3, 4, 5 ou 8

- Tamanho: 8 dígitos
- Método: Módulo 10
- Pesos
  - 1º dígito: 2, 3, 4, 5, 6, 7, 8, calculados da direita para a esquerda
  - 2º dígito: 2, 3, 4, 5, 6, 7, calculados da direita para a esquerda
- Formato: 6 dígitos + 1 dígito verificador + 1 dígito verificador (XXXXXXX-DD)
  - X: 6 dígitos utilizados para o cálculo do primeiro dígito verificador
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXXXXXXX-XX
- Exemplo: 123456-63

**Validação**

1. Cálculo do segundo dígito verificador (8ª posição):

| Inscrição | 1          | 2           | 3           | 4           | 5           | 6           | -    |
| --------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---- |
| Pesos     | 7          | 6           | 5           | 4           | 3           | 2           | -    |
| Cálculo   | 1 \* 7 = 7 | 2 \* 6 = 12 | 3 \* 5 = 15 | 4 \* 4 = 16 | 5 \* 3 = 15 | 6 \* 2 = 12 | = 77 |

O dígito verificador é o resultado de 10 menos o resto da divisão do resultado obtido acima (77) por 10. A divisão de 77 por 10 resulta em resto 7. Então, 10 - 7 = 3. O dígito verificador (8ª posição) é 3.

2. Cálculo do primeiro dígito verificador (7ª posição):

| Inscrição | 1          | 2           | 3           | 4           | 5           | 6           | 3          | ----- |
| --------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----- |
| Pesos     | 8          | 7           | 6           | 5           | 4           | 3           | 2          | ----- |
| Cálculo   | 1 \* 8 = 8 | 2 \* 7 = 14 | 3 \* 6 = 18 | 4 \* 5 = 20 | 5 \* 4 = 20 | 6 \* 3 = 18 | 3 \* 2 = 6 | = 104 |

O dígito verificador é o resultado de 10 menos o resto da divisão do resultado obtido acima (104) por 10. A divisão de 104 por 10 resulta em resto 4. Então, 10 - 4 = 6. O dígito verificador (7ª posição) é 6.

Consequentemente, a inscrição estadual da Bahia fica como 123456-63.

#### Caso 2: Inscrições com 8 digitos cujo primeiro dígito da I.E. é 6, 7 ou 9

- Tamanho: 8 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 2, 3, 4, 5, 6, 7, 8, calculados da direita para a esquerda
  - 2º dígito: 2, 3, 4, 5, 6, 7, calculados da direita para a esquerda
- Formato: 6 dígitos + 1 dígito verificador + 1 dígito verificador (XXXXXXX-DD)
- Máscara: XXXXXXXX-XX
- Exemplo: 612345-57

**Validação**

1. Cálculo do segundo dígito verificador (8ª posição):

| Inscrição | 6           | 1          | 2           | 3           | 4           | 5           | -    |
| --------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ---- |
| Pesos     | 7           | 6          | 5           | 4           | 3           | 2           | -    |
| Cálculo   | 6 \* 7 = 42 | 1 \* 6 = 6 | 2 \* 5 = 10 | 3 \* 4 = 12 | 4 \* 3 = 12 | 5 \* 2 = 10 | = 92 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (92) por 11. A divisão de 92 por 11 resulta em resto 4. Então, 11 - 4 = 7. O dígito verificador (8ª posição) é 7.

OBS: Quando o resto for 0 ou 1, o segundo dígito é igual a 0.

2. Cálculo do primeiro dígito verificador (7ª posição):

| Inscrição | 6           | 1          | 2           | 3           | 4           | 5           | 7           | ----- |
| --------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----- |
| Pesos     | 8           | 7          | 6           | 5           | 4           | 3           | 2           | ----- |
| Cálculo   | 6 \* 8 = 48 | 1 \* 7 = 7 | 2 \* 6 = 12 | 3 \* 5 = 15 | 4 \* 4 = 16 | 5 \* 3 = 15 | 7 \* 2 = 14 | = 127 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (127) por 11. A divisão de 127 por 11 resulta em resto 6. Então, 11 - 6 = 5. O dígito verificador (7ª posição) é 5.

Consequentemente, a inscrição estadual da Bahia fica como 612345-57.

#### Caso 3: Inscrições com 9 digitos cujo primeiro dígito da I.E. é 0, 1, 2, 3, 4, 5 ou 8

- Tamanho: 9 dígitos
- Método: Módulo 10
- Pesos
  - 1º dígito: 2, 3, 4, 5, 6, 7, 8, calculados da direita para a esquerda
  - 2º dígito: 2, 3, 4, 5, 6, 7, 8, 9 calculados da direita para a esquerda
- Formato: 7 dígitos + 1 dígito verificador + 1 dígito verificador (XXXXXXXX-DD)
  - X: 7 dígitos utilizados para o cálculo do primeiro dígito verificador
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXXXXXXX-XX
- Exemplo: 1000003-06

**Validação**

1. Cálculo do segundo dígito verificador (9ª posição):

| Inscrição | 1          | 0          | 0          | 0          | 0          | 0          | 3          | -    |
| --------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 8          | 7          | 6          | 5          | 4          | 3          | 2          | -    |
| Cálculo   | 1 \* 8 = 8 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 0 \* 3 = 0 | 3 \* 2 = 6 | = 14 |

O dígito verificador é o resultado de 10 menos o resto da divisão do resultado obtido acima (14) por 10. A divisão de 14 por 10 resulta em resto 4. Então, 10 - 4 = 6. O dígito verificador (9ª posição) é 6.

2. Cálculo do primeiro dígito verificador (8ª posição):

| Inscrição | 1          | 0          | 0          | 0          | 0          | 0          | 3          | 6           | ----- |
| --------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ----------- | ----- |
| Pesos     | 9          | 8          | 7          | 6          | 5          | 4          | 3          | 2           | ----- |
| Cálculo   | 1 \* 9 = 9 | 0 \* 8 = 0 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 3 \* 3 = 9 | 6 \* 2 = 12 | = 30  |

O dígito verificador é o resultado de 10 menos o resto da divisão do resultado obtido acima (30) por 10. A divisão de 30 por 10 resulta em resto 0. Então, 10 - 0 = 0. O dígito verificador (8ª posição) é 0.

Consequentemente, a inscrição estadual da Bahia fica como 1000003-06.

#### Caso 4: Inscrições com 9 digitos cujo primeiro dígito da I.E. é 6, 7 ou 9

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 2, 3, 4, 5, 6, 7, 8, calculados da direita para a esquerda
  - 2º dígito: 2, 3, 4, 5, 6, 7, 8, 9 calculados da direita para a esquerda
- Formato: 7 dígitos + 1 dígito verificador + 1 dígito verificador (XXXXXXXX-DD)
  - X: 7 dígitos utilizados para o cálculo do primeiro dígito verificador
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXXXXXXX-XX
- Exemplo: 6123456-78

**Validação**

1. Cálculo do segundo dígito verificador (9ª posição):

| Inscrição | 6           | 1          | 2           | 3           | 4           | 5           | 6           | -     |
| --------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----- |
| Pesos     | 8           | 7          | 6           | 5           | 4           | 3           | 2           | -     |
| Cálculo   | 6 \* 8 = 48 | 1 \* 7 = 7 | 2 \* 6 = 12 | 3 \* 5 = 15 | 4 \* 4 = 16 | 5 \* 3 = 15 | 6 \* 2 = 12 | = 125 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (125) por 11. A divisão de 125 por 11 resulta em resto 3. Então, 11 - 3 = 8. O dígito verificador (9ª posição) é 8.

2. Cálculo do primeiro dígito verificador (8ª posição):

| Inscrição | 6           | 1          | 2           | 3           | 4           | 5           | 6           | 8           | ----- |
| --------- | ----------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----- |
| Pesos     | 9           | 8          | 7           | 6           | 5           | 4           | 3           | 2           | ----- |
| Cálculo   | 6 \* 9 = 54 | 1 \* 8 = 8 | 2 \* 7 = 14 | 3 \* 6 = 18 | 4 \* 5 = 20 | 5 \* 4 = 20 | 6 \* 3 = 18 | 8 \* 2 = 16 | = 168 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (168) por 11. A divisão de 168 por 11 resulta em resto 4. Então, 11 - 4 = 7. O dígito verificador (8ª posição) é 7.

Consequentemente, a inscrição estadual da Bahia fica como 6123456-78.

OBS: Quando o resto for 0 ou 1, o segundo dígito é igual a 0.

### Ceará

- Tamanho: 9 dígitos
- Estratégia: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XXXXXXXX-D)
  - X: 8 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XXXXXXXX-X
- Exemplo: 06000001-5

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 0          | 6           | 0          | 0          | 0          | 0          | 0          | 1          | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 9          | 8           | 7          | 6          | 5          | 4          | 3          | 2          | ---- |
| Cálculo   | 0 \* 9 = 0 | 6 \* 8 = 48 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 0 \* 3 = 0 | 1 \* 2 = 2 | = 50 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (50) por 11. A divisão de 50 por 11 resulta em resto 6. Então, 11 - 6 = 5. O dígito verificador (9ª posição) é 5.

Consequentemente, a inscrição estadual do Ceará fica como 06000001-5.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Distrito Federal

- Tamanho: 13 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
  - 2º dígito: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 11 dígitos + 2 dígitos verificadores (XX.XXXXXXX/XXX-DD)
  - X: 11 dígitos utilizados para o cálculo do primeiro dígito verificador
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XX.XXXXXXX/XXX-XX
- Exemplo: 07.300.001/001-09

**Validação**

1. Cálculo do primeiro dígito verificador (12ª posição):

| Inscrição | 0          | 7           | 3          | 0          | 0          | 0          | 0          | 1          | 0          | 0          | 1          | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 4          | 3           | 2          | 9          | 8          | 7          | 6          | 5          | 4          | 3          | 2          | ---- |
| Cálculo   | 0 \* 4 = 0 | 7 \* 3 = 21 | 3 \* 2 = 6 | 0 \* 9 = 0 | 0 \* 8 = 0 | 0 \* 7 = 0 | 0 \* 6 = 0 | 1 \* 5 = 5 | 0 \* 4 = 0 | 0 \* 3 = 0 | 1 \* 2 = 2 | = 34 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (34) por 11. A divisão de 34 por 11 resulta em resto 1. Então, 11 - 1 = 10. O dígito verificador (12ª posição) é 0.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

2. Cálculo do segundo dígito verificador (13ª posição):

| Inscrição | 0          | 7           | 3          | 0          | 0          | 0          | 0          | 1          | 0          | 0          | 1          | 0          | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 5          | 4           | 3          | 2          | 9          | 8          | 7          | 6          | 5          | 4          | 3          | 2          | ---- |
| Cálculo   | 0 \* 5 = 0 | 7 \* 4 = 28 | 3 \* 3 = 9 | 0 \* 2 = 0 | 0 \* 9 = 0 | 0 \* 8 = 0 | 0 \* 7 = 0 | 1 \* 6 = 6 | 0 \* 5 = 0 | 0 \* 4 = 0 | 1 \* 3 = 3 | 0 \* 2 = 0 | = 46 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (46) por 11. A divisão de 46 por 11 resulta em resto 2. Então, 11 - 2 = 9. O dígito verificador (13ª posição) é 9.

Consequentemente, a inscrição estadual do Distrito Federal fica como 07.300.001/001-09.

### Espírito Santo

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XXXXXXXX-D)
  - X: 8 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XXXXXXXX-X
- Exemplo: 30118832-7

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 3           | 0          | 1          | 1          | 8           | 8           | 3          | 2          | -     |
| --------- | ----------- | ---------- | ---------- | ---------- | ----------- | ----------- | ---------- | ---------- | ----- |
| Pesos     | 9           | 8          | 7          | 6          | 5           | 4           | 3          | 2          | ----  |
| Cálculo   | 3 \* 9 = 27 | 0 \* 8 = 0 | 1 \* 7 = 7 | 1 \* 6 = 6 | 8 \* 5 = 40 | 8 \* 4 = 32 | 3 \* 3 = 9 | 2 \* 2 = 4 | = 125 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (125) por 11. A divisão de 125 por 11 resulta em resto 4. Então, 11 - 4 = 7. O dígito verificador (9ª posição) é 7.

Consequentemente, a inscrição estadual do Espírito Santo fica como 30118832-7.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Goiás

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XX.XXX.XXX-D)
  - X: 8 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XX.XXX.XXX-X
- Exemplo: 10.987.654-7

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 1          | 0          | 9           | 8           | 7           | 6           | 5           | 4          | -     |
| --------- | ---------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----- |
| Pesos     | 9          | 8          | 7           | 6           | 5           | 4           | 3           | 2          | ----  |
| Cálculo   | 1 \* 9 = 9 | 0 \* 8 = 0 | 9 \* 7 = 63 | 8 \* 6 = 48 | 7 \* 5 = 35 | 6 \* 4 = 24 | 5 \* 3 = 15 | 4 \* 2 = 8 | = 202 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (202) por 11. A divisão de 202 por 11 resulta em resto 3. Então, 11 - 3 = 8. O dígito verificador (9ª posição) é 8.

Consequentemente, a inscrição estadual de Goiás fica como 10.987.654-7.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Maranhão

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XX.XXX.XXX-X)
  - X: 8 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XX.XXX.XXX-X
- Exemplo: 12.000.038-X

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 1          | 2           | 0          | 0          | 0          | 0          | 3          | 8           | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ----------- | ---- |
| Pesos     | 9          | 8           | 7          | 6          | 5          | 4          | 3          | 2           | ---- |
| Cálculo   | 1 \* 9 = 9 | 2 \* 8 = 16 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 3 \* 3 = 9 | 8 \* 2 = 16 | = 50 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (50) por 11. A divisão de 50 por 11 resulta em resto 6. Então, 11 - 6 = 5. O dígito verificador (9ª posição) é 5.

Consequentemente, a inscrição estadual do Maranhão fica como 12.000.038-5.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Mato Grosso

- Tamanho: 11 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 10 dígitos + 1 dígito verificador (XX.XXX.XXX-X)
  - X: 10 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XX.XXX.XXX-X
- Exemplo: 0013000001-9

**Validação**

1. Cálculo do dígito verificador (11ª posição):

| Inscrição | 0          | 0          | 1          | 3           | 0          | 0          | 0          | 0          | 0          | 1          | -    |
| --------- | ---------- | ---------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 3          | 2          | 9          | 8           | 7          | 6          | 5          | 4          | 3          | 2          | ---- |
| Cálculo   | 0 \* 3 = 0 | 0 \* 2 = 0 | 1 \* 9 = 9 | 3 \* 8 = 24 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 0 \* 3 = 0 | 1 \* 2 = 2 | = 35 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (35) por 11. A divisão de 35 por 11 resulta em resto 2. Então, 11 - 2 = 9. O dígito verificador (11ª posição) é 9.

Consequentemente, a inscrição estadual do Mato Grosso fica como 0013000001-9.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Mato Grosso do Sul

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (28.XXX.XXX-X)
  - 28: Código do estado, constante
  - X: 6 dígitos utilizados para o cálculo do dígito verificador (junta-se ao código do estado)
  - D: Dígito verificador
- Máscara: XX.XXX.XXX-X
- Exemplo: 28.040.538-3

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 2           | 8           | 0          | 4           | 0          | 5           | 3          | 8           | -     |
| --------- | ----------- | ----------- | ---------- | ----------- | ---------- | ----------- | ---------- | ----------- | ----- |
| Pesos     | 9           | 8           | 7          | 6           | 5          | 4           | 3          | 2           | ----  |
| Cálculo   | 2 \* 9 = 18 | 8 \* 8 = 64 | 0 \* 7 = 0 | 4 \* 6 = 24 | 0 \* 5 = 0 | 5 \* 4 = 20 | 3 \* 3 = 9 | 8 \* 2 = 16 | = 151 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (151) por 11. A divisão de 151 por 11 resulta em resto 8. Então, 11 - 8 = 3. O dígito verificador (9ª posição) é 3.

Consequentemente, a inscrição estadual do Mato Grosso do Sul fica como 28.040.538-3.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Minas Gerais

- Tamanho: 13 dígitos
- Método: Módulo 10 e Módulo 11
- Pesos
  - 1º dígito: 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 calculados da esquerda para a direita
  - 2º dígito: 3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 calculados da esquerda para a direita
- Formato: 11 dígitos + 2 dígitos verificadores (MMM.UUU.UUU/CCDD)
  - M: Código do município
  - U: 8 dígitos utilizados para o cálculo do primeiro dígito verificador (junta-se ao código do município e a ordem do estabelecimento)
  - C: Código de ordem do estabelecimento
  - D: Dígito verificador
- Máscara: XXX.XXX.XXX/CCC-DD
- Exemplo: 062.307.904/0081

**Validação**

1. Cálculo do primeiro dígito verificador (12ª posição):

Antes de calcular o primeiro dígito verificador, é necessário que o número base utilizado para a conta possua 12 dígitos, porém ao removermos os dígitos verificadores, o número base fica com 11 dígitos. Para que o número base possua 12 dígitos, é necessário que seja adicionado um zero à esquerda do número base (representado por U na fórmula acima). Então para nosso exemplo temos:

062 -> Código do município
0 -> Zero adicionado à esquerda do número base
030790400 -> Número base

| Inscrição | 0          | 6           | 2          | 0          | 3          | 0          | 7          | 9           | 0          | 4          | 0          | 0          | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 1          | 2           | 1          | 2          | 1          | 2          | 1          | 2           | 1          | 2          | 1          | 2          | ---  |
| Cálculo   | 0 \* 1 = 0 | 6 \* 2 = 12 | 2 \* 1 = 2 | 0 \* 2 = 0 | 3 \* 1 = 3 | 0 \* 2 = 0 | 7 \* 1 = 7 | 9 \* 2 = 18 | 0 \* 1 = 0 | 4 \* 2 = 8 | 0 \* 1 = 0 | 0 \* 2 = 0 | = 32 |

O dígito verificador é o resultado de 10 menos o resto da divisão do resultado obtido acima (32) por 10. A divisão de 32 por 10 resulta em resto 2. Então, 10 - 2 = 8. O dígito verificador (12ª posição) é 8.

2. Cálculo do segundo dígito verificador (13ª posição):

Para o cálculo do segundo algoritmo não precisa-se mais do 0 adicionado à esquerda do número base, então o número base fica com 11 dígitos. Ao invés disso apenas acrescenta-se o primeiro dígito verificador ao número base. Então para nosso exemplo temos:

| Inscrição | 0          | 6           | 2            | 3            | 0          | 7           | 9           | 0          | 4           | 0          | 0          | 8           | -     |
| --------- | ---------- | ----------- | ------------ | ------------ | ---------- | ----------- | ----------- | ---------- | ----------- | ---------- | ---------- | ----------- | ----- |
| Pesos     | 3          | 2           | 11           | 10           | 9          | 8           | 7           | 6          | 5           | 4          | 3          | 2           | ---   |
| Cálculo   | 0 \* 3 = 0 | 6 \* 2 = 12 | 2 \* 11 = 22 | 3 \* 10 = 30 | 0 \* 9 = 0 | 7 \* 8 = 56 | 9 \* 7 = 63 | 0 \* 6 = 0 | 4 \* 5 = 20 | 0 \* 4 = 0 | 0 \* 3 = 0 | 8 \* 2 = 16 | = 219 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (219) por 11. A divisão de 219 por 11 resulta em resto 10. Então, 11 - 10 = 1. O dígito verificador (13ª posição) é 1.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

Consequentemente, a inscrição estadual de Minas Gerais fica como 062.307.904/0081.

### Pará

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (15.XXX.XXX-D)
  - 15: Código do estado, constante
  - X: 6 dígitos utilizados para o cálculo do dígito verificador (junta-se ao código do estado)
  - D: Dígito verificador
- Máscara: XX-XXXXXX-X
- Exemplo: 15-999999-5

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 1          | 5           | 9           | 9           | 9           | 9           | 9           | 9           | -     |
| --------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----- |
| Pesos     | 9          | 8           | 7           | 6           | 5           | 4           | 3           | 2           | ----  |
| Cálculo   | 1 \* 9 = 9 | 5 \* 8 = 40 | 9 \* 7 = 63 | 9 \* 6 = 54 | 9 \* 5 = 45 | 9 \* 4 = 36 | 9 \* 3 = 27 | 9 \* 2 = 18 | = 292 |

O dígito verificador é o resultado da subtração do resto da divisão do resultado obtido acima (292) por 11 de 1. A divisão de 292 por 11 resulta em 26 com resto 6. Então, 11 - 6 = 5. O dígito verificador (9ª posição) é 5.

Consequentemente, a inscrição estadual do Pará fica como 15-999999-5.

### Paraíba

- Tamanho: 9 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 9, 8, 7, 6, 5, 4, 3, 2 calculados da esquerda para a direita
- Formato: 8 dígitos + 1 dígito verificador (XXXXXXXX-D)
  - X: 8 dígitos utilizados para o cálculo do dígito verificador
  - D: Dígito verificador
- Máscara: XXXXXXXX-X
- Exemplo: 06000001-5

**Validação**

1. Cálculo do dígito verificador (9ª posição):

| Inscrição | 0          | 6           | 0          | 0          | 0          | 0          | 0          | 1          | -    |
| --------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---- |
| Pesos     | 9          | 8           | 7          | 6          | 5          | 4          | 3          | 2          | ---- |
| Cálculo   | 0 \* 9 = 0 | 6 \* 8 = 48 | 0 \* 7 = 0 | 0 \* 6 = 0 | 0 \* 5 = 0 | 0 \* 4 = 0 | 0 \* 3 = 0 | 1 \* 2 = 2 | = 50 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (50) por 11. A divisão de 50 por 11 resulta em resto 6. Então, 11 - 6 = 5. O dígito verificador (9ª posição) é 5.

Consequentemente, a inscrição estadual da Paraíba fica como 06000001-5.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.

### Paraná

- Tamanho: 10 dígitos
- Método: Módulo 11
- Pesos
  - 1º dígito: 3, 2, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
  - 2º dígito: 4, 3, 2, 7, 6, 5, 4, 3, 2, calculados da esquerda para a direita
- Formato: 8 dígitos + 2 dígitos verificadores (XXXXXXXX-DD)
  - X: 8 dígitos utilizados para o cálculo do primeiro dígito verificador
  - D: Primeiro dígito verificador
  - D: Segundo dígito verificador
- Máscara: XXXXXXXX-DD
- Exemplo: 12345678-50

**Validação**

1. Cálculo do primeiro dígito verificador (9ª posição):

| Inscrição | 1          | 2          | 3           | 4           | 5           | 6           | 7           | 8           | -     |
| --------- | ---------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----- |
| Pesos     | 3          | 2          | 7           | 6           | 5           | 4           | 3           | 2           | ----  |
| Cálculo   | 1 \* 3 = 3 | 2 \* 2 = 4 | 3 \* 7 = 21 | 4 \* 6 = 24 | 5 \* 5 = 25 | 6 \* 4 = 24 | 7 \* 3 = 21 | 8 \* 2 = 16 | = 138 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (138) por 11. A divisão de 138 por 11 resulta em resto 6. Então, 11 - 6 = 5. O dígito verificador (9ª posição) é 5.

2. Cálculo do segundo dígito verificador (10ª posição):

Acrescenta-se o primeiro dígito verificador ao final do número base e calcula-se o segundo dígito verificador.

| Inscrição | 1          | 2          | 3          | 4           | 5           | 6           | 7           | 8           | 5           | -     |
| --------- | ---------- | ---------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----- |
| Pesos     | 4          | 3          | 2          | 7           | 6           | 5           | 4           | 3           | 2           | ----  |
| Cálculo   | 1 \* 4 = 4 | 2 \* 3 = 6 | 3 \* 2 = 6 | 4 \* 7 = 28 | 5 \* 6 = 30 | 6 \* 5 = 30 | 7 \* 4 = 28 | 8 \* 3 = 24 | 5 \* 2 = 10 | = 166 |

O dígito verificador é o resultado de 11 menos o resto da divisão do resultado obtido acima (166) por 11. A divisão de 166 por 11 resulta em resto 0. Então, 11 - 0 = 11. O dígito verificador (10ª posição) é 0.

Consequentemente, a inscrição estadual do Paraná fica como 12345678-50.

OBS: Quando o dígito tiver valor 10 ou 11, utilizamos o valor "0" no lugar.
