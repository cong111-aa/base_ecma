import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListPage() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  // Lấy list tour
  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tours");
      setTours(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    }
  };

  // Xóa tour
  const handleDelete = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xoá tour này?")) return;

    try {
      await axios.delete(`http://localhost:3000/tours/${id}`);
      setTours(tours.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Lỗi xoá:", err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tours</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">

          {/* HEADER */}
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên tour</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Số chỗ</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border text-center">Chức năng</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">

                {/* ID */}
                <td className="px-4 py-2 border">{tour.id}</td>

                {/* Ảnh */}
                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                {/* Tên tour */}
                <td className="px-4 py-2 border">{tour.name}</td>

                {/* Điểm đến */}
                <td className="px-4 py-2 border">{tour.destination}</td>

                {/* Thời gian */}
                <td className="px-4 py-2 border">{tour.duration}</td>

                {/* Số chỗ */}
                <td className="px-4 py-2 border">{tour.available}</td>

                {/* Giá */}
                <td className="px-4 py-2 border">
                  {tour.price.toLocaleString("vi-VN")} đ
                </td>

                {/* Chức năng */}
                <td className="px-4 py-2 border">
                  <div className="flex items-center justify-center gap-3">

                    {/* Nút sửa */}
                    <button
                      onClick={() => navigate(`/Edit/${tour.id}`)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </button>

                    {/* Nút xóa */}
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Xóa
                    </button>

                  </div>
                </td>

              </tr>
            ))}

            {tours.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 border">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ListPage;
