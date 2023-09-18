export const Estados = [
	{ name: "Acre", shortname: "AC", slug: "acre" },
	{ name: "Alagoas", shortname: "AL", slug: "alagoas" },
	{ name: "Amapá", shortname: "AP", slug: "amapa" },
	{ name: "Amazonas", shortname: "AM", slug: "amazonas" },
	{ name: "Bahia", shortname: "BA", slug: "bahia" },
	{ name: "Ceará", shortname: "CE", slug: "ceara" },
	{ name: "Distrito Federal", shortname: "DF", slug: "distrito-federal" },
	{ name: "Espírito Santo", shortname: "ES", slug: "espirito-santo" },
	{ name: "Goiás", shortname: "GO", slug: "goias" },
	{ name: "Maranhão", shortname: "MA", slug: "maranhao" },
	{ name: "Mato Grosso", shortname: "MT", slug: "mato-grosso" },
	{ name: "Mato Grosso do Sul", shortname: "MS", slug: "mato-grosso-do-sul" },
	{ name: "Minas Gerais", shortname: "MG", slug: "minas-gerais" },
	{ name: "Pará", shortname: "PA", slug: "para" },
	{ name: "Paraíba", shortname: "PB", slug: "paraiba" },
	{ name: "Paraná", shortname: "PR", slug: "parana" },
	{ name: "Pernambuco", shortname: "PE", slug: "pernambuco" },
	{ name: "Piauí", shortname: "PI", slug: "piaui" },
	{ name: "Rio de Janeiro", shortname: "RJ", slug: "rio-de-janeiro" },
	{ name: "Rio Grande do Norte", shortname: "RN", slug: "rio-grande-do-norte" },
	{ name: "Rio Grande do Sul", shortname: "RS", slug: "rio-grande-do-sul" },
	{ name: "Rondônia", shortname: "RO", slug: "rondonia" },
	{ name: "Roraima", shortname: "RR", slug: "roraima" },
	{ name: "Santa Catarina", shortname: "SC", slug: "santa-catarina" },
	{ name: "São Paulo", shortname: "SP", slug: "sao-paulo" },
	{ name: "Sergipe", shortname: "SE", slug: "sergipe" },
	{ name: "Tocantins", shortname: "TO", slug: "tocantins" },
	{ name: "Exterior", shortname: "ZZ", slug: "exterior" },
] as const;

export type Estado = (typeof Estados)[number];

export type EstadoNome = Estado["name"];

export type EstadoSigla = Estado["shortname"];

export type EstadoSlug = Estado["slug"];
