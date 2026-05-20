import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import PeerovaPage from "./pages/PeerovaPage";
import KakeiboPage from "./pages/KakeiboPage";
import InsightsPage from "./pages/InsightsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AignitePrivacyPolicyPage from "./pages/AignitePrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import AcademyPage from "./pages/AcademyPage";
import PlaygroundPage from "./pages/PlaygroundPage";

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
      {
        path: "/academy",
        element: <AcademyPage />,
      },
      {
        path: "/playground",
        element: <PlaygroundPage />,
      },
      {
        path: "/privacy/kakeibo",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/privacy",
        element: <AignitePrivacyPolicyPage />,
      },
      {
        path: "/terms",
        element: <TermsOfServicePage />,
      },
      {
        path: "/delete-account",
        element: <DeleteAccountPage />,
      },
    ],
  },
]);
