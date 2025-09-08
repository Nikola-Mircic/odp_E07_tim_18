import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi, type UserProfileDto } from "../api_services/users/UserAPIService";
import { useAuth } from "../providers/AuthProvider";

export default function ProfileEditPage() {
  const nav = useNavigate();
  const { user } = useAuth(); // imamo id i ulogu iz tokena
  const [me, setMe] = useState<UserProfileDto | null>(null);
  const [form, setForm] = useState({ ime: "", prezime: "", mejl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      try {
        const res = await userApi.getMe();
        setMe(res.data);
        setForm({
          ime: res.data.ime ?? "",
          prezime: res.data.prezime ?? "",
          mejl: (res.data.mejl ?? res.data.email) ?? "",
        });
      } catch (e: any) {
        setErr(e?.response?.data?.message ?? "Greška pri učitavanju profila.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ime: form.ime.trim(),
      prezime: form.prezime.trim(),
      mejl: form.mejl.trim(),
    };
    if (!payload.ime || !payload.prezime || !payload.mejl) return;

    setSaving(true);
    setErr(null);
    try {
      // 1) prefer PUT /users/me
      await userApi.updateMe(payload);
      nav("/profile", { replace: true });
      return;
    } catch (e: any) {
      const status = e?.response?.status;
      // 404/405/501 → verovatno backend koristi /users/:id
      if ((status === 404 || status === 405 || status === 501) && user?.id) {
        try {
          await userApi.updateById(user.id, payload);
          nav("/profile", { replace: true });
          return;
        } catch (ee: any) {
          setErr(ee?.response?.data?.message ?? "Greška pri čuvanju (PUT /users/:id).");
        }
      } else {
        setErr(e?.response?.data?.message ?? "Greška pri čuvanju (PUT /users/me).");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Učitavanje…</div>;
  if (!me) return <div className="p-4">Nema podataka.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Izmena profila</h1>
      {err ? <div className="text-red-600 mb-3">{err}</div> : null}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600">Ime</label>
          <input
            name="ime"
            value={form.ime}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Prezime</label>
          <input
            name="prezime"
            value={form.prezime}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Mejl</label>
          <input
            name="mejl"
            type="email"
            value={form.mejl}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="pt-2 flex gap-2">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={saving || !form.ime.trim() || !form.prezime.trim() || !form.mejl.trim()}
          >
            {saving ? "Čuvam…" : "Sačuvaj"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={() => nav("/profile")}
          >
            Otkaži
          </button>
        </div>
      </form>
    </div>
  );
}
