import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import PeerovaPage from "./pages/PeerovaPage";
import KakeiboPage from "./pages/KakeiboPage";
import InsightsPage from "./pages/InsightsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/peerova",
        element: <PeerovaPage />,
      },
      {
        path: "/products/kakeibo",
        element: <KakeiboPage />,
      },
      {
        path: "/insights",
        element: <InsightsPage />,
      },
    ],
  },
]);
