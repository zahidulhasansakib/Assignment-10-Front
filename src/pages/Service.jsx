import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Service = () => {
  const [services, setServices] = useState([]);
  const [bookedCarIds, setBookedCarIds] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  // Fetch services
  useEffect(() => {
    fetch(`https://backend-10-tau.vercel.app/services?category=${category}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, [category]);

  // Fetch booked car IDs
  useEffect(() => {
    fetch("https://backend-10-tau.vercel.app/booked-cars")
      .then((res) => res.json())
      .then((data) => {
        console.log("Booked cars in service page:", data);
        setBookedCarIds(data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewDetails = (id) => {
    // Check if car is booked
    const isBooked = bookedCarIds.includes(id);

    if (isBooked) {
      toast.error("Sorry! This car is already booked.");
      return;
    }

    navigate(`/services/${id}`);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mt-10 mb-8">
          <select
            onChange={(e) => setCategory(e.target.value)}
            defaultValue=""
            className="select select-bordered w-full max-w-xs">
            <option value="" disabled>
              Choose Category
            </option>
            <option value="">All Cars</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <h1 className="text-3xl font-bold text-center mb-10">
          Find Your Perfect Ride 🚘
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const isBooked = bookedCarIds.includes(service._id);

            return (
              <div
                key={service._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl 
                  transition-transform transform hover:-translate-y-2 hover:scale-105 relative">
                {/* STATUS BADGE */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    isBooked ? "bg-red-500" : "bg-green-500"
                  }`}>
                  {isBooked ? "Booked" : "Available"}
                </div>

                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                <div className="mb-2">
                  <h2 className="text-xl font-semibold">{service.name}</h2>
                  <p className="text-gray-500 text-sm">{service.category}</p>
                </div>

                <div className="space-y-1 mb-3">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Location:</span>{" "}
                    {service.location}
                  </p>
                  <p className="text-blue-600 font-bold text-lg">
                    ${service.price}{" "}
                    <span className="text-gray-500 text-sm">/day</span>
                  </p>
                </div>

                <button
                  onClick={() => handleViewDetails(service._id)}
                  disabled={isBooked}
                  className={`btn w-full rounded-xl ${
                    isBooked
                      ? "btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "btn-primary hover:scale-105 transition"
                  }`}>
                  {isBooked ? "Already Booked" : "View Details"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
