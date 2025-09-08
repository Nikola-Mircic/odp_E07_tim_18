import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsFeed from "./pages/NewsFeed";
import NewsDetail from "./pages/NewsDetail";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";                  // ✅ ostaje ovako
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/kontrolna_tabla/ProtectedRoute";
import ProfileEditPage from "./pages/ProfileEditPage";  // ✅ ovo dodato

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Zaštićene rute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} /> {/* ✅ nova ruta */}
          </Route>

          <Route path="*" element={<p>404 Stranica nije pronađena</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
