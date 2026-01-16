import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Fetch service details
  useEffect(() => {
    fetch(`https://backend-10-tau.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Check if car is booked
  useEffect(() => {
    if (!id) return;

    fetch("https://backend-10-tau.vercel.app/booked-cars")
      .then((res) => res.json())
      .then((data) => {
        const booked = data.includes(id);
        setIsBooked(booked);
      })
      .catch((err) => {
        console.error(err);
        setIsBooked(false);
      });
  }, [id]);

  const handleOrder = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a car");
      navigate("/login");
      return;
    }

    if (isBooked) {
      toast.error("Sorry! This car is already booked.");
      return;
    }

    const form = e.target;
    const formData = {
      carId: id,
      carName: service.name,
      renterName: user.displayName || form.renterName.value,
      renterEmail: user.email,
      rentDays: parseInt(form.rentDays.value) || 1,
      price: parseInt(service.price),
      address: form.address.value,
      phone: form.phone.value,
      note: form.note.value,
      status: "confirmed",
    };

    axios
      .post("https://backend-10-tau.vercel.app/orders", formData)
      .then((res) => {
        toast.success("Car booked successfully!");

        // Update local state
        setIsBooked(true);

        // Close modal
        document.getElementById("order_modal").close();

        // Redirect to my orders
        setTimeout(() => {
          navigate("/my-orders");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Failed to book car. Please try again.");
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-500">Car not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 relative"
        data-aos="fade-up">
        {/* STATUS BADGE */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${
            isBooked ? "bg-red-500" : "bg-green-500"
          }`}>
          {isBooked ? "Booked" : "Available"}
        </div>

        <img
          src={service.image}
          alt={service.name}
          className="w-full h-96 object-cover rounded-2xl mb-6"
          data-aos="zoom-in"
        />

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
          <p className="text-gray-600 mb-3">{service.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-700 font-medium">
                Category:{" "}
                <span className="font-semibold">{service.category}</span>
              </p>
              <p className="text-gray-700 font-medium mt-2">
                Price:{" "}
                <span className="font-semibold text-blue-600">
                  ${service.price}/day
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                Location:{" "}
                <span className="font-semibold">{service.location}</span>
              </p>
              <p className="text-gray-700 font-medium mt-2">
                Provider:{" "}
                <span className="font-semibold">{service.providerName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          disabled={isBooked || !user}
          className={`btn mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-xl transition-all ${
            isBooked
              ? "bg-gray-400 cursor-not-allowed"
              : !user
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gradient-to-r from-blue-600 to-teal-500 hover:scale-105"
          }`}
          onClick={() => document.getElementById("order_modal").showModal()}>
          {!user ? "Login to Book" : isBooked ? "Already Booked" : "Book Now"}
        </button>

        {/* Booking Modal */}
        <dialog
          id="order_modal"
          className="modal w-full modal-bottom sm:modal-middle">
          <div className="modal-box max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-center mb-5 text-blue-300">
              Rent This Car
            </h3>

            {isBooked ? (
              <div className="text-center py-8">
                <div className="text-red-400 text-5xl mb-4">⛔</div>
                <h4 className="text-xl font-bold text-red-300 mb-2">
                  Car Not Available
                </h4>
                <p className="text-gray-300">
                  This car has already been booked by another customer.
                </p>
                <button
                  onClick={() => document.getElementById("order_modal").close()}
                  className="mt-6 px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrder} className="space-y-4">
                <div>
                  <label className="text-blue-200 mb-1 block">Car Name</label>
                  <input
                    type="text"
                    name="carName"
                    defaultValue={service?.name}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 text-gray-300"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">Your Name</label>
                  <input
                    type="text"
                    name="renterName"
                    defaultValue={user?.displayName}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">Your Email</label>
                  <input
                    type="email"
                    name="renterEmail"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-black/60 text-gray-400 border border-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">Days</label>
                  <input
                    type="number"
                    name="rentDays"
                    placeholder="Number of days"
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">
                    Price per Day
                  </label>
                  <input
                    type="number"
                    name="price"
                    readOnly
                    defaultValue={service?.price}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 text-gray-300"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your address"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-blue-200 mb-1 block">Note</label>
                  <textarea
                    rows="3"
                    name="note"
                    placeholder="Any special requirements?"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-blue-500/40 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white text-lg font-semibold shadow-xl hover:scale-105 transition-all">
                  Confirm Booking
                </button>
              </form>
            )}

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

export default CarDetails;
