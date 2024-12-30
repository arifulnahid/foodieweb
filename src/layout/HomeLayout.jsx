import React from "react";
import Navbar from "../components/navbar/Nabvbar";
import Food from "../components/food/Food";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
