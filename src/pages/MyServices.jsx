// // import React, { useContext, useEffect, useState } from "react";
// // import { AuthContext } from "../provider/AuthProvider";
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import Swal from "sweetalert2";

// // const MyServices = () => {
// //   const [myServices, setMyServices] = useState([]);
// //   const { user } = useContext(AuthContext);
// //   useEffect(() => {
// //     if (!user?.email) return; // email না থাকলে fetch করবে না

// //     fetch(`https://backend-10-tau.vercel.app/my-services?email=${user.email}`)
// //       .then((res) => res.json())
// //       .then((data) => setMyServices(data))
// //       .catch((err) => console.log(err));
// //   }, [user?.email]);

// //   console.log(myServices);
// //   const handleDelete = (id) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#3085d6",
// //       cancelButtonColor: "#d33",
// //       confirmButtonText: "Yes, delete it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         axios
// //           .delete(`https://backend-10-tau.vercel.app/delete/${id}`)
// //           .then((res) => {
// //             console.log(res.data);
// //             const filterData = myServices.filter(
// //               (service) => service._id != id
// //             );
// //             console.log(filterData);
// //             setMyServices(filterData);
// //           })
// //           .catch((err) => {
// //             console.log(err);
// //           });
// //         Swal.fire({
// //           title: "Deleted!",
// //           text: "Your file has been deleted.",
// //           icon: "success",
// //         });
// //       }
// //     });
// //   };

// //   return (
// //     <div className=" ">
// //       <div className="overflow-x-auto">
// //         <table className="table mt-15">
// //           {/* head */}
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Description</th>
// //               <th>Price</th>
// //               <th>Action</th>
// //               <th></th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {/* row 1 */}
// //             {myServices.map((service) => (
// //               <tr>
// //                 <td>
// //                   <div className="flex items-center gap-3">
// //                     <div className="avatar">
// //                       <div className="mask mask-squircle h-12 w-12">
// //                         <img
// //                           src={service?.image}
// //                           alt="Avatar Tailwind CSS Component"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <div className="font-bold">{service?.name}</div>
// //                     </div>
// //                   </div>
// //                 </td>
// //                 <td>
// //                   <p>{service?.description}</p>
// //                 </td>
// //                 <td>{service?.price}</td>
// //                 <th className="flex gap-3">
// //                   <button
// //                     onClick={() => handleDelete(service?._id)}
// //                     className="btn btn-error btn-xs">
// //                     Delete
// //                   </button>
// //                   <Link to={`/update-services/${service?._id}`}>
// //                     {" "}
// //                     <button className="btn btn-primary btn-xs">Edit</button>
// //                   </Link>
// //                 </th>
// //               </tr>
// //             ))}
// //           </tbody>
// //           {/* foot */}
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyServices;


// // src/pages/MyCars.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MyServices = () => {
//   const [myServices, setMyServices] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (!user?.email) return;
//  fetch(`https://backend-10-tau.vercel.app/my-services?email=${user.email}`)
//    .then((res) => res.json())
//    .then((data) => setMyServices(data))
//    .catch((err) => console.log(err));
//   }, [user?.email]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`https://backend-10-tau.vercel.app/delete/${id}`)
//           .then(() => {
//             setMyServices(myServices.filter((car) => car._id !== id));
//             Swal.fire("Deleted!", "Car has been deleted.", "success");
//           })
//           .catch((err) => {
//             console.log(err);
//             Swal.fire("Error!", "Failed to delete car.", "error");
//           });
//       }
//     });
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">My Car Listings</h2>
//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>Car Name</th>
//             <th>Category</th>
//             <th>Rent Price</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {myServices.map((service) => (
//             <tr key={service._id}>
//               <td>
//                 <div className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="mask mask-squircle w-12 h-12">
//                       <img src={service.image} alt={service.name} />
//                     </div>
//                   </div>
//                   <div>{service.name}</div>
//                 </div>
//               </td>
//               <td>{service.category}</td>
//               <td>${service.price}</td>
//               <td>{service.status || "Available"}</td>
//               <td className="flex gap-2">
//                 <Link to={`/update-services/${service._id}`}>
//                   <button className="btn btn-primary btn-xs">Edit</button>
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(service._id)}
//                   className="btn btn-error btn-xs">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyServices;


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://backend-10-tau.vercel.app/my-services?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyServices(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this car?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#7c3aed",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://backend-10-tau.vercel.app/delete/${id}`)
          .then(() => {
            setMyServices(myServices.filter((car) => car._id !== id));
            Swal.fire("Deleted!", "Car removed successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete car.", "error");
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto bg-[#111827] rounded-3xl shadow-2xl border border-purple-500/20 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            My <span className="text-purple-400">Car Listings</span>
          </h2>
          <span className="text-sm text-gray-400">
            Total: {myServices.length}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-700">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-[#020617] text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Car</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Rent / Day</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myServices.map((service) => (
                <tr
                  key={service._id}
                  className="border-b border-gray-700 hover:bg-[#020617] transition">
                  {/* Car */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-14 h-14 rounded-xl object-cover border border-purple-500/30"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {service.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/30">
                      {service.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-orange-400">
                    ৳ {service.price}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        service.status === "Booked"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-green-500/10 text-green-400 border-green-500/30"
                      }`}>
                      {service.status || "Available"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link to={`/update-services/${service._id}`}>
                        <button className="px-4 py-1.5 text-xs rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="px-4 py-1.5 text-xs rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {myServices.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-400">
                    No cars added yet 🚗
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyServices;
