import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CuisineForm from "../components/CuisineForm";
import axios from "axios";
import Toastify from "toastify-js";

export default function EditCuisine({ base_url }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [cuisine, setCuisine] = useState([]);

  async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { name, description, price: +price, imgUrl, categoryId: +categoryId };

      const { data } = await axios.put(`${base_url}/cuisines/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Toastify({
        text: `Succeed Update Data ${data.data.name}`,
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

  async function fetchCuisine() {
    try {
      const { data } = await axios.get(`${base_url}/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCuisine(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, []);

  return (
    <>
      <CuisineForm base_url={base_url} handleSubmit={handleSubmit} nameProp="Update Cuisine" handleLoading={loading} cuisine={cuisine} />
    </>
  );
}
