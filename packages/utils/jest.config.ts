export default {
	displayName: "Brasil Interface - Utils",
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	testMatch: ["**/__tests__/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^@/helpers/(.*)$": "<rootDir>/src/helpers/$1",
	},
};
