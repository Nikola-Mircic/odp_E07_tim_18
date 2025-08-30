import React from "react";

const Profile: React.FC = () => {
  const username = localStorage.getItem("username") || "Gost";

  return (
    <div className="p-4 max-w-md mx-auto border rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Profil korisnika</h1>
      <p>Korisničko ime: {username}</p>
      <p>Ovde možeš dodati još informacije o korisniku.</p>
    </div>
  );
};

export default Profile;

