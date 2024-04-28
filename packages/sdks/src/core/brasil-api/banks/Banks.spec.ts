// import { Banks } from "./Banks";
//
// jest.mock("@/helpers/fetch-json");
//
// describe("Banks", () => {
// 	let banks: Banks;
//
// 	beforeEach(() => {
// 		http = new FetchJson("https://brasilapi.com/api/banks/v1");
// 		banks = new Banks();
// 	});
//
// 	describe("getAllBanks", () => {
// 		it("should return all banks", async () => {
// 			const expected = [
// 				{
// 					ispb: "00000000",
// 					name: "BCO DO BRASIL S.A.",
// 					code: 1,
// 					fullName: "Banco do Brasil S.A.",
// 				},
// 				{
// 					ispb: "00000000",
// 					name: "BCO DO BRASIL S.A.",
// 					code: 1,
// 					fullName: "Banco do Brasil S.A.",
// 				},
// 			];
//
// 			jest.spyOn(http, "get").mockResolvedValueOnce({ data: expected });
//
// 			const result = await banks.getAllBanks();
//
// 			expect(result).toEqual(expected);
// 			expect(http.get).toHaveBeenCalledWith("");
// 		});
// 	});
//
// 	describe("getBankByCode", () => {
// 		it("should return a bank by code", async () => {
// 			const expected = {
// 				ispb: "00000000",
// 				name: "BCO DO BRASIL S.A.",
// 				code: 1,
// 				fullName: "Banco do Brasil S.A.",
// 			};
//
// 			jest.spyOn(http, "get").mockResolvedValueOnce({ data: expected });
//
// 			const result = await banks.getBankByCode(1);
//
// 			expect(result).toEqual(expected);
// 			expect(http.get).toHaveBeenCalledWith("/1");
// 		});
// 	});
// });
