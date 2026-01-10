import { useState } from "react";
import axios from "axios";

export default function CreatePenulis() {
  const [formData, setFormData] = useState({
    nama: "",
    tanggalLahir: "",
    negara: "",
    biografi: "",
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

    if (!formData.nama) {
      setError("Nama penulis wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://uaspaw2.vercel.app/api/penulis",
        formData
      );

      alert("Penulis berhasil ditambahkan!");
      console.log(response.data);

      setFormData({
        nama: "",
        tanggalLahir: "",
        negara: "",
        biografi: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal menyimpan penulis"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tambah Penulis</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="mb-3">
          <label className="form-label">Nama Penulis</label>
          <input
            type="text"
            name="nama"
            className="form-control"
            value={formData.nama}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Tanggal Lahir */}
        <div className="mb-3">
          <label className="form-label">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggalLahir"
            className="form-control"
            value={formData.tanggalLahir}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Negara */}
        <div className="mb-3">
          <label className="form-label">Negara</label>
          <input
            type="text"
            name="negara"
            className="form-control"
            value={formData.negara}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Biografi */}
        <div className="mb-3">
          <label className="form-label">Biografi</label>
          <textarea
            name="biografi"
            className="form-control"
            rows="4"
            value={formData.biografi}
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
