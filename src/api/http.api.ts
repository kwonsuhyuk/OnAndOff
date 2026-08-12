const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
const ACCESS_TOKEN_KEY = "onoff.accessToken";

type ApiErrorBody = { message?: string | string[] };

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export const tokenStorage = {
  get: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
};

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    const message = Array.isArray(body.message) ? body.message[0] : body.message;
    if (response.status === 401) tokenStorage.clear();
    throw new ApiError(message ?? "서버 요청에 실패했습니다.", response.status);
  }

  return response.json() as Promise<T>;
}
