const trimSlash = (value) => String(value || "").trim().replace(/\/+$/, "");

const envApi = trimSlash(import.meta.env.VITE_API_URL);
export const API_BASE_URL = envApi || "http://localhost:5000";
export const API = API_BASE_URL;
