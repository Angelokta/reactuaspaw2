import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPenulis() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama: "",
    tanggalLahir: "",
    negara: "",
    biografi: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchPenulis = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(
          `https://uaspaw2.vercel.app/api/penulis/${id}`
        );

        setFormData({
          nama: response.data.nama || "",
          tanggalLahir: response.data.tanggalLahir
            ? response.data.tanggalLahir.substring(0, 10)
            : "",
          negara: response.data.negara || "",
          biografi: response.data.biografi || "",
        });

        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil data penulis"
        );
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchPenulis();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      await axios.patch(
        `https://uaspaw2.vercel.app/api/penulis/${id}`,
        formData
      );
      navigate("/penulis");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengupdate penulis"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) return <div className="mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Penulis</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Nama Penulis"
        />

        <input
          className="form-control mb-3"
          name="tanggalLahir"
          type="date"
          value={formData.tanggalLahir}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="negara"
          value={formData.negara}
          onChange={handleChange}
          placeholder="Negara"
        />

        <textarea
          className="form-control mb-3"
          name="biografi"
          value={formData.biografi}
          onChange={handleChange}
          placeholder="Biografi"
          rows="4"
        />

        <button className="btn btn-primary me-2" disabled={loading}>
          {loading ? "Mengupdate..." : "Update"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/penulis")}
        >
          Batal
        </button>
      </form>
    </div>
  );
}
