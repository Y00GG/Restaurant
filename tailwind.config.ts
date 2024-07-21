import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const colors = {
	background: "#ffffff",
	foreground: "#261e1a",
	focus: "#facc15",
	primary: {
		"50": "#fefce8",
		"100": "#fef9c3",
		"200": "#fef08a",
		"300": "#fde047",
		"400": "#facc15",
		"500": "#eab308",
		"600": "#ca8a04",
		"700": "#a16207",
		"800": "#854d0e",
		"900": "#713f12",
		"950": "#422006",
		DEFAULT: "#eab308",
	},
	secondary: {
		"50": "#eff6ff",
		"100": "#dbeafe",
		"200": "#bfdbfe",
		"300": "#93c5fd",
		"400": "#60a5fa",
		"500": "#3b82f6",
		"600": "#2563eb",
		"700": "#1d4ed8",
		"800": "#1e40af",
		"900": "#1e3a8a",
		"950": "#172554",
		DEFAULT: "#3b82f6",
	},
};

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors,
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			addCommonColors: true,
			themes: {
				light: {
					colors,
				},
			},
		}),
	],
};

export default config;
