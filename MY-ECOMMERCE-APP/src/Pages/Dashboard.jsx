import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <button className="btn btn-primary" onClick={() => navigate("/product")}>
        Manage Products
      </button>
    </div>
  );
};

export default Dashboard;
