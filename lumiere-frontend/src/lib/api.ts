export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fnbtechnologies.onrender.com";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}
