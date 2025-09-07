// client/src/api_services/comments/CommentAPIService.ts
export type CommentDTO = {
  id: number;
  autor_id: number;
  autor: string;
  tekst: string;
  vreme: string;
};

const BASE =
  (import.meta as any).env?.VITE_API_BASE ?? "http://localhost:8080/api";
// Po želji u .env (u client/): VITE_API_BASE=http://192.168.1.6:8080/api

export const commentsApi = {
  async listByVest(vestId: number): Promise<CommentDTO[]> {
    const r = await fetch(`${BASE}/vesti/${vestId}/komentari`);
    if (!r.ok) throw new Error("Greška pri čitanju komentara");
    return r.json();
  },

  async create(vestId: number, tekst: string, token: string) {
    const r = await fetch(`${BASE}/komentari`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vestId, tekst }),
    });
    if (!r.ok) throw new Error("Greška pri dodavanju komentara");
    return r.json();
  },

  async update(id: number, tekst: string, token: string) {
    const r = await fetch(`${BASE}/komentari/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tekst }),
    });
    if (!r.ok) throw new Error("Greška pri izmeni komentara");
    return r.json();
  },

  async remove(id: number, token: string) {
    const r = await fetch(`${BASE}/komentari/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error("Greška pri brisanju komentara");
    return r.json();
  },
};
