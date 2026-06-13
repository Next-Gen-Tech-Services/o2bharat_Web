// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import FamilySurvey from "./components/pages/FamilySurvey";

function App() {
  return (
    <Router>

      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="family-survey" element={<FamilySurvey />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;