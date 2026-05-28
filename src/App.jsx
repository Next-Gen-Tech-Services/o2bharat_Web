// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>

      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;