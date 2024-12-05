import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	darkMode: ["class"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "var(--primary)",
				primaryForeground: "var(--primaryforeground)",
				secondary: "var(--secondary)",
				secondaryForeground: "var(--secondaryforeground)",
				muted: "var(--muted)",
				mutedForeground: "var(--mutedforeground)",
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)"
			}
		}
	},
	plugins: []
};
export default config;
