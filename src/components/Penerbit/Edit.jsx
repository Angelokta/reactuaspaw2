import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPenerbit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaPenerbit: "",
    alamat: "",
    tahunBerdiri: "",
  });

  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPenerbit = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(
          `https://uaspaw2.vercel.app/api/penerbit/${id}`
        );

        setFormData({
          namaPenerbit: response.data.namaPenerbit || "",
          alamat: response.data.alamat || "",
          tahunBerdiri: response.data.tahunBerdiri || "",
        });

        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil data penerbit"
        );
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchPenerbit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      await axios.patch(
        `https://uaspaw2.vercel.app/api/penerbit/${id}`,
        formData
      );
      navigate("/penerbit");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengupdate penerbit"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Penerbit</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="namaPenerbit"
          value={formData.namaPenerbit}
          onChange={handleChange}
          placeholder="Nama Penerbit"
        />

        <textarea
          className="form-control mb-3"
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          placeholder="Alamat"
        />

        <input
          className="form-control mb-3"
          type="number"
          name="tahunBerdiri"
          value={formData.tahunBerdiri}
          onChange={handleChange}
          placeholder="Tahun Berdiri"
        />

        <button className="btn btn-primary me-2" disabled={loading}>
          {loading ? "Mengupdate..." : "Update"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/penerbit")}
        >
          Batal
        </button>
      </form>
    </div>
  );
}
