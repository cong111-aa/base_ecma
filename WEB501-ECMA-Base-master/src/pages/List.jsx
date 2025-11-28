import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

function ListPage() {
  const [tours, setTours] = useState([])

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tours')
        setTours(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getTours()
  }, [])

  const handleDelete = async id => {
    try {
      if (confirm('Bạn có muốn xóa tour này không?')) {
        await axios.delete(`http://localhost:3000/tours/${id}`)
        setTours(tours.filter(tour => tour.id !== id))
        toast.success('Xóa thành công')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Image</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Destination</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Duration</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Price</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Available</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(tour => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.price.toLocaleString()} VND
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(tour.id)}> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListPage
