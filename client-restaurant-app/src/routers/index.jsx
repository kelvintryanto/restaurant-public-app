import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Hero from "../views/Hero";
import MainCourse from "../views/MainCourse";
import FoodDetail from "../views/Detail";

const base_url = "https://restaurant.kelvintryanto.xyz/pub";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <MainCourse base_url={base_url} />
          </>
        ),
      },
      {
        path: "/detail/:id",
        element: (
          <>
            <FoodDetail base_url={base_url} />
          </>
        ),
      },
    ],
  },
]);
