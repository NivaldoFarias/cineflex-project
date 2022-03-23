import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./Header";
import Main from "./Main";
import Session from "./Session";
import Movie from "./Movie";

export default function Wrapper() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}
