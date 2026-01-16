import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const carName = form.carName.value;
    const description = form.description.value;
    const category = form.category.value;
    const rentPrice = form.rentPrice.value;
    const location = form.location.value;
    const image = form.image.value;
    const providerName = form.providerName.value;
    const providerEmail = form.providerEmail.value;

    const carData = {
      name: carName,
      description,
      category,
      price: rentPrice,
      location,
      image,
      providerName,
      providerEmail,
      email: providerEmail,
      date: new Date().toISOString(),
    };

    axios
      .post("https://backend-10-tau.vercel.app/services", carData)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Car added successfully!");
          form.reset();
          navigate("/my-services");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add car. Try again!");
      });
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-[#111] shadow-lg shadow-indigo-500/20 rounded-2xl p-8 border border-indigo-500/30">
        <h2 className="text-3xl font-bold text-indigo-400 text-center mb-8">
          Add Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Car Name */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Car Name
            </label>
            <input
              type="text"
              name="carName"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-indigo-500/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter car name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Description
            </label>
            <textarea
              rows="3"
              name="description"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-indigo-500/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Write car description..."
              required></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Category
            </label>
            <select
              name="category"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-indigo-500/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required>
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Rent Price */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Rent Price (per day)
            </label>
            <input
              type="number"
              name="rentPrice"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-indigo-500/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter rent price per day"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-indigo-500/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Hosted Image URL */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Hosted Image URL
            </label>
            <input
              type="text"
              name="image"
              className="w-full rounded-lg px-4 py-3 bg-black/70 border border-indigo-500/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter hosted image URL"
              required
            />
          </div>

          {/* Provider Name */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Provider Name (readonly)
            </label>
            <input
              type="text"
              name="providerName"
              readOnly
              value={user?.displayName || "Provider Name"}
              className="w-full rounded-lg px-4 py-3 bg-black/60 text-gray-400 border border-indigo-500/30 cursor-not-allowed"
            />
          </div>

          {/* Provider Email */}
          <div>
            <label className="block mb-1 font-medium text-indigo-300">
              Provider Email (readonly)
            </label>
            <input
              type="email"
              name="providerEmail"
              readOnly
              value={user?.email}
              className="w-full rounded-lg px-4 py-3 bg-black/60 text-gray-400 border border-indigo-500/30 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 mt-4 rounded-lg text-lg font-semibold text-black bg-indigo-400 hover:bg-indigo-500 hover:scale-[1.02] transition-all shadow-lg shadow-indigo-500/40">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
