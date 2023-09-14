import { TituloEleitor } from "./TituloEleitor";

const VALID_TITULOS = [
	"102385010671",
	"486027280175",
	"413288280159",
	"828054781490",
	"626674242070",
	"335265330523",
	"563846461910",
];

const VALID_TITULOS_UF = {
	AC: "846478272470",
	AL: "762053751759",
	AP: "555771232577",
	AM: "164842552216",
	BA: "643047780566",
	CE: "667745740728",
	DF: "235023542003",
	ES: "054662371406",
	GO: "737877331023",
	MA: "787734571180",
	MG: "411382250205",
	MS: "863372851961",
	MT: "148418401864",
	PA: "524651401309",
	PB: "660528201279",
	PE: "461188530884",
	PI: "467680851503",
	PR: "854154320698",
	RJ: "227267070396",
	RN: "058748721651",
	RS: "670835800434",
	RO: "630086312313",
	RR: "842103612690",
	SC: "717787730973",
	SE: "413504532100",
	SP: "571130280132",
	TO: "541860372720",
};

const INVALID_TITULOS = [
	"000000000000",
	"111111111111",
	"222222222222",
	"123456789012",
	"987654321098",
];

const MASKED_TITULO_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{3}$/;

describe("TituloEleitor", () => {
	describe("isValid", () => {
		describe("should return true for valid Titulos", () => {
			VALID_TITULOS.forEach((titulo) => {
				it(`should return true for valid Titulo ${titulo}`, () => {
					expect(TituloEleitor.isValid(titulo)).toBe(true);
				});
			});
		});

		it("should return false for invalid Titulos", () => {
			INVALID_TITULOS.forEach((invalidTitulo) => {
				expect(TituloEleitor.isValid(invalidTitulo)).toBe(false);
			});
		});
	});

	describe("generate", () => {
		it("should generate a valid Titulo", () => {
			const generatedTitulo = TituloEleitor.generate();
			expect(TituloEleitor.isValid(generatedTitulo)).toBe(true);
		});
	});

	describe("getEstado", () => {
		Object.entries(VALID_TITULOS_UF).forEach(([uf, titulo]) => {
			it(`should return ${uf} for Titulo ${titulo}`, () => {
				expect(TituloEleitor.getEstado(titulo)).toBe(uf);
			});
		});

		INVALID_TITULOS.forEach((invalidTitulo) => {
			it(`should return null for invalid Titulo ${invalidTitulo}`, () => {
				expect(TituloEleitor.getEstado(invalidTitulo)).toBeNull();
			});
		});
	});
});
