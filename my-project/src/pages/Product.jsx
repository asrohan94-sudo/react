import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import RelatedProducts from "../components/RelatedExam";

const backendUrl = "https://examly-ammh.onrender.com";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${backendUrl}/api/courses/${id}`);

        console.log("API RESPONSE:", res.data); // ✅ DEBUG

        // 🔥 FIX: handle ALL possible response formats
        const product =
          res.data?.course ||     // expected
          res.data?.product ||    // your backend currently sends this
          (res.data?._id ? res.data : null); // direct object

        if (product && product._id) {
          setProductData(product);
          setErrorMsg(""); // clear old error
        } else {
          setErrorMsg("Product not found");
        }

      } catch (err) {
        console.error("Error fetching product:", err.message);
        setErrorMsg("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleEnroll = () => {
    if (!productData) return;

    navigate("/cart", {
      state: {
        id: productData._id,
        name: productData.name,
        price: productData.price || 0,
      },
    });
  };

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (errorMsg) return <div className="text-center py-10 text-red-500">{errorMsg}</div>;
  if (!productData) return null;

  const image =
    Array.isArray(productData.image) && productData.image.length > 0
      ? productData.image[0]
      : productData.image || "/placeholder.jpg";

  const currency = productData.currency || "৳";

  return (
    <div className="border-t-2 pt-5">
      <div className="flex flex-col sm:flex-row gap-12">

        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="w-full flex items-center justify-center border rounded-lg p-2">
            <img src={image} alt={productData.name} className="w-full rounded" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl">{productData.name}</h1>
          <p className="text-gray-700 mt-2">{productData.description}</p>

          <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-xl">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-800">কোর্সের সুবিধা</h2>
              <Link to="/routine">
                <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                  Routine
                </button>
              </Link>
            </div>

            <ul className="space-y-2">
              {(productData.features && productData.features.length > 0
                ? productData.features
                : ["Feature 1", "Feature 2", "Feature 3"]
              ).map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-700">
                  <img src={assets.check} alt="check" className="w-4 h-4 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* RELATED */}
      <div className="mt-10">
        <RelatedProducts
          category={productData?.category || ""}
          subCategory={productData?.subCategory || ""}
        />
      </div>

      {/* ENROLL BAR */}
      <div className="fixed bottom-0 left-0 w-full flex flex-col items-center gap-2 p-4 border-t bg-white shadow-lg z-50">
        <p className="font-light text-xl text-center">{productData.name}</p>
        <p className="text-l font-medium">
          Price: {currency}{productData.price || 0}
        </p>
        <button
          onClick={handleEnroll}
          className="w-60 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-xl"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default Product;