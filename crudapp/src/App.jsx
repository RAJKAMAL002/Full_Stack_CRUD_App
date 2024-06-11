import React from "react";
import { Route, Routes } from "react-router-dom";
import { Student } from "./assets/Student";
import { CreateStudent } from "./assets/CreateStudent";
import { UpdateStudent } from "./assets/UpdateStudent";

function App() {
  return (
    <>
      <div className=" bg-blue-500 w-full min-h-full h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
