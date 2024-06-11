import React, { useEffect, useState } from "react";
import "./student.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Student = () => {
  const [data, getData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8081/")
      .then((res) => res.json())
      .then((res) => {
        getData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const DeleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/delete/` + id)
      .then((res) => {
        console.log(res);
        fetchData(); // Fetch updated data after deletion
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[60%] bg-white p-10 rounded-xl">
        <Link to="/create">
          <button className="text-white bg-green-700 px-4 py-2 rounded-lg">
            Add+
          </button>
        </Link>
        <table className="w-full mt-10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>
                  <Link
                    to={`/update/${val.id}`}
                    className="text-white bg-blue-700 px-4 py-2 rounded-lg mr-5"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => DeleteRecord(val.id)}
                    className="text-white bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
