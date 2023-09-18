import { CPF } from "./core/cpf/CPF";
export { CPF } from "./core/cpf/CPF";

import { CNPJ } from "./core/cnpj/CNPJ";
export { CNPJ } from "./core/cnpj/CNPJ";

import { PIS } from "./core/pis/PIS";
export { PIS } from "./core/pis/PIS";

import { RG } from "./core/rg/RG";
export { RG } from "./core/rg/RG";

import { TituloEleitor } from "./core/titulo-eleitor/TituloEleitor";
export { TituloEleitor } from "./core/titulo-eleitor/TituloEleitor";

import { CNH } from "./core/cnh/CNH";
export { CNH } from "./core/cnh/CNH";

export { Estados } from "./core/estados/Estados";

export type {
	Estado,
	EstadoNome,
	EstadoSigla,
	EstadoSlug,
} from "./core/estados/Estados";

export default {
	CPF,
	CNPJ,
	PIS,
	RG,
	TituloEleitor,
	CNH,
};
