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
});
