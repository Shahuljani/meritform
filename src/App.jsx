import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";   // 👈 NEW
import Admin from "./components/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />   {/* 👈 CHANGE */}
        <Route path="/mahesh-admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;