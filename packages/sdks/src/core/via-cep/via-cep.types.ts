import { EstadoSigla } from "@brasil-interface/utils";

export type ViaCepAddress = {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: EstadoSigla;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}