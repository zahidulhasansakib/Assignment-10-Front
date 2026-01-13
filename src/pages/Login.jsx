import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { emailLogin, googleLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await emailLogin(email, password);
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await googleLogin();
      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div
            className="p-6"
            style={{
              background:
                "linear-gradient(90deg,#6b46c1 0%, #b794f4 50%, #f687b3 100%)",
            }}>
            <h1 className="text-3xl font-extrabold text-white text-center drop-shadow-md">
              Welcome Back
            </h1>
            <p className="text-sm text-white/90 text-center mt-2">
              Sign in to manage your winter pet care bookings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input
              type="email"
              value={email}
              
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-300"
              required
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-300 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2.5 text-gray-500">
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              {submitting ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full py-2 border rounded-xl flex justify-center items-center gap-2">
              <FaGoogle /> Login with Google
            </button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Signup
              </Link>
            </p>
            <p
              onClick={() =>
                navigate("/auth/forgot-password", { state: { email } })
              }
              className="text-blue-600 cursor-pointer mt-2 hover:underline">
              Forgot Password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
