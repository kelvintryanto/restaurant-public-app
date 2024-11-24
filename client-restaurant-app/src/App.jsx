// import Header from "./views/Header";
// import MainCourse from "./views/MainCourse";
// import Footer from "./views/Footer";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
