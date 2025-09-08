// client/src/api_services/users/UserAPIService.ts
import axios, {
  type RawAxiosRequestHeaders,
  type AxiosResponse,
  isAxiosError,
} from "axios";
import { PročitajVrednostPoKljuču } from "../../helpers/session_storage";

export type UserProfileDto = {
  id: number;
  uloga: string;
  ime: string;
  prezime: string;
  mejl?: string;   // DB kolona "mejl"
  email?: string;  // alternativno ime, ako backend vraća "email"
};

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL !== undefined
    ? (import.meta as any).env.VITE_API_BASE_URL
    : "";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

function authHeaders(isJson = true): RawAxiosRequestHeaders {
  const h: RawAxiosRequestHeaders = {};
  if (isJson) h["Content-Type"] = "application/json";
  const token = PročitajVrednostPoKljuču("authToken");
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

// --- Helperi (interno) ---
const ME_ROUTES = ["/users/me", "/auth/me", "/user/me"];

async function tryGetMeResp(): Promise<AxiosResponse<UserProfileDto>> {
  let lastErr: unknown = null;
  for (const r of ME_ROUTES) {
    try {
      const res = await api.get<UserProfileDto>(r, { headers: authHeaders(false) });
      return res;
    } catch (e) {
      lastErr = e;
      // probaj sledeću rutu
    }
  }
  throw lastErr;
}

// --- Public API (isti potpis kao ranije) ---
export const userApi = {
  // GET profil ulogovanog korisnika (sa fallback rutama)
  getMe(): Promise<AxiosResponse<UserProfileDto>> {
    return tryGetMeResp();
  },

  // PUT /users/me; fallback na PUT /users/:id ako /users/me ne postoji ili ne prima PUT
  async updateMe(payload: { ime: string; prezime: string; mejl: string }): Promise<AxiosResponse<UserProfileDto>> {
    const body = {
      ime: payload.ime,
      prezime: payload.prezime,
      mejl: payload.mejl,
      email: payload.mejl, // šaljemo oba naziva za kompatibilnost
    };

    try {
      const res = await api.put<UserProfileDto>("/users/me", body, {
        headers: authHeaders(true),
      });
      return res;
    } catch (e) {
      // Ako ruta ne postoji ili metod nije dopušten → fallback na /users/:id
      const status = isAxiosError(e) ? e.response?.status : undefined;
      if (status === 404 || status === 405 || status === 501) {
        // prvo saznaj ID kroz fallback GET
        const meResp = await tryGetMeResp();
        const userId = meResp.data.id;
        const res2 = await api.put<UserProfileDto>(`/users/${userId}`, body, {
          headers: authHeaders(true),
        });
        return res2;
      }
      throw e;
    }
  },

  // Direktno PUT /users/:id (ostavljamo kao i ranije)
  updateById(id: number, payload: { ime: string; prezime: string; mejl: string }): Promise<AxiosResponse<UserProfileDto>> {
    const body = {
      ime: payload.ime,
      prezime: payload.prezime,
      mejl: payload.mejl,
      email: payload.mejl,
    };
    return api.put<UserProfileDto>(`/users/${id}`, body, {
      headers: authHeaders(true),
    });
    },
};
