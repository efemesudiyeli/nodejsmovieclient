/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages

import Home from "./pages/Home";
import Admin from "./pages/Admin";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
