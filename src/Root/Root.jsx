import { Outlet } from "react-router";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";

const Root = () => {
  return (
    <div className="w-full ">
      {/* Full-Width Navbar */}
      <Navbar />

      {/* Page Content (Container) */}
      <main className="max-w-7xl mx-auto px-4 mt-6">
        <Outlet />
      </main>

      {/* Full-Width Footer */}
      <Footer />
    </div>
  );
};

export default Root;
