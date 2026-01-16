import axios from "axios";
import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // ADD THIS IMPORT

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ================= FETCH USER'S ORDERS =================
  const fetchOrders = () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`https://backend-10-tau.vercel.app/orders?email=${user.email}`)
      .then((res) => {
        setMyOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load orders"); 
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);
//  DELETE ORDER
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`https://backend-10-tau.vercel.app/orders/${id}`)
        .then(() => {
          toast.success("Order deleted successfully!"); 
          fetchOrders();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete order"); // ADD TOAST
        });
    }
  };

  //  CANCEL ORDER 
  const handleCancelOrder = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .patch(`https://backend-10-tau.vercel.app/orders/${id}/cancel`)
        .then(() => {
          toast.success("Booking cancelled successfully!");
          fetchOrders();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to cancel booking");
        });
    }
  };

  // MODAL CONTROL 
  const openModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
    setSelectedOrder(null);
  };

  // ================= IF USER NOT LOGGED IN =================
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Please Login First!
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg hover:scale-105 transition">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-4 sm:p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-10 text-center text-orange-400">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : myOrders.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl text-gray-300 mb-4">
              You haven't placed any orders yet.
            </h2>
            <button
              onClick={() => navigate("/services")}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg hover:scale-105 transition">
              Browse Cars
            </button>
          </div>
        ) : (
          <>
            {/* Order Summary */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 mb-8">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-orange-300">
                    Total Orders: {myOrders.length}
                  </h3>
                  <p className="text-gray-300">
                    Email: <span className="text-purple-300">{user.email}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    Total Spent: $
                    {myOrders.reduce(
                      (total, order) =>
                        total + (order.rentDays || 1) * (order.price || 0),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border border-white/10">
              <table className="min-w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-700 to-orange-500 text-white uppercase tracking-wide text-xs sm:text-sm">
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-3">Car</th>
                    <th className="py-3 px-3">Renter</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Days</th>
                    <th className="py-3 px-3">Price/Day</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {myOrders.map((order, index) => (
                    <tr
                      key={order._id}
                      className={`border-b border-white/10 hover:bg-white/10 transition ${
                        index % 2 === 0 ? "bg-white/5" : ""
                      }`}>
                      <td className="py-2 px-3">{index + 1}</td>

                      <td className="py-2 px-3 font-semibold text-orange-300">
                        {order?.carName || order?.productName}
                      </td>

                      <td className="py-2 px-3">
                        {order?.renterName || order?.buyerName}
                      </td>

                      <td className="py-2 px-3 text-gray-300">
                        {order?.renterEmail || order?.buyerEmail}
                      </td>

                      <td className="py-2 px-3">{order?.rentDays || 1}</td>

                      <td className="py-2 px-3 text-purple-300 font-semibold">
                        ${order?.price}
                      </td>

                      <td className="py-2 px-3 text-green-400 font-semibold">
                        ${(order?.rentDays || 1) * (order?.price || 0)}
                      </td>

                      <td className="py-2 px-3">{order?.phone}</td>

                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order?.status === "confirmed"
                              ? "bg-green-500/20 text-green-300"
                              : order?.status === "cancelled"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}>
                          {order?.status || "pending"}
                        </span>
                      </td>

                      <td className="py-2 px-3 flex gap-2 justify-center">
                        <button
                          onClick={() => openModal(order)}
                          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white">
                          View
                        </button>

                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition text-white">
                          Cancel
                        </button>

                        <button
                          onClick={() => handleDelete(order._id)}
                          className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= MODAL ================= */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box max-w-2xl bg-gradient-to-br from-[#020617] via-[#111827] to-[#020617] border border-purple-500/30 text-gray-100 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-orange-400">
              Order Details
            </h3>

            {selectedOrder && (
              <div className="space-y-3 text-sm sm:text-base">
                <Info
                  label="Car"
                  value={selectedOrder.carName || selectedOrder.productName}
                />
                <Info
                  label="Renter"
                  value={selectedOrder.renterName || selectedOrder.buyerName}
                />
                <Info
                  label="Email"
                  value={selectedOrder.renterEmail || selectedOrder.buyerEmail}
                />
                <Info label="Rent Days" value={selectedOrder.rentDays || 1} />
                <Info label="Price per Day" value={`$${selectedOrder.price}`} />
                <Info
                  label="Total Cost"
                  value={`$${
                    (selectedOrder.rentDays || 1) * (selectedOrder.price || 0)
                  }`}
                  highlight
                />
                <Info label="Phone" value={selectedOrder.phone} />
                <Info label="Address" value={selectedOrder.address} />
                <Info
                  label="Order Date"
                  value={new Date(selectedOrder.date).toLocaleDateString()}
                />
                <Info
                  label="Status"
                  value={selectedOrder.status || "pending"}
                />

                <div>
                  <p className="text-purple-300 font-semibold mb-1">Note</p>
                  <p className="bg-white/10 p-3 rounded-xl">
                    {selectedOrder.note || "No note provided"}
                  </p>
                </div>
              </div>
            )}

            <div className="modal-action mt-6">
              <button
                onClick={closeModal}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:scale-105 transition">
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

const Info = ({ label, value, highlight }) => (
  <div className="flex justify-between">
    <span className="text-purple-300 font-semibold">{label}:</span>
    <span className={highlight ? "text-green-400 font-semibold" : ""}>
      {value}
    </span>
  </div>
);

export default MyOrders;
