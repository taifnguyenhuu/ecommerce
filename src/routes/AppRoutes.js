import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "../pages/category/Category";
import Home from "../pages/home/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        Home
      </Route>
      <Route path="/:categoryId" element={<Category />}>
        Category
      </Route>
    </Routes>
  );
}

export default AppRoutes;
