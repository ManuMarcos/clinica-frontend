import { useState } from "react";

import "./App.css";
import { Menu } from "./components/Menu";
import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { DoctorsPage } from "./pages/DoctorsPage";
import { PatientsPage } from "./pages/PatientsPage";
import { Services } from "./pages/ServicesPage";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./pages/LoginPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { SpecialitiesPage } from "./pages/SpecialitiesPage";

function App() {

  const location = useLocation();
  const isLoginPage = location.pathname === "/login"

  return (
    <>
    {!isLoginPage && (
        <>
          <Menu />
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Rutas protegidas con roles */}
        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/specialities" element={<SpecialitiesPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
