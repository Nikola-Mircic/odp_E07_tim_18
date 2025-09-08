import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { UserProfileDto } from "../types/users/UserProfile";
import { UserAPI } from "../api_services/users/UserAPIService";
import { useAuth } from "../hooks/useAuthHook";

import type { UserDto } from "../models/users/UserDTO";

export default function ProfilePage() {
  const {user} = useAuth();
	const [me, setMe] = useState<UserProfileDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			setErr(null);
			try {
				const response = await UserAPI.getUserById(user?.id!);

        if(!response || !response.data)
          return;

        const res: UserDto = response.data;

        console.log(res);

        setMe({
					id: res.id,
					uloga: res.uloga,
					ime: res.ime,
					prezime: res.prezime,
					mejl: res.mejl,
					email: res.mejl,
				});
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

	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Moj profil</h1>

			<div className="space-y-2">
				<div>
					<span className="text-gray-500">Ime:</span> {me.ime}
				</div>
				<div>
					<span className="text-gray-500">Prezime:</span> {me.prezime}
				</div>
				<div>
					<span className="text-gray-500">Mejl:</span> {me.email}
				</div>
				<div>
					<span className="text-gray-500">Uloga:</span> {me.uloga}
				</div>
			</div>
		</div>
	);
}
