import { request } from "@/helpers/request";
import { BRASIL_API_URL } from "../constants";
import {
  City,
  ClimaPrediction,
  CurrentCondicao,
  OndasPrediction,
} from "./CPTEC.types";

export class CPTEC {
  /**
   * PT-BR: Retorna listagem com todas as cidades junto a seus respectivos códigos presentes nos serviços da CPTEC.
   * EN-US: Returns a list with all cities and their respective codes available in the CPTEC services.
   *
   * @returns PT-BR: As informações das cidades listadas no CPTEC. EN-US: The information of the cities listed in CPTEC.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const cidadesData = await CPTEC.getCidades();
   *
   * console.log(cidadesData);
   * // [
   * //   {
   * //     "nome": "São Benedito",
   * //     "estado": "CE",
   * //     "id": 4750
   * //   }
   * // ]
   * ```
   */
  public async getCidades() {
    const response = await request<City[]>(
      `${BRASIL_API_URL}/cptec/v1/cidade`,
      {
        method: "GET",
      },
    );

    return response;
  }

  /**
   * PT-BR: Retorna listagem com todas as cidades correspondentes ao termo pesquisado junto a seus respectivos códigos presentes nos serviços da CPTEC.
   * EN-US: Returns a list with all cities corresponding to the searched term and their respective codes available in the CPTEC services.
   *
   * @param cityName PT-BR: O nome ou parte do nome da cidade a ser buscada. EN-US: The name or part of the name of the city to be searched.
   * @returns PT-BR: As informações das cidades correspondentes ao termo pesquisado. EN-US: The information of the cities corresponding to the searched term.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const cidadesData = await CPTEC.buscarCidades("São Benedito");
   *
   * console.log(cidadesData);
   * // [
   * //   {
   * //     "nome": "São Benedito",
   * //     "estado": "CE",
   * //     "id": 4750
   * //   }
   * // ]
   * ```
   */
  public async buscarCidades(cityName: string) {
    const response = await request<City[]>(
      `${BRASIL_API_URL}/cptec/v1/cidade/${cityName}`,
      {
        method: "GET",
      },
    );

    return response;
  }

  /**
   * PT-BR: Retorna condições meteorológicas atuais nas capitais do país, com base nas estações de solo de seu aeroporto.
   * EN-US: Returns current weather conditions in the country's capitals, based on their airport's ground stations.
   *
   * @returns PT-BR: As condições meteorológicas atuais nas capitais do país. EN-US: The current weather conditions in the country's capitals.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const climaData = await CPTEC.getClimaCapitais();
   *
   * console.log(climaData);
   * // [
   * //   {
   * //     "codigo_icao": "SBAR",
   * //     "atualizado_em": "2021-01-27T15:00:00.974Z",
   * //     "pressao_atmosferica": "1014",
   * //     "visibilidade": "9000",
   * //     "vento": 29,
   * //     "direcao_vento": 90,
   * //     "umidade": 74,
   * //     "condicao": "ps",
   * //     "condicao_Desc": "Predomínio de Sol",
   * //     "temp": 28
   * //   }
   * // ]
   * ```
   */
  public async getClimaCapitais() {
    // const response = await this.http.get<any>("clima/capital");
    const response = await request<CurrentCondicao[]>(
      `${BRASIL_API_URL}/cptec/v1/clima/capital`,
      { method: "GET" },
    );

    return response;
  }

  /**
   * PT-BR: Retorna condições meteorológicas atuais no aeroporto solicitado.
   * EN-US: Returns current weather conditions at the requested airport.
   *
   * @param icaoCode PT-BR: O código ICAO (4 dígitos) do aeroporto desejado. EN-US: The ICAO code (4 digits) of the desired airport.
   * @returns PT-BR: As condições meteorológicas atuais no aeroporto solicitado. EN-US: The current weather conditions at the requested airport.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const climaData = await CPTEC.getClimaAeroporto("SBGR");
   *
   * console.log(climaData);
   * // {
   * //   "codigo_icao": "SBAR",
   * //   "atualizado_em": "2021-01-27T15:00:00.974Z",
   * //   "pressao_atmosferica": "1014",
   * //   "visibilidade": "9000",
   * //   "vento": 29,
   * //   "direcao_vento": 90,
   * //   "umidade": 74,
   * //   "condicao": "ps",
   * //   "condicao_Desc": "Predomínio de Sol",
   * //   "temp": 28
   * // }
   * ```
   */
  public async getClimaAeroporto(icaoCode: string) {
    const response = await request<CurrentCondicao>(
      `${BRASIL_API_URL}/cptec/v1/clima/aeroporto/${icaoCode}`,
      { method: "GET" },
    );

    return response;
  }

  /**
   * PT-BR: Retorna previsão meteorológica para 1 dia na cidade informada.
   * EN-US: Returns weather forecast for 1 day in the informed city.
   *
   * @param cityCode PT-BR: O código da cidade fornecido pelo endpoint /cidade. EN-US: The city code provided by the /cidade endpoint.
   * @returns PT-BR: A previsão meteorológica para 1 dia na cidade informada. EN-US: The weather forecast for 1 day in the informed city.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const previsaoData = await CPTEC.getPrevisaoMeteorologica(999);
   *
   * console.log(previsaoData);
   * // {
   * //   "cidade": "Brejo Alegre",
   * //   "estado": "SP",
   * //   "atualizado_em": "2020-12-27",
   * //   "clima": [
   * //     {
   * //       "data": "2020-12-27",
   * //       "condicao": "pc",
   * //       "min": 20,
   * //       "max": 30,
   * //       "indice_uv": 13,
   * //       "condicao_desc": "Pancadas de Chuva"
   * //     }
   * //   ]
   * // }
   * ```
   */
  public async getPrevisaoMeteorologica(cityCode: number) {
    const response = await request<ClimaPrediction>(
      `${BRASIL_API_URL}/cptec/v1/clima/previsao/${cityCode}`,
      { method: "GET" },
    );

    return response;
  }

