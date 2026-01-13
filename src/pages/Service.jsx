import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";

const Service = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`https://backend-10-tau.vercel.app/services?category=${category}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, [category]);
  console.log(category);

  const handleViewDetails = (id) => {
    if (!user) {
      toast.error("You must login first to view service details.");
      navigate("/auth/login");
      return;
    }
    toast.success("Redirecting to service details...");
    navigate(`/services/${id}`);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="mt-10">
        <select
          onChange={(e) => setCategory(e.target.value)}
          defaultValue=""
          className="select">
          <option value="" disabled>
            Choose Category
          </option>
          <option value="">All</option>
          <option value="pets">Pets</option>
          <option value="food">Food</option>
          <option value="accessories">Accessories</option>
          <option value="care-products">Care Products</option>
        </select>
      </div>
      <h1 className="text-3xl font-bold text-center mb-10">
        Winter Care Services ❄🐾
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.serviceId}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl 
              transition-transform transform hover:-translate-y-2 hover:scale-105">
            <img
              src={service.image}
              alt={service.serviceName}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-500 mb-1">Category: {service.category}</p>

            <p className="text-gray-600 mb-1">Date: {service.date}</p>
            <p className="text-gray-600 mb-1">Location: {service.location}</p>
            <p className="text-blue-600 font-bold mb-3">${service.price}</p>
            <button
              onClick={() => handleViewDetails(service._id)}
              className="btn btn-primary w-full mt-4 rounded-xl"
              data-aos="flip-left">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
