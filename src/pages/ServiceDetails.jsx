// src/pages/ServiceDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigation = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch(`https://backend-10-tau.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data)) // Directly set data, no .find()
      .catch((err) => console.error(err));
  }, [id]);
  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const quantity = parseInt(form.quantity.value);
    const price = parseInt(form.price.value);
    const address = form.address.value;
    const phone = form.phone.value;
    const note = form.note.value;
    const formData = {
      productId: id,
      productName,
      buyerName,
      buyerEmail,
      quantity,
      price,
      address,
      phone,
      note,
      date: new Date(),
    };
    axios
      .post("https://backend-10-tau.vercel.app/orders", formData)
      .then((res) => {
        console.log(res);
        navigation("/my-orders");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!service) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6"
        data-aos="fade-up">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-96 object-cover rounded-2xl mb-6"
          data-aos="zoom-in"
        />

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* Open Modal Button */}
        <button
          className="btn bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none hover:scale-105"
          onClick={() => document.getElementById("order_modal").showModal()}>
          Book / Order Now
        </button>

        {/* Modal */}
        <dialog
          id="order_modal"
          className="modal w-full modal-bottom sm:modal-middle">
          <div className="modal-box max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-center mb-5 text-purple-300">
              Book This Service
            </h3>

            <form onSubmit={handleOrder} className="space-y-4 ">
              {/* Product Name */}
              <div>
                <label className="text-purple-200 mb-1 block">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  defaultValue={service?.name}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Buyer Name */}
              <div>
                <label className="text-purple-200 mb-1 block">Buyer Name</label>
                <input
                  type="text"
                  name="buyerName"
                  defaultValue={service?.displayName}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Buyer Email */}
              <div>
                <label className="text-purple-200 mb-1 block">
                  Buyer Email
                </label>
                <input
                  type="email"
                  name="buyerEmail"
                  defaultValue={user?.email}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl bg-black/60 text-gray-400 border border-purple-500/30"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="text-purple-200 mb-1 block">Quantity</label>
                <input
                  type="number"
                  required
                  name="quantity"
                  placeholder="Enter quantity"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-purple-200 mb-1 block">Price</label>
                <input
                  type="number"
                  name="price"
                  readOnly
                  defaultValue={service?.price}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-purple-200 mb-1 block">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-purple-200 mb-1 block">Phone</label>
                <input
                  type="text"
                  required
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Additional Note */}
              <div>
                <label className="text-purple-200 mb-1 block">
                  Additional Note
                </label>
                <textarea
                  rows="3"
                  name="note"
                  placeholder="Write something..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold shadow-xl hover:scale-105 transition-all">
                Confirm Order
              </button>
            </form>

            {/* Close Button */}
            <div className="modal-action mt-2">
              <form method="dialog">
                <button className="btn bg-gray-700 text-white border-none hover:bg-gray-600">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ServiceDetails;
