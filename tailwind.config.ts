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
				primaryForeground: "var(--primary-foreground)",
				secondary: "var(--secondary)",
				secondaryForeground: "var(--secondary-foreground)",
				muted: "var(--muted)",
				mutedForeground: "var(--muted-foreground)",
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)"
			}
		}
	},
	plugins: []
};
export default config;