  /**
   * PT-BR: Retorna previsão meteorológica para até 6 dias na cidade informada.
   * EN-US: Returns weather forecast for up to 6 days in the informed city.
   *
   * @param cityCode PT-BR: O código da cidade fornecido pelo endpoint /cidade. EN-US: The city code provided by the /cidade endpoint.
   * @param days PT-BR: A quantidade de dias desejado para a previsão. EN-US: The desired number of days for the forecast.
   * @returns PT-BR: A previsão meteorológica para até 6 dias na cidade informada. EN-US: The weather forecast for up to 6 days in the informed city.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const previsaoData = await CPTEC.getPrevisaoMeteorologicaAte6Dias(999, 5);
   *
   * console.log(previsaoData);
   * // {
   * //   "cidade": "Brejo Alegre",
   * //   "estado": "SP",
   * //   "atualizado_em": "2020-12-27",
   * //   "clima": [
   * //     {
   * //       "data": "2020-12-27",
   * //       "condicao": "pc",
   * //       "min": 20,
   * //       "max": 30,
   * //       "indice_uv": 13,
   * //       "condicao_desc": "Pancadas de Chuva"
   * //     }
   * //   ]
   * // }
   * ```
   */
  public async getPrevisaoMeteorologicaAte6Dias(
    cityCode: number,
    days: number,
  ) {
    const response = await request<ClimaPrediction>(
      `${BRASIL_API_URL}/cptec/v1/clima/previsao/${cityCode}/${days}`,
      { method: "GET" },
    );

    return response;
  }

  /**
   * PT-BR: Retorna previsão oceânica para 1 dia na cidade informada.
   * EN-US: Returns oceanic forecast for 1 day in the informed city.
   *
   * @param cityCode PT-BR: O código da cidade fornecido pelo endpoint /cidade. EN-US: The city code provided by the /cidade endpoint.
   * @returns PT-BR: A previsão oceânica para 1 dia na cidade informada. EN-US: The oceanic forecast for 1 day in the informed city.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const ondasData = await CPTEC.getPrevisaoOceanica(241);
   *
   * console.log(ondasData);
   * // {
   * //   "cidade": "Rio de Janeiro",
   * //   "estado": "RJ",
   * //   "atualizado_em": "2020-12-27",
   * //   "ondas": [
   * //     {
   * //       "data": "27-12-2020",
   * //       "dados_ondas": [
   * //         {
   * //           "vento": 5.2,
   * //           "direcao_vento": "E",
   * //           "direcao_vento_desc": "Leste",
   * //           "altura_onda": 0.8,
   * //           "direcao_onda": "ESE",
   * //           "direcao_onda_desc": "Lés-sudeste",
   * //           "agitacao": "Fraco",
   * //           "hora": "00h Z"
   * //         }
   * //       ]
   * //     }
   * //   ]
   * // }
   * ```
   */
  public async getPrevisaoOceanica(cityCode: number) {
    const response = await request<OndasPrediction>(
      `${BRASIL_API_URL}/cptec/v1/ondas/${cityCode}`,
      { method: "GET" },
    );

    return response;
  }

  /**
   * PT-BR: Retorna previsão oceânica para até 6 dias na cidade informada.
   * EN-US: Returns oceanic forecast for up to 6 days in the informed city.
   *
   * @param cityCode PT-BR: O código da cidade fornecido pelo endpoint /cidade. EN-US: The city code provided by the /cidade endpoint.
   * @param days PT-BR: A quantidade de dias desejada para a previsão. EN-US: The desired number of days for the forecast.
   * @returns PT-BR: A previsão oceânica para até 6 dias na cidade informada. EN-US: The oceanic forecast for up to 6 days in the informed city.
   *
   * @example
   * ```typescript
   * const CPTEC = new BrasilApi.CPTEC();
   *
   * const ondasData = await CPTEC.getPrevisaoOceanicaAte6Dias(241, 2);
   *
   * console.log(ondasData);
   * // {
   * //   "cidade": "Rio de Janeiro",
   * //   "estado": "RJ",
   * //   "atualizado_em": "2020-12-27",
   * //   "ondas": [
   * //     {
   * //       "data": "27-12-2020",
   * //       "dados_ondas": [
   * //         {
   * //           "vento": 5.2,
   * //           "direcao_vento": "E",
   * //           "direcao_vento_desc": "Leste",
   * //           "altura_onda": 0.8,
   * //           "direcao_onda": "ESE",
   * //           "direcao_onda_desc": "Lés-sudeste",
   * //           "agitacao": "Fraco",
   * //           "hora": "00h Z"
   * //         }
   * //       ]
   * //     }
   * //   ]
   * // }
   * ```
   */
  public async getPrevisaoOceanicaAte6Dias(cityCode: number, days: number) {
    // const response = await this.http.get<any>(`ondas/${cityCode}/${days}`);
    const response = await request<OndasPrediction>(
      `${BRASIL_API_URL}/cptec/v1/ondas/${cityCode}/${days}`,
      { method: "GET" },
    );

    return response;
  }
}
