import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [available, setAvailable] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('Tour noi dia')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/tours', {
        name,
        price: Number(price),
        destination,
        duration,
        available,
        image,
        category,
      })

      toast.success('Thêm thành công')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            value={price}
            onChange={event => setPrice(event.target.value)}
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block font-medium mb-1">Destination</label>
          <input
            value={destination}
            onChange={event => setDestination(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Duration</label>
          <input
            value={duration}
            onChange={event => setDuration(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Available */}
        <div>
          <label className="block font-medium mb-1">Available</label>
          <input
            value={available}
            onChange={event => setAvailable(event.target.value)}
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            value={image}
            onChange={event => setImage(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tour noi dia">Tour nội địa</option>
            <option value="Tour quoc te">Tour quốc tế</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddPage
