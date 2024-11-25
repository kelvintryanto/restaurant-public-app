import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Login({ base_url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${base_url}/login`, { email, password });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Toastify({
        text: "Succeed Login",
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
      <div className="flex justify-center items-center h-screen bg-cover p-10" style={{ backgroundImage: 'url("/assets/images/Forest_Fog_1600x.webp")' }}>
        <div className="flex mx-auto w-screen justify-center space-x-40">
          <div id="logo" className="flex-col flex">
            <img src="/assets/images/logo.png" className="" alt="East Mountain Avenue Logo" />
            <i className="bg-gradient-to-r from-amber-700 to-amber-400 text-xl text-white py-2 px-3 rounded-md mt-5">Miraculous Cuisines in the Beauty of Mountain Forest</i>
          </div>
          <div className="flex flex-col bg-green-800 bg-opacity-40 p-5 border rounded-md w-1/4 self-center">
            <div className="text-3xl justify-center flex text-slate-200 mb-14">Login</div>
            <form onSubmit={handleLogin} className="flex flex-col">
              <input type="email" className="bg-green-50 rounded-md py-2 px-2 text-slate-600" placeholder="Email Address..." autoComplete="current-email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" className="bg-green-50 rounded-md py-2 px-2 text-slate-600 my-5" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
              <button type="password" className=" rounded-md py-2 px-2 text-slate-600 btn glass btn-success bg-success mt-8">
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span> Loading
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
