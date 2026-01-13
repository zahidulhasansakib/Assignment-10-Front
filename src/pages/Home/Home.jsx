// src/pages/Home/Home.jsx
import { useEffect, useState, useContext } from "react";
import HeroSlider from "../../components/Hero/HeroSlider";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://backend-10-tau.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(services);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      toast.error("You must login first to view service details.");
      navigate("/auth/login");
      return;
    }
    navigate(`/services/${id}`);
  };

  return (
    <div>
      <div className="space-y-10">
        <HeroSlider />
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-5 text-center">
        Popular Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.serviceId}
            className="bg-white rounded-2xl shadow-md p-4 
              transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            data-aos="fade-up">
            <img
              src={service.image}
              className="w-full h-48 object-cover rounded-xl transition-all duration-300 hover:scale-105"
              data-aos="zoom-in"
            />
            <h3 className="text-xl font-semibold mt-3 animate__animated animate__fadeInUp">
              {service?.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Date: {service.date}</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              ${service.price}
            </p>
            <div>
              <button
                onClick={() => handleViewDetails(service._id)}
                className="btn btn-primary w-full mt-4 rounded-xl"
                data-aos="flip-left">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION: Winter Care Tips for Pets */}
      <div className="mt-20">
        <h2
          className="text-3xl font-bold text-center mb-6"
          data-aos="fade-right">
          Winter Care Tips for Pets ❄🐾
        </h2>

        <p
          className="text-center max-w-2xl mx-auto text-gray-600 mb-10"
          data-aos="fade-left">
          Keep your furry friends warm, healthy and safe this winter with these
          expert tips.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            data-aos="fade-up">
            <h3 className="text-xl font-semibold">Warm Clothing</h3>
            <p className="text-gray-600 mt-2">
              Use soft winter coats or sweaters especially for small or
              short-haired pets.
            </p>
          </div>

          <div
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            data-aos="fade-up"
            data-aos-delay="100">
            <h3 className="text-xl font-semibold">Protect Their Paws</h3>
            <p className="text-gray-600 mt-2">
              Apply paw balms and clean their feet after walks to prevent
              dryness and cracking.
            </p>
          </div>

          <div
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            data-aos="fade-up"
            data-aos-delay="200">
            <h3 className="text-xl font-semibold">Keep Them Hydrated</h3>
            <p className="text-gray-600 mt-2">
              Pets drink less water in winter—ensure they stay hydrated daily.
            </p>
          </div>
        </div>
      </div>
      {/* SECTION: Meet Our Expert Vets */}
      <div className="mt-24">
        <h2
          className="text-3xl font-bold text-center mb-6 animate__animated animate__fadeInDown"
          data-aos="fade-down">
          Meet Our Expert Vets 👩‍⚕️🐶
        </h2>

        <p
          className="text-center max-w-2xl mx-auto text-gray-600 mb-10 animate__animated animate__fadeInUp"
          data-aos="fade-up">
          Our certified veterinarians ensure quality winter care and health
          support for your pets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vet 1 */}
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl 
      transition-all duration-300 text-center hover:-translate-y-1"
            data-aos="zoom-in">
            <img
              src="https://i.postimg.cc/YSmfSGRQ/pexels-photo-5214995.jpg"
              className="w-32 h-32 object-cover rounded-full mx-auto animate__animated animate__zoomIn"
              alt="Dr. Samantha Ray"
            />
            <h3 className="text-xl font-semibold mt-4">Dr. Samantha Ray</h3>
            <p className="text-gray-600 text-sm mt-1">
              Winter Pet Nutrition Specialist
            </p>
          </div>

          {/* Vet 2 */}
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl 
      transition-all duration-300 text-center hover:-translate-y-1"
            data-aos="zoom-in"
            data-aos-delay="100">
            <img
              src="https://i.postimg.cc/Fs7fmtDg/pexels-photo-5452268.jpg"
              className="w-32 h-32 object-cover rounded-full mx-auto animate__animated animate__zoomIn"
              alt="Dr. Alex Johnson"
            />
            <h3 className="text-xl font-semibold mt-4">Dr. Alex Johnson</h3>
            <p className="text-gray-600 text-sm mt-1">
              Cold Weather Pet Grooming Expert
            </p>
          </div>

          {/* Vet 3 */}
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl 
      transition-all duration-300 text-center hover:-translate-y-1"
            data-aos="zoom-in"
            data-aos-delay="200">
            <img
              src="https://i.postimg.cc/Jzjz4RJW/pexels-photo-4173251.jpg"
              className="w-32 h-32 object-cover rounded-full mx-auto animate__animated animate__zoomIn"
              alt="Dr. Mia Carter"
            />
            <h3 className="text-xl font-semibold mt-4">Dr. Mia Carter</h3>
            <p className="text-gray-600 text-sm mt-1">
              Winter Behavior & Safety Expert
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
