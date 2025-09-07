import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsFeed from "./pages/NewsFeed";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/kontrolna_tabla/ProtectedRoute";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />

          {/* Sve rute unutar ovog wrapper-a su zaštićene */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<p>404 Stranica nije pronađena</p>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
