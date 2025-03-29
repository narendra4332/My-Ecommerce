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
        const orderList = orderSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            status: data.status || "Pending", // ✅ Default Status "Pending" if not present
          };
        });
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Mark Inquiry as "Viewed"
  const markAsViewed = async (id) => {
    try {
      const orderRef = doc(db, "Orders", id);
      await updateDoc(orderRef, { viewed: true });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, viewed: true } : order
        )
      );
    } catch (error) {
      console.error("Error updating viewed status:", error);
    }
  };

  // ✅ Update Inquiry Status
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

  // ✅ Delete Inquiry
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

      {/* ✅ Filter by Status */}
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
            {["All", "Pending", "In Process", "Resolved"].map((status) => (
              <li key={status}>
                <button
                  className="dropdown-item"
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              </li>
            ))}
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
              <div className="card shadow p-3 d-flex flex-column">
                {/* ✅ Inquiry ID + View Button */}
                <div className="d-flex justify-content-between align-items-center">
                  <h2>
                    <i className="bi bi-file-earmark-text"></i> Inquiry ID:{" "}
                    {order.id}
                  </h2>

                  {/* ✅ View / Not View Button */}
                  <button
                    className={`btn2 ${
                      order.viewed ? "btn-success" : "btn-danger"
                    }`}
                    onClick={() => markAsViewed(order.id)}
                    disabled={order.viewed}
                  >
                    {order.viewed ? "Viewed" : "Not View"}
                  </button>
                </div>

                {/* ✅ Status Field Dropdown */}
                <p>
                  <strong>Status:</strong>{" "}
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{
                      color:
                        order.status === "Pending"
                          ? "orange"
                          : order.status === "In Process"
                          ? "blue"
                          : "green",
                      fontWeight: "bold",
                    }}
                  >
                    <option
                      value="Pending"
                      style={{ color: "orange", fontWeight: "bold" }}
                    >
                      Pending
                    </option>
                    <option
                      value="In Process"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      In Process
                    </option>
                    <option
                      value="Resolved"
                      style={{ color: "green", fontWeight: "bold" }}
                    >
                      Resolved
                    </option>
                  </select>
                </p>

                {/* ✅ Inquiry Details */}
                <p>
                  <strong>Name:</strong> {order.user?.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {order.user?.email || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {order.user?.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {order.user?.address || "N/A"}
                </p>
                <p>
                  <strong>Notes:</strong> {order.user?.notes || "N/A"}
                </p>

                <h5 className="border-bottom pb-2">
                  <i className="bi bi-info-circle-fill me-2"></i> Inquiry
                  Details:
                </h5>
                <ul className="list-group">
                  {order.orderDetails?.items?.map((item, index) => (
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

                {/* ✅ Buttons Container */}
                <div className="mt-3 d-flex flex-column gap-2">
                  {/* Email & WhatsApp */}
                  <div className="d-flex gap-2">
                    <button
                      onClick={() =>
                        order.user?.email &&
                        window.open(`mailto:${order.user.email}`)
                      }
                      className="btn btn-dark w-100"
                      disabled={!order.user?.email}
                    >
                      <i className="bi bi-envelope"></i> Email User
                    </button>
                    <button
                      onClick={() =>
                        order.user?.phone &&
                        window.open(`https://wa.me/${order.user.phone}`)
                      }
                      className="btn btn-success w-100"
                      disabled={!order.user?.phone}
                    >
                      <i className="bi bi-whatsapp"></i> WhatsApp User
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteInquiry(order.id)}
                    className="btn btn-danger w-100"
                  >
                    <i className="bi bi-trash"></i> Delete Inquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
