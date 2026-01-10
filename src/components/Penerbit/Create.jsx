import { useState } from "react";
import axios from "axios";

export default function CreatePenerbit() {
  const [formData, setFormData] = useState({
    namaPenerbit: "",
    alamat: "",
    tahunBerdiri: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.namaPenerbit) {
      setError("Nama penerbit wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://uaspaw2.vercel.app/api/penerbit",
        formData
      );

      alert("Penerbit berhasil ditambahkan!");
      console.log(response.data);

      setFormData({
        namaPenerbit: "",
        alamat: "",
        tahunBerdiri: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal menyimpan penerbit"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tambah Penerbit</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Nama Penerbit */}
        <div className="mb-3">
          <label className="form-label">Nama Penerbit</label>
          <input
            type="text"
            name="namaPenerbit"
            className="form-control"
            value={formData.namaPenerbit}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Alamat */}
        <div className="mb-3">
          <label className="form-label">Alamat</label>
          <textarea
            name="alamat"
            className="form-control"
            value={formData.alamat}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Tahun Berdiri */}
        <div className="mb-3">
          <label className="form-label">Tahun Berdiri</label>
          <input
            type="number"
            name="tahunBerdiri"
            className="form-control"
            value={formData.tahunBerdiri}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
