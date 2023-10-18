import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate=useNavigate();
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    getusers();
    const auth=localStorage.getItem('user');
    if(auth==null){
      navigate("/")
    }
  }, [navigate]);

  const getusers = async () => {
    const userId = localStorage.getItem("id");
    const response = await fetch("http://localhost:5000/getusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    let data = await response.json();
    setuserData(data);
  };

  const grantAccess=async(userId)=>{
    const response = await fetch("http://localhost:5000/grantaccess", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    let data = await response.json();
    console.log(data);
  }

  const withdrawAccess=async(userId)=>{
    const response = await fetch("http://localhost:5000/withdrawaccess", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    let data = await response.json();
    console.log(data);
  }

  return (
    <>
<div className="px-6 py-4 mt-20">
  <h2 className="text-xl font-semibold text-gray-800 text-center">User Data</h2>
  <table className="table-auto w-full bg-white border border-gray-200 mt-4">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 border border-gray-300">Serial NO</th>
        <th className="px-4 py-2 border border-gray-300">Username</th>
        <th className="px-4 py-2 border border-gray-300">Email</th>
        <th className="px-4 py-2 border border-gray-300">Form Access</th>
      </tr>
    </thead>
    <tbody>
      {userData.map((user, index) => (
        <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
          <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
          <td className="px-4 py-2 border border-gray-300 text-center">{user.name}</td>
          <td className="px-4 py-2 border border-gray-300 text-center">{user.email}</td>
          <td className="px-4 py-2 border border-gray-300 text-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none mr-2" onClick={()=>{grantAccess(user._id)}}>
              Grant Access
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 focus:outline-none" onClick={()=>{withdrawAccess(user._id)}}>
              Withdraw Access
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </>
  );
}
