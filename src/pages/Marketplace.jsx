import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

const Marketplace = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/item/list`)
      .then((res) => {
        setItems(res.data.payload || []);
      })
      .catch((err) => {
        console.error("Gagal fetch barang:", err);
        alert("Gagal mengambil daftar barang.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
        Marketplace Produk
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="text-green-600 font-bold text-lg">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
