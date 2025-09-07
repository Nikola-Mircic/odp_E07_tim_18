import { useState } from "react";
import { SačuvajVrednostPoKljuču } from "../../helpers/session_storage";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import { useAuth } from "../../hooks/useAuthHook";

export default function LoginForma({ authApi, onSuccess }: AuthFormProps) {
	const auth = useAuth();
	const [email, setEmail] = useState("");
	const [lozinka, setLozinka] = useState("");
	const [greska, setGreska] = useState("");

	const podnesiFormu = async (e: React.FormEvent) => {
		e.preventDefault();

		const validacija = validacijaPodatakaAuth(email, lozinka);
		if (!validacija.uspesno) {
			setGreska(validacija.poruka ?? "Неисправни подаци");
			return;
		}

		const odgovor = await authApi.prijava(email, lozinka);

		if (odgovor.success && odgovor.data) {
			const token = odgovor.data;
			console.log(token);
			auth.login(token);
			onSuccess();
		} else {
			setGreska(odgovor.message);
			setLozinka("");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-4 rounded-2xl shadow-gray-500 shadow-lg">
			<h1 className="text-2x1 mb-4">Login</h1>
			{greska && <p className="text-red-500 mb-2">{greska}</p>}
			<form onSubmit={podnesiFormu}>
				<div className="mb-2">
					<label className="block">E-mail:</label>
					<input
						type="email"
						placeholder="Unesite e-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border p-1"
					/>
				</div>
				<div className="mb-2">
					<label className="block">Lozinka:</label>
					<input
						type="password"
						placeholder="Unesite lozinku"
						value={lozinka}
						onChange={(e) => setLozinka(e.target.value)}
						className="w-full border p-1"
					/>
				</div>
				<button
					type="submit"
					className="mt-2 bg-blue-500 text-white p-2 rounded"
				>
					Prijavi se
				</button>
			</form>

      <div className="text-center">
        <p className="mt-4 text-sm text-gray-600">
          Nemate nalog? 
          <a href="/register" className="text-blue-500 hover:underline ml-1">
            Registrujte se
          </a>
        </p>
      </div>
		</div>
	);
}
