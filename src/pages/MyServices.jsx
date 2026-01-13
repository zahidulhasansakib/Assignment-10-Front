import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user?.email) return; // email না থাকলে fetch করবে না

    fetch(`https://backend-10-tau.vercel.app/my-services?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyServices(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  console.log(myServices);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://backend-10-tau.vercel.app/delete/${id}`)
          .then((res) => {
            console.log(res.data);
            const filterData = myServices.filter(
              (service) => service._id != id
            );
            console.log(filterData);
            setMyServices(filterData);
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className=" ">
      <div className="overflow-x-auto">
        <table className="table mt-15">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myServices.map((service) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={service?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{service?.description}</p>
                </td>
                <td>{service?.price}</td>
                <th className="flex gap-3">
                  <button
                    onClick={() => handleDelete(service?._id)}
                    className="btn btn-error btn-xs">
                    Delete
                  </button>
                  <Link to={`/update-services/${service?._id}`}>
                    {" "}
                    <button className="btn btn-primary btn-xs">Edit</button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default MyServices;
