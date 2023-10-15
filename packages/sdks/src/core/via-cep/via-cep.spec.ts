import { ViaCepAPI } from "./via-cep";

describe("ViaCepAPI", () => {
	let viaCepAPI: ViaCepAPI;

	beforeEach(() => {
		viaCepAPI = new ViaCepAPI();
	});

	describe("fetch response", () => {
		const mockFetch = (response: any, status = 200) => {
			return jest.fn().mockImplementation(() =>
				Promise.resolve({
					ok: true,
					status,
					json: () => Promise.resolve(response),
				})
			);
		};

		beforeEach(() => {
			global.fetch = mockFetch({});
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});

		describe("getCepByNumber", () => {
			it("should return address information for a given CEP number", async () => {
				const cep = "01001000";
				const expectedResponse = {
					cep: "01001-000",
					logradouro: "Praça da Sé",
					complemento: "lado ímpar",
					bairro: "Sé",
					localidade: "São Paulo",
					uf: "SP",
					ibge: "3550308",
					gia: "1004",
					ddd: "11",
					siafi: "7107"
				};
				global.fetch = mockFetch(expectedResponse);

				const response = await viaCepAPI.getCepByNumber(cep);

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(
					`https://viacep.com.br/ws/${cep}/json/`
				);
			});
		});
	});
});
