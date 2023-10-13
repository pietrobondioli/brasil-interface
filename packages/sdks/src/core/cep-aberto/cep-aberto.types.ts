import { EstadoSigla } from "@brasil-interface/utils";

export type ICepAbertoAddress = {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	cidade: {
		nome: string;
		ddd: number;
		ibge: string;
	};
	estado: {
		sigla: EstadoSigla;
	};
	altitude: number;
	latitude: string;
	longitude: string;
};

export type ICepAbertoCity = {
	nome: string;
};

export type IGetCepByAddressParams = {
	estado: string;
	cidade: string;
	logradouro?: string;
	bairro?: string;
};
