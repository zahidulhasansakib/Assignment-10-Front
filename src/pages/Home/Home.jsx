// src/pages/Home/Home.jsx
import { useEffect, useState, useContext } from "react";
import HeroSlider from "../../components/Hero/HeroSlider";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import { FiAward } from "react-icons/fi"; // এইটা না হলে
import { FaAward } from "react-icons/fa"; 



// এইটা ব্যবহার করুন
// শুধু প্রয়োজনীয় আইকনগুলো import করুন
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiMessageSquare,
  FiHeart,
  FiNavigation,
  FiZap,
  FiThumbsUp,
} from "react-icons/fi";
import {
  FaCar,
  FaStar,
  FaCarSide,
  FaGasPump,
  FaCogs,
  FaUserTie,
  FaCheck,
  FaClock as FaClockIcon,
  FaTrophy,
} from "react-icons/fa";
const Home = () => {
 
  const [services, setServices] = useState([]);
  const [bookedCarIds, setBookedCarIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://backend-10-tau.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);
  // Fetch services from backend
  useEffect(() => {
    fetch("https://backend-10-tau.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  // Fetch booked car IDs
  useEffect(() => {
    fetch("https://backend-10-tau.vercel.app/booked-cars")
      .then((res) => res.json())
      .then((data) => {
        setBookedCarIds(data || []); // Ensure it's always an array
      })
      .catch((err) => {
        console.error(err);
        setBookedCarIds([]);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleViewDetails = (id) => {
    // Check if car is already booked
    const car = services.find((s) => s._id === id);
    if (car && car.status === "unavailable") {
      toast.error("Sorry! This car is not available for booking.");
      return;
    }

    if (!user) {
      toast.error("Please login to view details");
      navigate("/login");
      return;
    }

    navigate(`/services/${id}`);
  };
   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
       </div>
     );
   }
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* SECTION 1: HERO */}
      <HeroSlider />

      {/* SECTION 2: FEATURED CARS - এই সেকশনটা সম্পূর্ণ replace করুন */}
      {/* FEATURED CARS SECTION */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-4xl font-bold text-center mb-3">Featured Cars</h2>
        <p className="text-center text-gray-600 mb-12">
          Discover our newest premium cars, ready for your next journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => {
            const isBooked = bookedCarIds.includes(service._id);

            return (
              <div
                key={service._id}
                className="group rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                {/* AVAILABILITY BADGE */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white z-10 ${
                    isBooked ? "bg-red-500" : "bg-green-500"
                  }`}>
                  {isBooked ? "Booked" : "Available"}
                </div>

                <img
                  src={service.image}
                  alt={service.name}
                  className="h-52 w-full object-cover rounded-t-3xl group-hover:scale-105 transition"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold">{service.name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {service.category || "Luxury / Sedan"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Provider: {service.provider || "Verified Partner"}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-indigo-600">
                      ${service.price}
                      <span className="text-sm text-gray-500"> /day</span>
                    </p>

                    <button
                      onClick={() => handleViewDetails(service._id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed text-gray-700"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                      disabled={isBooked}>
                      {isBooked ? "Booked" : "View Details"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-semibold">
            View All Cars
          </button>
        </div>
      </section>

      {/* Why Rent With Us Section - ENHANCED */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              <FiAward className="w-5 h-5" />
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Thousands Choose DriveEasy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              We deliver exceptional service that goes beyond just car rental
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiZap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Instant Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Book your car in 60 seconds with our streamlined process
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                <FaCheck className="w-4 h-4" />
                <span>3-step booking</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiDollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Best Price
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We guarantee the lowest prices with no hidden fees
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <FaCheck className="w-4 h-4" />
                <span>Price match guarantee</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiShield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Verified Owners
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All providers are background checked for your safety
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                <FaCheck className="w-4 h-4" />
                <span>100% verified partners</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiClock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Round-the-clock assistance for all your needs
              </p>
              <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 font-medium">
                <FaCheck className="w-4 h-4" />
                <span>Always available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP RATED CARS - ENHANCED */}
      {/* TOP RATED CARS - MODERN STYLISH */}
      <section className="mt-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="text-yellow-300">⭐</span>
            TOP RATED CARS
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Customer{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Favorites
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Most loved cars with exceptional ratings and reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={service._id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-1 shadow-lg hover:shadow-2xl transition-all duration-500">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>

              {/* Card Content */}
              <div className="relative rounded-xl bg-white dark:bg-gray-800 p-6 h-full">
                {/* Ranking Indicator */}
                <div className="absolute -top-3 -right-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                      index === 0
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : index === 1
                        ? "bg-gradient-to-r from-gray-400 to-gray-600"
                        : "bg-gradient-to-r from-amber-600 to-yellow-500"
                    }`}>
                    {index + 1}
                  </div>
                </div>

                {/* Car Name & Rating */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      5.0
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      (48 reviews)
                    </span>
                  </div>
                </div>

                {/* Car Image (Optional - যদি image থাকে) */}
                {service.image && (
                  <div className="mb-6 rounded-xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FaGasPump className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Petrol
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FiUsers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      5 Seats
                    </span>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        ${service.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        per day
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        Available
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/services/${service._id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold group">
            View all top rated cars
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      {/* SECTION 5: TESTIMONIALS - UNIQUE & MODERN */}
      <section className="max-w-7xl mx-auto px-4 mt-28 pb-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 animate-pulse">
            <FiMessageSquare className="w-5 h-5" />
            <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              VOICES OF JOY
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Stories That{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Inspire
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Real experiences from our community of happy travelers
          </p>
        </div>

        <div className="relative">
          {/* Floating Elements Background */}
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-10 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-10 blur-xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                quote:
                  "Booking was super easy and the car quality exceeded my expectations. The team was very professional!",
                name: "Rahim Ahmed",
                role: "Business Traveler",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                tripType: "🏢 Business Trip",
                color: "from-blue-500 to-cyan-500",
              },
              {
                quote:
                  "Professional service with great prices. Highly recommended! Will definitely use again for my next trip.",
                name: "Nusrat Jahan",
                role: "Family Vacationer",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                tripType: "👨‍👩‍👧‍👦 Family Vacation",
                color: "from-purple-500 to-pink-500",
              },
              {
                quote:
                  "Best car rental experience I've had so far. Smooth process and excellent customer support!",
                name: "Tanvir Hasan",
                role: "Adventure Seeker",
                rating: 4,
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                tripType: "🏔️ Mountain Adventure",
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                {/* Floating Card Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform hover:-translate-y-4">
                  {/* Quote Marks */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-serif">
                    "
                  </div>

                  {/* Customer Avatar with Badge */}
                  <div className="relative mb-8">
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                      />
                      {/* Online Status Badge */}
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    {/* Trip Type Badge */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.tripType}
                      </span>
                    </div>
                  </div>

                  {/* Star Rating with Animation */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative">
                          <FaStar
                            className={`w-6 h-6 transition-all duration-300 ${
                              i < item.rating
                                ? "text-yellow-400 fill-current transform hover:scale-125"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                          {/* Star Glow Effect */}
                          {i < item.rating && (
                            <div className="absolute inset-0 w-6 h-6 bg-yellow-400 rounded-full blur-sm opacity-50 animate-ping"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                      {item.rating}.0
                    </span>
                  </div>

                  {/* Quote with Gradient Text */}
                  <div className="relative mb-8">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                    <p className="italic text-gray-700 dark:text-gray-300 text-lg pl-6 leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {item.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                        Verified Review
                      </div>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        2 days ago
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BEAUTIFUL STATS BAR */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl p-8 border border-white/20 dark:border-gray-700/30 shadow-2xl">
            {/* Animated Background Effects */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Stat 1 */}
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:from-blue-100/70 hover:to-cyan-100/70 dark:hover:from-blue-800/30 dark:hover:to-cyan-800/30 transition-all duration-500 border border-blue-100/30 dark:border-blue-800/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FiUsers className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
                  <span className="animate-count">500</span>
                  <span className="text-blue-500">+</span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                  Happy Customers
                </div>
                <div className="h-1 w-16 mx-auto mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>

              {/* Stat 2 */}
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100/70 hover:to-pink-100/70 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 transition-all duration-500 border border-purple-100/30 dark:border-purple-800/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaStar className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  4.8<span className="text-2xl text-purple-500">/5</span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                  Average Rating
                </div>
                <div className="h-1 w-16 mx-auto mt-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>

              {/* Stat 3 */}
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100/70 hover:to-emerald-100/70 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30 transition-all duration-500 border border-green-100/30 dark:border-green-800/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FiThumbsUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  98<span className="text-2xl text-green-500">%</span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                  Satisfaction Rate
                </div>
                <div className="h-1 w-16 mx-auto mt-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>

              {/* Stat 4 */}
              <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 hover:from-amber-100/70 hover:to-orange-100/70 dark:hover:from-amber-800/30 dark:hover:to-orange-800/30 transition-all duration-500 border border-amber-100/30 dark:border-amber-800/30">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaAward className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
                  <span className="animate-count">50</span>
                  <span className="text-amber-500">+</span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                  5-Star Reviews
                </div>
                <div className="h-1 w-16 mx-auto mt-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-4 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-6 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
            <div className="absolute top-8 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
              <FaStar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">
                Google
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                4.9 Stars
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
              <FiThumbsUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">
                Trustpilot
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Excellent
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
              <FaUserTie className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">#1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                In Service
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
