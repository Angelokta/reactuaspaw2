import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import Logout from "./components/Logout/Logout";

// Lazy load halaman
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login/Login"));

// NOVEL
const NovelList = React.lazy(() => import("./components/Novel/List"));
const NovelCreate = React.lazy(() => import("./components/Novel/Create"));
const NovelEdit = React.lazy(() => import("./components/Novel/Edit"));

// PENULIS
const PenulisList = React.lazy(() => import("./components/Penulis/List"));
const PenulisCreate = React.lazy(() => import("./components/Penulis/Create"));
const PenulisEdit = React.lazy(() => import("./components/Penulis/Edit"));

// PENERBIT
const PenerbitList = React.lazy(() => import("./components/Penerbit/List"));
const PenerbitCreate = React.lazy(() => import("./components/Penerbit/Create"));
const PenerbitEdit = React.lazy(() => import("./components/Penerbit/Edit"));

const App = () => {
  // State token login
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  // Sinkron token jika localStorage berubah
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          
          {/* Brand / Logo */}
          <NavLink className="navbar-brand fw-bold" to="/">
            📚 Novel App
          </NavLink>

          {/* Tombol toggle mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            
            {/* Menu kiri */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              {/* Menu muncul jika sudah login */}
              {token && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/novel">
                      Novel
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/penulis">
                      Penulis
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/penerbit">
                      Penerbit
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Menu kanan (Login / Logout) */}
            <ul className="navbar-nav">
              <li className="nav-item">
                {token ? (
                  <NavLink
                    className="nav-link text-warning"
                    to="/logout"
                    onClick={() => setToken(null)}
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link text-success" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>

          </div>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/logout" element={<Logout setToken={setToken} />} />

            {/* PROTECTED NOVEL */}
            <Route
              path="/novel"
              element={
                <ProtectedRoute>
                  <NovelList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/novel/create"
              element={
                <ProtectedRoute>
                  <NovelCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/novel/edit/:id"
              element={
                <ProtectedRoute>
                  <NovelEdit />
                </ProtectedRoute>
              }
            />

            {/* PROTECTED PENULIS */}
            <Route
              path="/penulis"
              element={
                <ProtectedRoute>
                  <PenulisList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/penulis/create"
              element={
                <ProtectedRoute>
                  <PenulisCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/penulis/edit/:id"
              element={
                <ProtectedRoute>
                  <PenulisEdit />
                </ProtectedRoute>
              }
            />

            {/* PROTECTED PENERBIT */}
            <Route
              path="/penerbit"
              element={
                <ProtectedRoute>
                  <PenerbitList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/penerbit/create"
              element={
                <ProtectedRoute>
                  <PenerbitCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/penerbit/edit/:id"
              element={
                <ProtectedRoute>
                  <PenerbitEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
