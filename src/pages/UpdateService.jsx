import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateService = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [service, setService] = useState();
  const [category, setCategory] = useState(service?.category);
  const navigation = useNavigate();
  useEffect(() => {
    axios
      .get(`https://backend-10-tau.vercel.app/services/${id}`)
      .then((res) => {
        setService(res.data);
        setCategory(res.data.category);
      });
  }, [id]);
  console.log(service);

  const handleUpdate = (e) => {
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
      .put(`https://backend-10-tau.vercel.app/update/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        navigation("/my-services");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-[#111] shadow-lg shadow-orange-500/20 rounded-2xl p-8 border border-orange-500/30">
        <h2 className="text-3xl font-bold text-orange-400 text-center mb-8">
          Update Listing
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Product  */}
          <div>
            <label className="block mb-1 font-medium text-orange-300">
              Product / Pet Name
            </label>
            <input
              defaultValue={service?.name}
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
              value={category}
              name="category"
              onChange={(e) => setCategory(e.target.value)}
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
              defaultValue={service?.price}
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
              defaultValue={service?.location}
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
              defaultValue={service?.description}
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
              defaultValue={service?.image}
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
              defaultValue={service?.date}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
