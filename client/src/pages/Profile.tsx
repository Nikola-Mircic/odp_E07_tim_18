import { useEffect, useState } from "react";
import { userApi, type UserProfileDto } from "../api_services/users/UserAPIService";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [me, setMe] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      try {
        const res = await userApi.getMe();
        setMe(res.data);
      } catch (e: any) {
        setErr(e?.response?.data?.message ?? "Greška pri učitavanju profila.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Učitavanje profila…</div>;
  if (err) return <div className="p-4 text-red-600">{err}</div>;
  if (!me) return <div className="p-4">Nema podataka.</div>;

  const email = me.mejl ?? me.email ?? "";

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Moj profil</h1>

      <div className="space-y-2">
        <div><span className="text-gray-500">Ime:</span> {me.ime}</div>
        <div><span className="text-gray-500">Prezime:</span> {me.prezime}</div>
        <div><span className="text-gray-500">Mejl:</span> {email}</div>
        <div><span className="text-gray-500">Uloga:</span> {me.uloga}</div>
      </div>

      <div className="mt-6">
        <Link
          to="/profile/edit"
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Izmeni profil
        </Link>
      </div>
    </div>
  );
}
