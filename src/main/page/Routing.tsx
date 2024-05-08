
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomeProducts } from "./product/Products";
import { HomeProducts2 } from "./product/Products2";
import { HomeProducts3 } from "./product/Products3";
import { HomeProducts4 } from "./product/Products4";
import { HomeProducts5 } from "./product/Products5";
import { HomeDashboard } from "./dashboard/Dashboard";


export const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeProducts />}></Route>
            <Route path={"/products"} element={<HomeProducts />} />
            <Route path={"/products2"} element={<HomeProducts2 />} />
            <Route path={"/products3"} element={<HomeProducts3 />} />
            <Route path={"/products4"} element={<HomeProducts4 />} />
            <Route path={"/products5"} element={<HomeProducts5 />} />
            <Route path={"/dashboard"} element={<HomeDashboard />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
};