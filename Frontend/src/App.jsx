import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import Doubts from "./routes/Doubts/Doubts";
import LandingPage from "./routes/LandingPage/LandingPage";
import Layout from "./routes/Layout/Layout";
import SinglePage from "./routes/SinglePage/SinglePage";

import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  // paths
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/doubts",
          element: <Doubts />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
      ],
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter} />
      <ButtonGradient />
    </>
  );
};

export default App;
