import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase"; // Firestore Connection
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "Orders");
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const orderRef = doc(db, "Orders", id);
      await updateDoc(orderRef, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await deleteDoc(doc(db, "Orders", id));
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="container container1 mt-5">
      <h1 className="heading">
        <i className="bi bi-clipboard-check"></i> Admin Inquiry Panel
      </h1>

      {/* Filter Section */}
      <div className="d-flex justify-content-center mb-5">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle d-flex align-items-center px-4 py-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="fw-bold me-2">Filter by Status</span>
          </button>

          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterStatus("All")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterStatus("Pending")}
              >
                Pending
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterStatus("In Process")}
              >
                In Process
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterStatus("Resolved")}
              >
                Resolved
              </button>
            </li>
          </ul>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-danger fw-bold fs-5">
          No Inquiries Found
        </p>
      ) : (
        <div className="row">
          {filteredOrders.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow p-3">
                <h2>
                  <i className="bi bi-file-earmark-text"></i> Inquiry ID:{" "}
                  {order.id}
                </h2>
                <p>
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.user.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.user.address}
                </p>

                <h5 className="border-bottom pb-2">
                  <i className="bi bi-info-circle-fill me-2"></i> Inquiry
                  Details:
                </h5>
                <ul className="list-group">
                  {order.orderDetails.items.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex align-items-center"
                    >
                      <img
                        src={item.ImageURL}
                        alt={item.Name}
                        className="me-3"
                        style={{
                          width: "75px",
                          height: "75px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #2193b0",
                        }}
                      />
                      <p className="mb-0">
                        <strong>{item.Name}</strong> (ID: {item.id})
                      </p>
                    </li>
                  ))}
                </ul>

                <label className="fw-bold mt-3">Status:</label>
                <select
                  className="form-select"
                  value={order.status || "Pending"}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Process">In Process</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => window.open(`mailto:${order.user.email}`)}
                    className="btn btn-dark w-100"
                  >
                    Email User
                  </button>
                  <button
                    onClick={() =>
                      window.open(`https://wa.me/${order.user.phone}`)
                    }
                    className="btn btn-success w-100"
                  >
                    WhatsApp User
                  </button>
                </div>
                <button
                  onClick={() => deleteInquiry(order.id)}
                  className="btn btn-danger mt-2 w-100"
                >
                  Delete Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
