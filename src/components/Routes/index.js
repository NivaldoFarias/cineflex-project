import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./Header";
import Main from "./Main";
import Session from "./Session";

export default function Wrapper() {
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/session" element={<Session />} />
    </Routes>
  </BrowserRouter>;
}
