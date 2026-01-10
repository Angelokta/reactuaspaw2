/* eslint-disable no-unused-vars */
// Import React & hooks
import React, { useState } from "react";
// Import axios
import axios from "axios";
// Import navigasi
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  // State input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================= HANDLE LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://uaspaw2.vercel.app/api/auth/login",
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setToken(token);

      navigate("/novel");
    } catch (err) {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center shadow-sm bg-white">

          {/* KIRI – BRANDING */}
          <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
            <h2 className="fw-bold mb-3">Novel App</h2>
            <p className="text-center">
              Kelola data novel, penulis, dan penerbit
            </p>
          </div>

          {/* KANAN – FORM LOGIN */}
          <div className="col-md-6 p-5">
            <h4 className="fw-bold mb-2">Login</h4>
            <p className="text-muted mb-4">
              Silakan masuk untuk melanjutkan
            </p>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="contoh@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger py-2 text-center">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-2"
              >
                Login
              </button>
            </form>

            <div className="text-center text-muted mt-4">
              © labubu 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
