import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

export default function Categories({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCategories(data.data);
      Toastify({
        text: data.message,
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
    } catch (error) {
      Toastify({
        text: error.message,
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex text-4xl mb-5 items-center">List of Category</div>
      {loading ? (
        <>
          <div className="overflow-x-auto w-1/5" data-theme="light">
            <table className="table">
              <thead>
                <tr className="text-slate-600">
                  <th>
                    <div className="skeleton h-4 w-10"></div>
                  </th>
                  <th>
                    <div className="skeleton h-4 w-10"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <th>
                      <div className="skeleton h-4 w-4"></div>
                    </th>
                    <td>
                      <div className="skeleton h-4 w-32"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="overflow-x-auto w-1/5">
            <table className="table w-full1">
              <thead className="text-slate-600">
                <tr>
                  <th>id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {categories.map((category) => {
                    return (
                      <tr key={category?.id} className="hover:bg-green-100">
                        <th>{category.id}</th>
                        <td>{category.name}</td>
                      </tr>
                    );
                  })}
                </>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
