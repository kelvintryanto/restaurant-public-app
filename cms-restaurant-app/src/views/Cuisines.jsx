import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Cuisines({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [cuisines, setCuisines] = useState([]);

  async function fetchCuisines() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/cuisines`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCuisines(data.data);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${base_url}/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: data.message,
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
      fetchCuisines();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpload(file, id) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      console.log("FormData content:", [...formData.entries()]);
      console.log(file);
      const { data } = await axios.patch(`${base_url}/cuisines/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchCuisines();
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
      console.log(error);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCuisines();
  }, []);

  return (
    <>
      <div className="flex text-4xl mb-5 items-center">
        List of Cuisine
        <Link to="/add-cuisine">
          <button className="btn text-slate-600 bg-success btn-success glass btn-sm tooltip tooltip-right tooltip-warning ml-5" data-tip="Got some idea to make miraculous cuisines in our menu?">
            <FontAwesomeIcon icon={faBowlFood} className="mr-2" />
            Add Cuisine
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto ">
        <table className="table table-xs">
          {/* head */}
          <thead className="text-slate-600">
            <tr>
              <th className="text-center">id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} data-theme="light" className="bg-green-50">
                    <td className="text-center">
                      <div className="skeleton h-4 w-4"></div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="skeleton mask mask-squircle h-10 w-10"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="skeleton font-bold h-4 w-20 "></div>
                      </div>
                    </td>
                    <td>
                      <div className="skeleton text-sm h-4 w-20"></div>
                    </td>
                    <td>
                      <div className="skeleton text-sm h-4 w-20"></div>
                    </td>
                    <th className="text-center space-x-5">
                      <button className="skeleton btn btn-ghost btn-xs h-4 w-6"></button>
                      <button className="skeleton btn btn-ghost btn-xs h-4 w-6"></button>
                      <button className="skeleton btn btn-ghost btn-xs h-4 w-6"></button>
                    </th>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {cuisines.map((cuisine, index) => (
                  <tr key={index} className="hover:bg-green-100">
                    <td className="text-center">{cuisine?.id}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img src={cuisine?.imgUrl} alt={cuisine?.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{cuisine?.name}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">{cuisine?.price}</div>
                    </td>
                    <td>
                      <div className="text-sm">{cuisine?.description}</div>
                    </td>
                    <td className="text-center space-x-1 flex flex-nowrap">
                      <Link to={`/edit-cuisine/${cuisine?.id}`}>
                        <button className="btn text-slate-600 bg-warning btn-warning glass btn-xs tooltip" data-tip="edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </Link>
                      <label className="btn text-slate-600 bg-info btn-info glass btn-xs fa-solid fa-upload" htmlFor={`upload${cuisine?.id}`}></label>
                      <input type="file" id={`upload${cuisine?.id}`} className="hidden" onChange={(e) => handleUpload(e.target.files[0], cuisine?.id)} />
                      <button
                        className="btn text-slate-600 bg-error btn-error glass btn-xs tooltip"
                        data-tip="delete"
                        onClick={() => {
                          handleDelete(cuisine?.id);
                        }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
