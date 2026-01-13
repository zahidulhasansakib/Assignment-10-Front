import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const modalRef = useRef(null);

  // Fetch orders
  const fetchOrders = () => {
    axios
      .get("https://backend-10-tau.vercel.app/orders")
      .then((res) => setMyOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete order
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`https://backend-10-tau.vercel.app/orders/${id}`)
        .then(() => fetchOrders())
        .catch((err) => console.log(err));
    }
  };

  // Open modal
  const openModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };

  // Close modal
  const closeModal = () => {
    modalRef.current.close();
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-4 sm:p-8 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-10 sm:mb-10 text-center text-white">
        Orders Dashboard
      </h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-xl border border-white/10">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-purple-700 to-pink-600 text-white text-xs sm:text-sm uppercase tracking-wide border-b border-white/20">
              <th className="py-2 px-2 sm:px-4">#</th>
              <th className="py-2 px-2 sm:px-4">Product</th>
              <th className="py-2 px-2 sm:px-4">Buyer</th>
              <th className="py-2 px-2 sm:px-4">Email</th>
              <th className="py-2 px-2 sm:px-4">Qty</th>
              <th className="py-2 px-2 sm:px-4">Price</th>
              <th className="py-2 px-2 sm:px-4">Total</th>
              <th className="py-2 px-2 sm:px-4">Phone</th>
              <th className="py-2 px-2 sm:px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, index) => (
              <tr
                key={order._id}
                className={`border-b border-white/10 transition-all hover:bg-white/5 ${
                  index % 2 === 0 ? "bg-white/5" : ""
                }`}>
                <td className="py-2 px-2 sm:px-4">{index + 1}</td>
                <td className="py-2 px-2 sm:px-4 font-medium">
                  {order?.productName}
                </td>
                <td className="py-2 px-2 sm:px-4">{order.buyerName}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-200">
                  {order?.buyerEmail}
                </td>
                <td className="py-2 px-2 sm:px-4">{order.quantity}</td>
                <td className="py-2 px-2 sm:px-4 text-purple-300 font-semibold">
                  ${order?.price}
                </td>
                <td className="py-2 px-2 sm:px-4 text-green-400 font-semibold">
                  ${Number(order?.quantity) * Number(order.price)}
                </td>
                <td className="py-2 px-2 sm:px-4">{order.phone}</td>
                <td className="py-2 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-2">
                  <button
                    onClick={() => openModal(order)}
                    className="px-2 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:scale-105 transition">
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-2 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:scale-105 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Modal */}
      <dialog
        ref={modalRef}
        className="modal w-full sm:max-w-2xl rounded-2xl p-0">
        <div className="modal-box bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white rounded-2xl shadow-2xl border border-purple-500/30 p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-pink-400">
            Order Details
          </h3>

          {selectedOrder ? (
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Product:</span>{" "}
                <span>{selectedOrder.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Buyer:</span>{" "}
                <span>{selectedOrder.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Email:</span>{" "}
                <span>{selectedOrder.buyerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Quantity:</span>{" "}
                <span>{selectedOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Price:</span>{" "}
                <span>${selectedOrder.price}</span>
              </div>
              <div className="flex justify-between text-green-400 font-semibold">
                <span>Total Price:</span>{" "}
                <span>
                  $
                  {Number(selectedOrder.quantity) * Number(selectedOrder.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Phone:</span>{" "}
                <span>{selectedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-purple-300">Address:</span>{" "}
                <span>{selectedOrder.address}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-purple-300 mb-1">
                  Note:
                </span>
                <p className="bg-white/10 p-2 rounded-xl text-gray-200">
                  {selectedOrder.note || "None"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">No order selected</p>
          )}

          <div className="modal-action mt-4 sm:mt-6">
            <button
              onClick={closeModal}
              className="btn w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 transition-all">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyOrders;
