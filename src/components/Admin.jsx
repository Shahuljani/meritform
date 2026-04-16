import React from "react";
import { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";

export default function Admin() {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // 🔐 LOGIN
  const login = () => {
    if (user === "mahesh" && pass === "mahesh202616") {
      setAuth(true);
    } else {
      alert("Wrong credentials");
    }
  };

  // 📥 FETCH DATA
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));

    const arr = [];

    querySnapshot.forEach((doc) => {
      const d = doc.data();

      arr.push({
        Name: d.name || "",
        Phone: d.phone || "",
        State: d.stateName || "",
        City: d.cityName || "",
        School: d.schoolName || "",
        Course: d.courseName || "",
      });
    });

    setData(arr);

    if (arr.length === 0) {
      alert("No data found");
    } else {
      alert("Data Loaded Successfully");
    }
  };

  // 📊 DOWNLOAD EXCEL
  const downloadExcel = () => {
    if (data.length === 0) {
      alert("Load data first!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "Students_Data.xlsx");
  };

  // 🔐 LOGIN UI
  if (!auth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-lg font-bold mb-4">Admin Login</h2>

          <input
            placeholder="Username"
            className="border p-2 w-full mb-2"
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            className="border p-2 w-full mb-4"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-black text-white px-4 py-2 w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 📊 ADMIN DASHBOARD
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <button
        onClick={fetchData}
        className="bg-green-500 text-white px-4 py-2 mr-3"
      >
        Load Data
      </button>

      <button
        onClick={downloadExcel}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Download Excel
      </button>

      {/* TABLE */}
      <table className="mt-6 border w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Phone</th>
            <th>State</th>
            <th>City</th>
            <th>School</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="text-center border">
              <td>{d.Name}</td>
              <td>{d.Phone}</td>
              <td>{d.State}</td>
              <td>{d.City}</td>
              <td>{d.School}</td>
              <td>{d.Course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}