import axios, { type RawAxiosRequestHeaders } from "axios";
import { PročitajVrednostPoKljuču } from "../../helpers/session_storage";

export type CommentDto = {
  id: number;
  // oba seta polja su opcionalna da bi TS bio srećan bez obzira šta vrati backend
  username?: string; // modernije ime
  autor?: string;    // alternativno ime
  content?: string;  // modernije ime
  tekst?: string;    // alternativno ime
  createdAt?: string;

  vestId?: number;   // modernije ime
  vest_id?: number;  // alternativno ime
  autor_id?: number; // opcionalno ako backend vraća ID autora
};

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL !== undefined
    ? (import.meta as any).env.VITE_API_BASE_URL
    : "";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

function buildHeaders(isJson = true): RawAxiosRequestHeaders {
  const headers: RawAxiosRequestHeaders = {};
  if (isJson) headers["Content-Type"] = "application/json";
  const token = PročitajVrednostPoKljuču("authToken");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export const commentsApi = {
  // GET /comments?vestId=... ili ?vest_id=...
  getByVestId(vestId: number) {
    return api.get<CommentDto[]>("/comments", {
      params: { vestId, vest_id: vestId }, // pošalji oba – backend će uzeti jedan
      headers: buildHeaders(false),
    });
  },

  // POST /comments
  // UI šalje { vestId, username, content } — ovde mapiramo na oba naziva
  create(payload: { vestId: number; username: string; content: string }) {
    const body = {
      // oba naziva za svaki field (kompatibilnost sa backendom)
      vestId: payload.vestId,
      vest_id: payload.vestId,

      username: payload.username,
      autor: payload.username,

      content: payload.content,
      tekst: payload.content,
    };

    return api.post<CommentDto>("/comments", body, {
      headers: buildHeaders(true),
    });
  },

  // PUT /comments/:id
  // UI šalje { content } — mapiramo i na { tekst }
  update(id: number, payload: { content: string }) {
    const body = {
      content: payload.content,
      tekst: payload.content,
    };

    return api.put<CommentDto>(`/comments/${id}`, body, {
      headers: buildHeaders(true),
    });
  },

  // DELETE /comments/:id
  remove(id: number) {
    return api.delete<void>(`/comments/${id}`, {
      headers: buildHeaders(false),
    });
  },
};
