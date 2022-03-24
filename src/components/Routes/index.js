import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./Header";
import Main from "./Main";
import Session from "./Session";
import Movie from "./Movie";
import Output from "./Output";

export default function Wrapper() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:movieID" element={<Movie />} />
        <Route path="/session/:sessionID" element={<Session />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </BrowserRouter>
  );
}
