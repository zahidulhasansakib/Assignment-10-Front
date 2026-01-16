import React from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaStar,
  FaShieldAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePlay,
  FaAppStoreIos,
} from "react-icons/fa";
import {
  FiChevronRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiCreditCard,
  FiDownload,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20 pb-10">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <FaCar className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DriveEasy
                </h2>
                <p className="text-gray-400 mt-1">Premium Mobility Solutions</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
              Experience luxury on wheels with our curated fleet of premium
              vehicles. Your journey to exceptional car rentals starts here.
            </p>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="group flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <FaAppStoreIos className="w-6 h-6 text-white" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              <button className="group flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <FaGooglePlay className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/", icon: "🏠" },
                { name: "Browse Cars", path: "/services", icon: "🚗" },
                { name: "Premium Fleet", path: "/add-services", icon: "⭐" },
                { name: "About me", path: "/my-profile", icon: "👥" },
                { name: "My Orders", path: "/my-orders", icon: "📞" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group">
                    <span className="text-lg">{link.icon}</span>
                    <span className="flex-1 group-hover:translate-x-2 transition-transform">
                      {link.name}
                    </span>
                    <FiChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiMapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Our Location</p>
                  <p className="text-gray-400 text-sm mt-1">
                    123 Premium Street, Luxury City
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPhone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-400 text-sm mt-1">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-gray-500 text-xs">24/7 Customer Support</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-900/50 to-rose-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiMail className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-400 text-sm mt-1">
                    hello@driveeasy.com
                  </p>
                  <p className="text-gray-500 text-xs">
                    Response within 2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-6">
              Get exclusive offers and updates
            </p>
            <div className="flex group">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-l-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-r-2xl font-semibold transition-all duration-300 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <p className="text-gray-400 mb-6">
              Follow our journey on social media
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: <FaFacebookF />,
                  color: "hover:bg-blue-600",
                  delay: "delay-0",
                },
                {
                  icon: <FaTwitter />,
                  color: "hover:bg-cyan-500",
                  delay: "delay-75",
                },
                {
                  icon: <FaInstagram />,
                  color: "hover:bg-gradient-to-r from-purple-600 to-pink-600",
                  delay: "delay-150",
                },
                {
                  icon: <FaLinkedinIn />,
                  color: "hover:bg-blue-700",
                  delay: "delay-300",
                },
                {
                  icon: <FaYoutube />,
                  color: "hover:bg-red-600",
                  delay: "delay-500",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-300 hover:text-white transform hover:-translate-y-2 transition-all duration-300 ${social.color} ${social.delay}`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="text-lg font-bold mb-4">Why Trust Us</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <FiShield className="w-6 h-6 text-green-400" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()}{" "}
                <span className="text-white font-semibold">DriveEasy</span>. All
                rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Designed with ❤️ for car enthusiasts worldwide
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex gap-4">
                <FiCreditCard className="w-8 h-8 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                <FaCcVisa className="w-8 h-8 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                <FaCcMastercard className="w-8 h-8 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                <FaCcPaypal className="w-8 h-8 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                <FaCcApplePay className="w-8 h-8 text-gray-600 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:underline">
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:underline">
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:underline">
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:underline">
                Sitemap
              </a>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <FaStar className="w-5 h-5 text-yellow-400 animate-pulse" />
            <div>
              <div className="font-semibold">Best Service 2024</div>
              <div className="text-xs text-gray-400">Car Rental Awards</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-900/30 to-emerald-900/30">
            <FaShieldAlt className="w-5 h-5 text-green-400" />
            <div>
              <div className="font-semibold">Trust & Safety</div>
              <div className="text-xs text-gray-400">Verified Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-900/30 to-rose-900/30">
            <FaCar className="w-5 h-5 text-pink-400" />
            <div>
              <div className="font-semibold">500+ Vehicles</div>
              <div className="text-xs text-gray-400">Premium Fleet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50 group"
        aria-label="Back to top">
        <span className="group-hover:-translate-y-1 transition-transform">
          ↑
        </span>
      </button>
    </footer>
  );
};

export default Footer;
