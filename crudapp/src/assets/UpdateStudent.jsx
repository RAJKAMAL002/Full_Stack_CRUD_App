import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/update/` + id, { name, email })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[40%] bg-white p-10 rounded-xl">
        <form className="flex flex-col" onSubmit={handleSubmit} method="post">
          <input
            type="text"
            placeholder="Enter name"
            className="bg-slate-200 my-2 px-3 py-3 outline-none rounded-md"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter email"
            className="bg-slate-200 my-2 px-3 py-3 outline-none rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-green-700 px-4 py-3 rounded-lg w-[170px] mt-7"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
