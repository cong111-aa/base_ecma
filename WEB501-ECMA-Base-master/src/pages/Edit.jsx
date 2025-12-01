import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: ""
  });

  const fetchTour = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/tours/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("Lỗi tải tour:", err);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = {
      ...form,
      price: Number(form.price),
      available: Number(form.available)
    };

    try {
      await axios.put(`http://localhost:3000/tours/${id}`, updated);
      alert("Cập nhật thành công!");
      navigate("/List");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật Tour #{id}</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Tên tour */}
        <div>
          <label className="block mb-1 font-medium">Tên tour</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Điểm đến */}
        <div>
          <label className="block mb-1 font-medium">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Thời gian */}
        <div>
          <label className="block mb-1 font-medium">Thời gian (duration)</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Giá */}
        <div>
          <label className="block mb-1 font-medium">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Số chỗ còn lại */}
        <div>
          <label className="block mb-1 font-medium">Số chỗ (available)</label>
          <input
            type="number"
            name="available"
            value={form.available}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Ảnh */}
        <div>
          <label className="block mb-1 font-medium">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block mb-1 font-medium">Mô tả (description)</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
