import CuisineForm from "../components/CuisineForm";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddCuisine({ base_url }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
    e.preventDefault();
    console.log(name, description, price, imgUrl, categoryId);
    try {
      setLoading(true);
      const body = { name, description, price: +price, imgUrl, categoryId: +categoryId };

      const { data } = await axios.post(`${base_url}/cuisines`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Toastify({
        text: `Succeed Add New Data ${data.data.name}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #10b981, #064e3b)",
          borderRadius: "8px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      console.log(data);
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ef4444, #f97316)",
          borderRadius: "8px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CuisineForm base_url={base_url} handleSubmit={handleSubmit} nameProp="Add Cuisine" handleLoading={loading} />
    </>
  );
}
