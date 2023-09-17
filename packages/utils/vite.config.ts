import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "@brasil-interface/utils",
			fileName: (format) => `@brasil-interface/utils.${format}.js`,
		},
	},
	resolve: {
		alias: {
			"@/helpers": resolve(__dirname, "src/helpers"),
		},
	},
	plugins: [dts()],
});
