// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import FamilySurvey from "./components/pages/FamilySurvey";
import FamilySurveyHindi from "./components/pages/FamilySurveyHindi";
import { ToastContainer } from "react-toastify";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsConditions from "./components/pages/TermsConditions";
import Support from "./components/pages/Support";
import ChildSafetyStandards from "./components/pages/chileSafety";

function App() {
  return (
    <Router>

      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="family-survey/en" element={<FamilySurvey />} />
          <Route path="family-survey/hi" element={<FamilySurveyHindi />} />

           <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsConditions />} />
             <Route path="support" element={<Support />} />
              <Route path="child-safety" element={<ChildSafetyStandards />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </Router>
  );
}

export default App;