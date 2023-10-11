import { CPF } from "./core/cpf/CPF";
export { CNH } from "./core/cnh/CNH";
export { CNPJ } from "./core/cnpj/CNPJ";
export { CPF } from "./core/cpf/CPF";
export { InscricaoEstadual } from "./core/inscricao-estadual/InscricaoEstadual";
export { PIS } from "./core/pis/PIS";
export { RG } from "./core/rg/RG";
export { TituloEleitor } from "./core/titulo-eleitor/TituloEleitor";

import { CNPJ } from "./core/cnpj/CNPJ";

import { PIS } from "./core/pis/PIS";

import { RG } from "./core/rg/RG";

import { TituloEleitor } from "./core/titulo-eleitor/TituloEleitor";

import { CNH } from "./core/cnh/CNH";

import { InscricaoEstadual } from "./core/inscricao-estadual/InscricaoEstadual";

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
	InscricaoEstadual,
	CNH,
};
