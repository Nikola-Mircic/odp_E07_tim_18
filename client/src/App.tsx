import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsFeed from './pages/NewsFeed';
import Navbar from './components/Navbar';
import './App.css';
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
};

export default App;