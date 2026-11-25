import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import PeerovaPage from "./pages/PeerovaPage";
import KakeiboPage from "./pages/KakeiboPage";
import NotebookPage from "./pages/NotebookPage";
import InsightsPage from "./pages/InsightsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AignitePrivacyPolicyPage from "./pages/AignitePrivacyPolicyPage";
import PengokuPrivacyPolicyPage from "./pages/PengokuPrivacyPolicyPage";
import PengokuTermsPage from "./pages/PengokuTermsPage";
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
        path: "/products/notebook",
        element: <NotebookPage />,
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
        path: "/pengoku/privacy",
        element: <PengokuPrivacyPolicyPage />,
      },
      {
        path: "/pengoku/privacy/",
        element: <PengokuPrivacyPolicyPage />,
      },
      {
        path: "/pengoku/terms",
        element: <PengokuTermsPage />,
      },
      {
        path: "/pengoku/terms/",
        element: <PengokuTermsPage />,
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
