import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Login from "../views/Login";
import Toastify from "toastify-js";
import Cuisines from "../views/Cuisines";
import Categories from "../views/Categories";
import AddCuisine from "../views/AddCuisine";
import EditCuisine from "../views/EditCuisine";
import DeleteCuisine from "../views/DeleteCuisine";
import Register from "../views/Register";

const base_url = "https://restaurant.kelvintryanto.xyz";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        // toast di sini
        Toastify({
          text: "You already logged in",
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
        }).showToast();
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        // toast di sini
        Toastify({
          text: "Please login first",
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
        }).showToast();
        return redirect("/");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: (
          <>
            <Cuisines base_url={base_url} />
          </>
        ),
      },
      {
        path: "/add-cuisine",
        element: (
          <>
            <AddCuisine base_url={base_url} />
          </>
        ),
      },
      {
        path: "/edit-cuisine/:id",
        element: (
          <>
            <EditCuisine base_url={base_url} />
          </>
        ),
      },
      {
        path: "/delete-cuisine/:id",
        element: (
          <>
            <DeleteCuisine base_url={base_url} />
          </>
        ),
      },
      {
        path: "/categories",
        element: (
          <>
            <Categories base_url={base_url} />
          </>
        ),
      },
      {
        path: "/register",
        element: (
          <>
            <Register base_url={base_url} />
          </>
        ),
      },
    ],
  },
]);
