import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("Semua field wajib diisi.");
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/user/register?name=${encodeURIComponent(
          form.name
        )}&email=${encodeURIComponent(
          form.email
        )}&password=${encodeURIComponent(form.password)}`
      );

      if (res.data.success) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        alert(res.data.message || "Registrasi gagal.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat registrasi.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Daftar Akun BhinekaStore
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Daftar
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
