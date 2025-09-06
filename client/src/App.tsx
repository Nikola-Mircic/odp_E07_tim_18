import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsFeed from "./pages/NewsFeed";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    
    <Router>
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <main className="flex-grow container mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<p>404 Stranica nije pronađena</p>} />
      </Routes>
    </main>

    <Footer />
  </div>
</Router>

  );
};

export default App;
