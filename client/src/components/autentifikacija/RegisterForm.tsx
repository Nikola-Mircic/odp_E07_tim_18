import { useState } from "react";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import { useAuth } from "../../hooks/useAuthHook";
import type { RegisterUserType } from "../../types/users/RegisterUserType";

export default function RegisterForm({ authApi, onSuccess }: AuthFormProps) {
  const auth = useAuth();
  const [uloga, setUloga] = useState("user");// Can be "user" or "editor"
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [lozinka2, setLozinka2] = useState("");
  const [greska, setGreska] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacija = validacijaPodatakaAuth(email, lozinka);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Неисправни подаци");
      return;
    }

    if(lozinka !== lozinka2) {
      setGreska("Lozinke se ne poklapaju");
      return;
    }

    let userData: RegisterUserType = {
      ime: ime,
      prezime: prezime,
      mejl: email,
      lozinka: lozinka,
      uloga: uloga
    };

    const odgovor = await authApi.registracija(userData);

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
			<h1 className="text-2x1 mb-4">Registracija</h1>
			{greska && <p className="text-red-500 mb-3">{greska}</p>}
			<form onSubmit={podnesiFormu}>
				<div className="mb-3">
					<label className="block">Ime:</label>
					<input
						type="text"
						placeholder="Unesite ime"
						value={ime}
						onChange={(e) => setIme(e.target.value)}
						className="w-full border p-1"
					/>
				</div>

				<div className="mb-3">
					<label className="block">Prezime:</label>
					<input
						type="text"
						placeholder="Unesite prezime"
						value={prezime}
						onChange={(e) => setPrezime(e.target.value)}
						className="w-full border p-1"
					/>
				</div>

				<div className="mb-3">
					<label className="block">Uloga:</label>
					<select
						value={uloga}
						onChange={(e) => setUloga(e.target.value)}
						className="w-full border-gray-500 p-2 rounded-md"
					>
						<option value="user">Korisnik</option>
						<option value="editor">Urednik</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="block">E-mail:</label>
					<input
						type="email"
						placeholder="Unesite e-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border p-1"
					/>
				</div>
				<div className="mb-3">
					<label className="block">Lozinka:</label>
					<input
						type={passwordVisible ? "text" : "password"}
						placeholder="Unesite lozinku"
						value={lozinka}
						onMouseEnter={() => setPasswordVisible(true)}
						onMouseLeave={() => setPasswordVisible(false)}
						onChange={(e) => {
							let pass = e.target.value;
							setLozinka(pass);
							if (lozinka2 !== pass && pass !== "" && lozinka2 !== "") {
								setGreska("Lozinke se ne poklapaju");
							} else {
								setGreska("");
							}
						}}
						className="w-full border p-1"
					/>
				</div>
				<div className="mb-3">
					<label className="block">Ponovite lozinku:</label>
					<input
						type={passwordVisible ? "text" : "password"}
						placeholder="Ponovite lozinku"
						value={lozinka2}
						onMouseEnter={() => setPasswordVisible(true)}
						onMouseLeave={() => setPasswordVisible(false)}
						onChange={(e) => {
							let pass = e.target.value;
							setLozinka2(pass);
							if (lozinka !== pass && pass !== "" && lozinka !== "") {
								setGreska("Lozinke se ne poklapaju");
							} else {
								setGreska("");
							}
						}}
						className="w-full border p-1"
					/>
				</div>
				<button
					type="submit"
					className="mt-2 bg-blue-500 text-white p-2 rounded"
				>
					Registruj se
				</button>
			</form>
		</div>
	);
}
