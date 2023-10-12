import mockAxios from "jest-mock-axios";
import { CepAbertoAPI } from "./cep-aberto";

afterEach(() => {
	mockAxios.reset();
});

describe("CepAbertoAPI", () => {
	const token = "test-token";
	let cepAbertoAPI: CepAbertoAPI;

	beforeEach(() => {
		cepAbertoAPI = new CepAbertoAPI(token);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("axios instance creation", () => {
		it("should create an axios instance with the correct base URL and headers", () => {
			expect(mockAxios.create).toHaveBeenCalledWith({
				baseURL: "https://www.cepaberto.com/api/v3",
				headers: {
					Authorization: `Token token=${token}`,
				},
			});
		});
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
			mockAxios.get.mockResolvedValueOnce({
				data: expectedResponse,
			});

			const response = await cepAbertoAPI.getCepByNumber(cep);

			expect(response).toEqual(expectedResponse);
			expect(mockAxios.get).toHaveBeenCalledWith(`/cep?cep=${cep}`);
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
			mockAxios.get.mockResolvedValueOnce({
				data: expectedResponse,
			});

			const response = await cepAbertoAPI.getCepByCoordinates(lat, lng);

			expect(response).toEqual(expectedResponse);
			expect(mockAxios.get).toHaveBeenCalledWith(
				`/nearest?lat=${lat}&lng=${lng}`
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
			mockAxios.get.mockResolvedValueOnce({
				data: expectedResponse,
			});

			const response = await cepAbertoAPI.getCepByAddress(
				state,
				city,
				street,
				neighborhood
			);

			expect(response).toEqual(expectedResponse);
			expect(mockAxios.get).toHaveBeenCalledWith(`/address`, {
				params: {
					estado: state,
					cidade: city,
					logradouro: street,
					bairro: neighborhood,
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
			mockAxios.get.mockResolvedValueOnce({
				data: expectedResponse,
			});

			const response = await cepAbertoAPI.getCepByAddress(state, city);

			expect(response).toEqual(expectedResponse);
			expect(mockAxios.get).toHaveBeenCalledWith(`/address`, {
				params: {
					estado: state,
					cidade: city,
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
			mockAxios.get.mockResolvedValueOnce({
				data: expectedResponse,
			});

			const response = await cepAbertoAPI.getCitiesByState(state);

			expect(response).toEqual(expectedResponse);
			expect(mockAxios.get).toHaveBeenCalledWith(`/cities?estado=${state}`);
		});
	});

	describe("updateCeps", () => {
		it("should update a list of CEP numbers", async () => {
			const ceps = ["01001000", "01310000"];
			const expectedResponse = ["01001000", "01310000"];
			mockAxios.post.mockResolvedValueOnce({
				data: expectedResponse,
			});

			const response = await cepAbertoAPI.updateCeps(ceps);

			expect(response).toEqual(expectedResponse);
			expect(mockAxios.post).toHaveBeenCalledWith(`/update`, {
				ceps: ceps.join(","),
			});
		});
	});
});
