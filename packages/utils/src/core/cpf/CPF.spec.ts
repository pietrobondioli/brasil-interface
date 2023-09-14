import { CPF } from "./CPF";

const VALID_CPF = "20993685030";
const VALID_CPF_MASKED = "209.936.850-30";
const VALID_CPF_MASKED_SENSITIVE = "209.936.***-**";
const INVALID_CPF = "122.111.111-11";
const CPF_REPEATED_DIGITS = "11111111111";
const CPF_INVALID_LENGTH = "2099368503";
const MASKED_CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const VALID_CPFS = [
	"04379547060",
	"95687211004",
	"06132865020",
	"00781733022",
	"11124230017",
];

const UF_MAP = {
	"0": ["RS"],
	"1": ["DF", "GO", "MT", "MS", "TO"],
	"2": ["AM", "PA", "RR", "AP", "AC", "RO"],
	"3": ["CE", "MA", "PI"],
	"4": ["PB", "PE", "AL", "RN"],
	"5": ["BA", "SE"],
	"6": ["MG"],
	"7": ["RJ", "ES"],
	"8": ["SP"],
	"9": ["PR", "SC"],
};

const VALID_CPFS_BY_UF = {
	AC: "14116711209",
	AL: "34931002480",
	AM: "48978125263",
	AP: "76044910229",
	BA: "23515988572",
	CE: "11685714307",
	DF: "27783414125",
	ES: "22643003705",
	GO: "23643295154",
	MA: "53586907354",
	MG: "83397192625",
	MS: "64423153122",
	MT: "39181838158",
	PA: "42683254415",
	PB: "79190639499",
	PE: "16687838431",
	PI: "93020289335",
	PR: "68105129930",
	RJ: "11869670728",
	RN: "45268949403",
	RS: "49165554060",
	RO: "44457830216",
	RR: "53077366223",
	SC: "22004798912",
	SE: "41470491508",
	SP: "28207550899",
	TO: "42311965166",
};

describe("CPF", () => {
	describe("isValid", () => {
		it("should return false for invalid CPFs", () => {
			expect(CPF.isValid(INVALID_CPF)).toBe(false);
		});

		it("should return true for valid CPFs", () => {
			expect(CPF.isValid(VALID_CPF)).toBe(true);
			expect(CPF.isValid(VALID_CPF_MASKED)).toBe(true);
		});

		VALID_CPFS.forEach((cpf) => {
			it(`should return true for valid CPF ${cpf}`, () => {
				expect(CPF.isValid(cpf)).toBe(true);
			});
		});

		it("should return false for blacklisted CPFs", () => {
			expect(CPF.isValid(CPF_REPEATED_DIGITS)).toBe(false);
		});

		it("should return false for CPFs with invalid length", () => {
			expect(CPF.isValid(CPF_INVALID_LENGTH)).toBe(false);
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask a CPF", () => {
			expect(CPF.mask(VALID_CPF)).toBe(VALID_CPF_MASKED);
		});

		it("should correctly unmask a CPF", () => {
			expect(CPF.unmask(VALID_CPF_MASKED)).toBe(VALID_CPF);
		});
	});

	describe("generate and generateMasked", () => {
		it("should generate a valid CPF", () => {
			const generatedCPF = CPF.generate();
			expect(CPF.isValid(generatedCPF)).toBe(true);
		});

		it("should generate a valid masked CPF", () => {
			const generatedCPF = CPF.generateMasked();
			expect(MASKED_CPF_REGEX.test(generatedCPF)).toBe(true);
			expect(CPF.isValid(CPF.unmask(generatedCPF))).toBe(true);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of a CPF", () => {
			expect(CPF.maskSensitive(VALID_CPF)).toBe(VALID_CPF_MASKED_SENSITIVE);
		});
	});

	describe("getEstado", () => {
		it("should correctly identify the state of a valid CPF", () => {
			expect(CPF.getEstado(VALID_CPF)).toEqual(["RS"]);
		});

		it("should return null for invalid CPFs", () => {
			expect(CPF.getEstado(INVALID_CPF)).toBeNull();
		});

		it("should return RS for CPF from RS", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.RS);
			expect(ufs).toEqual(UF_MAP["0"]);
		});

		it("should return AM PA RR AP AC RO for CPF from AC", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.AC);
			expect(ufs).toEqual(UF_MAP["2"]);
		});

		it("should return DF GO MT MS TO for CPF from DF", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.DF);
			expect(ufs).toEqual(UF_MAP["1"]);
		});

		it("should return CE MA PI for CPF from CE", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.CE);
			expect(ufs).toEqual(UF_MAP["3"]);
		});

		it("should return PB PE AL RN for CPF from PB", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.PB);
			expect(ufs).toEqual(UF_MAP["4"]);
		});

		it("should return BA SE for CPF from BA", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.BA);
			expect(ufs).toEqual(UF_MAP["5"]);
		});

		it("should return MG for CPF from MG", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.MG);
			expect(ufs).toEqual(UF_MAP["6"]);
		});

		it("should return RJ ES for CPF from RJ", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.RJ);
			expect(ufs).toEqual(UF_MAP["7"]);
		});

		it("should return SP for CPF from SP", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.SP);
			expect(ufs).toEqual(UF_MAP["8"]);
		});

		it("should return PR SC for CPF from PR", () => {
			const ufs = CPF.getEstado(VALID_CPFS_BY_UF.PR);
			expect(ufs).toEqual(UF_MAP["9"]);
		});

		it("should return null for CPF from invalid UF", () => {
			const ufs = CPF.getEstado("00000000000");
			expect(ufs).toBeNull();
		});
	});
});
