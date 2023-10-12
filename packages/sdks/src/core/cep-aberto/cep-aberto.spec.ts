import { CepAbertoAPI } from "./cep-aberto";

describe("CepAbertoAPI", () => {
	const token = "test-token";
	let cepAbertoAPI: CepAbertoAPI;

	beforeEach(() => {
		cepAbertoAPI = new CepAbertoAPI(token);
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
					cidade: {
						nome: "São Paulo",
						ddd: 11,
						ibge: "3550308",
					},
					estado: {
						sigla: "SP",
					},
					altitude: 760,
					latitude: "-23.5505206",
					longitude: "-46.6333094",
				};
				global.fetch = mockFetch(expectedResponse);

				const response = await cepAbertoAPI.getCepByNumber(cep);

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(
					`https://www.cepaberto.com/api/v3/cep?cep=${cep}`,
					{
						headers: {
							Authorization: `Token token=${token}`,
						},
					}
				);
			});
		});

		describe("getCepByCoordinates", () => {
			it("should return address information for a given latitude and longitude", async () => {
				const lat = -23.5505206;
				const lng = -46.6333094;
				const expectedResponse = {
					cep: "01001-000",
					logradouro: "Praça da Sé",
					complemento: "lado ímpar",
					bairro: "Sé",
					cidade: {
						nome: "São Paulo",
						ddd: 11,
						ibge: "3550308",
					},
					estado: {
						sigla: "SP",
					},
					altitude: 760,
					latitude: "-23.5505206",
					longitude: "-46.6333094",
				};
				global.fetch = mockFetch(expectedResponse);

				const response = await cepAbertoAPI.getCepByCoordinates(lat, lng);

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(
					`https://www.cepaberto.com/api/v3/nearest?lat=${lat}&lng=${lng}`,
					{
						headers: {
							Authorization: `Token token=${token}`,
						},
					}
				);
			});
		});

		describe("getCepByAddress", () => {
			it("should return address information for a given state, city, street and neighborhood", async () => {
				const state = "SP";
				const city = "São Paulo";
				const street = "Praça da Sé";
				const neighborhood = "Sé";
				const expectedResponse = {
					cep: "01001-000",
					logradouro: "Praça da Sé",
					complemento: "lado ímpar",
					bairro: "Sé",
					cidade: {
						nome: "São Paulo",
						ddd: 11,
						ibge: "3550308",
					},
					estado: {
						sigla: "SP",
					},
					altitude: 760,
					latitude: "-23.5505206",
					longitude: "-46.6333094",
				};
				global.fetch = mockFetch(expectedResponse);

				const response = await cepAbertoAPI.getCepByAddress(
					state,
					city,
					street,
					neighborhood
				);
				const expectedCalledUrl = encodeURI(
					`https://www.cepaberto.com/api/v3/address?estado=${state}&cidade=${city}&logradouro=${street}&bairro=${neighborhood}`
				).replace(/%20/g, "+");

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(expectedCalledUrl, {
					headers: {
						Authorization: `Token token=${token}`,
					},
				});
			});

			it("should return address information for a given state and city", async () => {
				const state = "SP";
				const city = "São Paulo";
				const expectedResponse = [
					{
						nome: "São Paulo",
					},
					{
						nome: "São Bernardo do Campo",
					},
					{
						nome: "São Caetano do Sul",
					},
					{
						nome: "Santo André",
					},
					{
						nome: "Taboão da Serra",
					},
				];
				global.fetch = mockFetch(expectedResponse);

				const response = await cepAbertoAPI.getCepByAddress(state, city);
				const expectedCalledUrl = encodeURI(
					`https://www.cepaberto.com/api/v3/address?estado=${state}&cidade=${city}`
				).replace(/%20/g, "+");

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(expectedCalledUrl, {
					headers: {
						Authorization: `Token token=${token}`,
					},
				});
			});
		});

		describe("getCitiesByState", () => {
			it("should return a list of cities for a given state", async () => {
				const state = "SP";
				const expectedResponse = [
					{
						nome: "São Paulo",
					},
					{
						nome: "São Bernardo do Campo",
					},
					{
						nome: "São Caetano do Sul",
					},
					{
						nome: "Santo André",
					},
					{
						nome: "Taboão da Serra",
					},
				];
				global.fetch = mockFetch(expectedResponse);

				const response = await cepAbertoAPI.getCitiesByState(state);

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(
					`https://www.cepaberto.com/api/v3/cities?estado=${state}`,
					{
						headers: {
							Authorization: `Token token=${token}`,
						},
					}
				);
			});
		});

		describe("updateCeps", () => {
			it("should update a list of CEP numbers", async () => {
				const ceps = ["01001000", "01310000"];
				const expectedResponse = ["01001000", "01310000"];
				global.fetch = mockFetch(expectedResponse);

				const response = await cepAbertoAPI.updateCeps(ceps);

				expect(response).toEqual(expectedResponse);
				expect(fetch).toHaveBeenCalledWith(
					`https://www.cepaberto.com/api/v3/update`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Token token=${token}`,
						},
						body: JSON.stringify({ ceps }),
					}
				);
			});
		});
	});
});
