import { Assert } from "./Assert";

describe("Assert.String class", () => {
	describe("isDefined method", () => {
		it("should return false for null and undefined values", () => {
			expect(Assert.String.isDefined(null)).toBe(false);
			expect(Assert.String.isDefined(undefined)).toBe(false);
		});

		it("should return true for other values", () => {
			expect(Assert.String.isDefined("test")).toBe(true);
		});
	});

	describe("isNotEmpty method", () => {
		it("should return false for empty strings", () => {
			expect(Assert.String.isNotEmpty("")).toBe(false);
		});

		it("should return true for non-empty strings", () => {
			expect(Assert.String.isNotEmpty("test")).toBe(true);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.isNotEmpty(null as any)).toBe(false);
			expect(Assert.String.isNotEmpty(undefined as any)).toBe(false);
		});
	});

	describe("hasLengthOf method", () => {
		it("should return true if the string has the specified length", () => {
			expect(Assert.String.hasLengthOf("abcd", 4)).toBe(true);
		});

		it("should return false if the string does not have the specified length", () => {
			expect(Assert.String.hasLengthOf("abc", 4)).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.hasLengthOf(null as any, 4)).toBe(false);
			expect(Assert.String.hasLengthOf(undefined as any, 4)).toBe(false);
		});
	});

	describe("startsWith method", () => {
		it("should return true if the string starts with the specified value", () => {
			expect(Assert.String.startsWith("abcdef", "ab")).toBe(true);
		});

		it("should return false if the string does not start with the specified value", () => {
			expect(Assert.String.startsWith("abcdef", "cd")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.startsWith(null as any, "ab")).toBe(false);
			expect(Assert.String.startsWith(undefined as any, "ab")).toBe(false);
		});
	});

	describe("endsWith method", () => {
		it("should return true if the string ends with the specified value", () => {
			expect(Assert.String.endsWith("abcdef", "ef")).toBe(true);
		});

		it("should return false if the string does not end with the specified value", () => {
			expect(Assert.String.endsWith("abcdef", "cd")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.endsWith(null as any, "ef")).toBe(false);
			expect(Assert.String.endsWith(undefined as any, "ef")).toBe(false);
		});
	});

	describe("contains method", () => {
		it("should return true if the string contains the specified value", () => {
			expect(Assert.String.contains("abcdef", "cd")).toBe(true);
		});

		it("should return false if the string does not contain the specified value", () => {
			expect(Assert.String.contains("abcdef", "gh")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.contains(null as any, "cd")).toBe(false);
			expect(Assert.String.contains(undefined as any, "cd")).toBe(false);
		});
	});

	describe("containsOnlyNumbers method", () => {
		it("should return true for strings containing only numbers", () => {
			expect(Assert.String.containsOnlyNumbers("12345")).toBe(true);
		});

		it("should return false for strings containing non-numeric characters", () => {
			expect(Assert.String.containsOnlyNumbers("123a5")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.containsOnlyNumbers(null as any)).toBe(false);
			expect(Assert.String.containsOnlyNumbers(undefined as any)).toBe(false);
		});
	});

	describe("containsValueAt method", () => {
		it("should return true if the value at the specified index matches", () => {
			expect(Assert.String.containsValueAt("abcdef", 2, "c")).toBe(true);
		});

		it("should return false if the value at the specified index does not match", () => {
			expect(Assert.String.containsValueAt("abcdef", 2, "x")).toBe(false);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.containsValueAt(null as any, 2, "c")).toBe(false);
			expect(Assert.String.containsValueAt(undefined as any, 2, "c")).toBe(
				false
			);
		});
	});

	describe("containsValueAtRange method", () => {
		it("should return true if the value in the specified range matches", () => {
			expect(Assert.String.containsValueAtRange("abcdef", 1, 3, "bc")).toBe(
				true
			);
		});

		it("should return false if the value in the specified range does not match", () => {
			expect(Assert.String.containsValueAtRange("abcdef", 1, 3, "mn")).toBe(
				false
			);
		});

		it("should return false for null and undefined values", () => {
			expect(Assert.String.containsValueAtRange(null as any, 1, 3, "bc")).toBe(
				false
			);
			expect(
				Assert.String.containsValueAtRange(undefined as any, 1, 3, "bc")
			).toBe(false);
		});
	});
});
