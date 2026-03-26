import Title from "../components/Title";
import ShopContext from "../context/ShopContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const { currency, products } = useContext(ShopContext);

  return (
    <div className="border-t pt-20 sm:w-full bg-gray-50 min-h-screen px-4 sm:px-6">
      <Title text1="MY" text2="ORDERS" />

      <div className="mt-6 space-y-6">
        {products.slice(0, 8).map((order, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 border">
            
            {/* ORDER DETAILS */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order ID: <span className="text-gray-600">{order._id || "N/A"}</span>
              </h2>
              <p className="text-sm text-gray-500">
                Payment Method: <span className="font-medium">{order.paymentMethod || "Cash"}</span>
              </p>
              <p className="text-sm text-gray-500">
                Total Amount:{" "}
                <span className="font-medium">
                  {currency}{order.amount || order.price || "0"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Order Placed:{" "}
                <span className="font-medium">
                  {order.createdAt
                    ? new Date(order.createdAt).toDateString()
                    : "Not Available"}
                </span>
              </p>
            </div>

            {/* ORDER ITEMS */}
            <div className="space-y-4">
              {(order.products || [order]).map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <img
                    src={item.image?.[0] || "/default-image.jpg"}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                    alt={item.name}
                  />
                  <div className="text-center sm:text-left">
                    <p className="text-lg font-bold text-gray-800">{item.name || "Product Name"}</p>
                    <p className="text-sm text-gray-600">{item.description || "No description"}</p>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm sm:text-md text-gray-700 mt-2">
                      <p>
                        <span className="font-medium">Price:</span> {currency}
                        {item.price || 0}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span> {item.quantity || 1}
                      </p>
                      <p>
                        <span className="font-medium">Size:</span> {item.sizes?.[0] || "N/A"}
                      </p>
                      <p>
                        Date:  <span>20, jul, 2024</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* STATUS & TRACKING */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full shadow-lg ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-400"
                  }`}
                ></div>
                <p className="text-gray-700 font-medium">
                  Status: {order.status || "Processing"}
                </p>
              </div>

              <button
                onClick={() => navigate(`/track-order/${order._id}`)}
                className="bg-blue-500 text-white font-bold text-sm sm:text-md px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                TRACK YOUR ORDER
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
