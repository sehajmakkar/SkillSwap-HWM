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
import Login from "./routes/Login/Login";
import SinglePage from "./routes/SinglePage/SinglePage";
import Signup from "./routes/Signup/Signup";
import Rewards from "./routes/Rewards/Rewards";

import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import StudyTools from "./routes/StudyTools/StudyTools";
import Profile from "./routes/Profile/Profile";
import PricingPage from "./routes/PricingPage/PricingPage";
import Timer from "./routes/Timer/Timer";
import AddDoubt from "./routes/AddDoubt/AddDoubt";
import Whiteboard from "./routes/Whiteboard/Whiteboard";
import AllChat from "./routes/AllChat/AllChat";
import ChatPage from "./routes/ChatPage/ChatPage";
import VideoCall from "./routes/VideoCall/VideoCall";
import Lobby from "./routes/VideoCall/Lobby";

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
          path: "/doubts/:id",
          element: <SinglePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/studytools",
          element: <StudyTools />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/pricing",
          element: <PricingPage />,
        },
        {
          path: "/timer",
          element: <Timer />,
        },
        {
          path: "/rewards",
          element: <Rewards />,
        },
        {
          path: "/add-doubt",
          element: <AddDoubt />,
        },
        {
          path:"/whiteboard",
          element:<Whiteboard />
        },
        {
          path:"/allchat",
          element:<AllChat />
        },
        {
          path:"/chat",
          element:<ChatPage/>
        },
        {
          path:"/videocall",
          element:<VideoCall/>
        },
        {
          path:"/lobby",
          element:<Lobby/>
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
