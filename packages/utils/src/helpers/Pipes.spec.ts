import { Pipes, TransformWorker, ValidationWorker } from "./Pipes";

describe("Pipes", () => {
	describe("runTransforms", () => {
		it("should apply all transforms to the value in order", () => {
			const transforms: TransformWorker<string>[] = [
				(value: string) => value + "1",
				(value: string) => value + "2",
				(value: string) => value + "3",
			];

			const result = Pipes.runTransforms("0", transforms);
			expect(result).toBe("0123");
		});

		it("should return the original value if no transforms provided", () => {
			const result = Pipes.runTransforms("test", []);
			expect(result).toBe("test");
		});
	});

	describe("runValidations", () => {
		it("should return true if all validations pass", () => {
			const validations: ValidationWorker[] = [
				(value) => value.startsWith("test"),
				(value) => value.endsWith("ing"),
				(value) => value.includes("sting"),
			];

			const result = Pipes.runValidations("testing", validations);
			expect(result).toBeTruthy();
		});

		it("should return false if any validation fails", () => {
			const validations: ValidationWorker[] = [
				(value) => value.startsWith("test"),
				(value) => value.endsWith("ing"),
				(value) => value.includes("buzz"),
			];

			const result = Pipes.runValidations("testing", validations);
			expect(result).toBeFalsy();
		});

		it("should return true if no validations provided", () => {
			const result = Pipes.runValidations("anything", []);
			expect(result).toBeTruthy();
		});
	});
});
