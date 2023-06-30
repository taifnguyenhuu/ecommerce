import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "../pages/category/Category";
import Home from "../pages/home/Home";
import LoginEc from "../components/login/LoginEc";
import SignupEc from "../components/login/SignupEc";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Category />}>
        Home
      </Route>
      <Route path="/:categoryId" element={<Category />}>
        Category
      </Route>
      {/* <Route path="/:login" element={<LoginEc />}></Route>
      <Route path="/:signup" element={<SignupEc />}></Route> */}
    </Routes>
  );
}

export default AppRoutes;
