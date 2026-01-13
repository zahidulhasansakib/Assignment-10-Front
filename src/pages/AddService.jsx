import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = form.price.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const email = form.email.value;
    const date = form.date.value;
    const formData = {
      name,
      category,
      price,
      location,
      description,
      image,
      email,
      date,
    };
    console.log(formData);
    axios
      .post("https://backend-10-tau.vercel.app/services", formData)
      .then((res) => {
        console.log(res);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Service Added Successfully!",
            text: "Your product has been added.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigation("/my-services");
          });
        }
      });
  };
  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-[#111] shadow-lg shadow-orange-500/20 rounded-2xl p-8 border border-orange-500/30">
        <h2 className="text-3xl font-bold text-orange-400 text-center mb-8">
          Add Product / Pet
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product / Pet Name */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Product / Pet Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter product or pet name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Category
            </label>
            <select
              name="category"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none">
              <option>Select category</option>
              <option value="pets">Pets</option>
              <option value="food">Food</option>
              <option value="accessories">Accessories</option>
              <option value="care-products">Care Products</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="0 if pet"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter your location"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Description
            </label>
            <textarea
              rows="3"
              name="description"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Write description..."></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter image URL"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Pick-up Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-orange-500/40 text-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Email (readonly)
            </label>
            <input
              type="email"
              name="email"
              readOnly
              value={user?.email}
              className="w-full rounded-lg px-4 py-3 bg-black/60 text-gray-400 border border-orange-500/30 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button className="w-full py-3 mt-4 rounded-lg text-lg font-semibold text-black bg-orange-400 hover:bg-orange-500 hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/40">
            Add Product / Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
