import axios from "axios";

const api = axios.create({
	baseURL: "https://restaurante-api-santiago-buitrago-rojas-projects.vercel.app/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
