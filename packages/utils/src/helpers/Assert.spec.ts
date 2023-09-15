import { Assert } from "./Assert";

describe("Assert.String class", () => {
	describe("shouldBeDefined method", () => {
		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldBeDefined(null)).toBe(false);
			expect(Assert.String.shouldBeDefined(undefined)).toBe(false);
		});

		it("should return true for other values", () => {
			expect(Assert.String.shouldBeDefined("test")).toBe(true);
		});
	});

	describe("shouldNotBeEmpty method", () => {
		it("should return false for empty strings", () => {
			expect(Assert.String.shouldNotBeEmpty("")).toBe(false);
		});

		it("should return true for non-empty strings", () => {
			expect(Assert.String.shouldNotBeEmpty("test")).toBe(true);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldNotBeEmpty(null as any)).toBe(false);
			expect(Assert.String.shouldNotBeEmpty(undefined as any)).toBe(false);
		});
	});

	describe("shouldHaveLengthOf method", () => {
		it("should return true if the string has the specified length", () => {
			expect(Assert.String.shouldHaveLengthOf("abcd", 4)).toBe(true);
		});

		it("should return false if the string does not have the specified length", () => {
			expect(Assert.String.shouldHaveLengthOf("abc", 4)).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldHaveLengthOf(null as any, 4)).toBe(false);
			expect(Assert.String.shouldHaveLengthOf(undefined as any, 4)).toBe(false);
		});
	});

	describe("shouldStartWith method", () => {
		it("should return true if the string starts with the specified value", () => {
			expect(Assert.String.shouldStartWith("abcdef", "ab")).toBe(true);
		});

		it("should return false if the string does not start with the specified value", () => {
			expect(Assert.String.shouldStartWith("abcdef", "cd")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldStartWith(null as any, "ab")).toBe(false);
			expect(Assert.String.shouldStartWith(undefined as any, "ab")).toBe(false);
		});
	});

	describe("shouldEndWith method", () => {
		it("should return true if the string ends with the specified value", () => {
			expect(Assert.String.shouldEndWith("abcdef", "ef")).toBe(true);
		});

		it("should return false if the string does not end with the specified value", () => {
			expect(Assert.String.shouldEndWith("abcdef", "cd")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldEndWith(null as any, "ef")).toBe(false);
			expect(Assert.String.shouldEndWith(undefined as any, "ef")).toBe(false);
		});
	});

	describe("shouldContain method", () => {
		it("should return true if the string contains the specified value", () => {
			expect(Assert.String.shouldContain("abcdef", "cd")).toBe(true);
		});

		it("should return false if the string does not contain the specified value", () => {
			expect(Assert.String.shouldContain("abcdef", "gh")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldContain(null as any, "cd")).toBe(false);
			expect(Assert.String.shouldContain(undefined as any, "cd")).toBe(false);
		});
	});

	describe("shouldContainOnlyNumbers method", () => {
		it("should return true for strings containing only numbers", () => {
			expect(Assert.String.shouldContainOnlyNumbers("12345")).toBe(true);
		});

		it("should return false for strings containing non-numeric characters", () => {
			expect(Assert.String.shouldContainOnlyNumbers("123a5")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldContainOnlyNumbers(null as any)).toBe(false);
			expect(Assert.String.shouldContainOnlyNumbers(undefined as any)).toBe(
				false
			);
		});
	});

	describe("shouldContainValueAt method", () => {
		it("should return true if the value at the specified index matches", () => {
			expect(Assert.String.shouldContainValueAt("abcdef", 2, "c")).toBe(true);
		});

		it("should return false if the value at the specified index does not match", () => {
			expect(Assert.String.shouldContainValueAt("abcdef", 2, "x")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.shouldContainValueAt(null as any, 2, "c")).toBe(
				false
			);
			expect(Assert.String.shouldContainValueAt(undefined as any, 2, "c")).toBe(
				false
			);
		});
	});

	describe("shouldContainValueAtRange method", () => {
		it("should return true if the value in the specified range matches", () => {
			expect(
				Assert.String.shouldContainValueAtRange("abcdef", 1, 3, "bc")
			).toBe(true);
		});

		it("should return false if the value in the specified range does not match", () => {
			expect(
				Assert.String.shouldContainValueAtRange("abcdef", 1, 3, "mn")
			).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(
				Assert.String.shouldContainValueAtRange(null as any, 1, 3, "bc")
			).toBe(false);
			expect(
				Assert.String.shouldContainValueAtRange(undefined as any, 1, 3, "bc")
			).toBe(false);
		});
	});
});
