import { User } from "../types/user";

// export async function getAccessToken(user: User): Promise<string> {
//   const response = await fetch("/api/auth/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email: user.email, password: user.password }),
//   });
//
//   if (!response.ok) {
//     throw new Error("Failed to get access token");
//   }
//
//   const data = await response.json();
//
//   return data.access_token;
// }

export function setAccessToken(accessToken: string) {
  localStorage.setItem("access_token", accessToken);
}

export function getStoredAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function clearAccessToken() {
  localStorage.removeItem("access_token");
}
