import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import Button from "../components/Button";

export default function Register({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { username, email, password, phoneNumber, address };
      const { data } = await axios.post(`${base_url}/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);
      navigate("/");
      Toastify({
        text: `Succeed Register user: ${username} with email: ${email}`,
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

  return (
    <>
      <h1 className="text-4xl mb-5">Register User</h1>
      {loading ? (
        <form data-theme="light" className="flex bg-transparent w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5 bg-transparent w-2/5">
            <input type="text" className="input skeleton" />
            <input type="text" className="input skeleton" />
            <input type="text" className="input skeleton" />
            <input type="text" className="input skeleton" />
            <input type="text" className="input skeleton" />

            <button className="skeleton btn rounded-md py-2 px-2 text-slate-600 btn-success bg-success mt-8"></button>
          </div>
        </form>
      ) : (
        <form data-theme="light" className="flex bg-transparent w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5 bg-transparent w-2/5">
            <input type="text" placeholder="Username..." className="input input-bordered input-success" onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email..." className="input input-bordered input-success" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password..." className="input input-bordered input-success" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Phone Number" className="input input-bordered input-success" onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="text" placeholder="Address" className="input input-bordered input-success" onChange={(e) => setAddress(e.target.value)} />

            <Button name={"Register user"} />
          </div>
        </form>
      )}
    </>
  );
}
