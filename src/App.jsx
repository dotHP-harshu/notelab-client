import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import LoginVerify from "./pages/LoginVerify";
import { RouterProvider } from "react-router/dom";
import Admin from "./pages/Admin";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminProtected from "./components/AdminProtected";
import PdfViewer from "./pages/PdfViewer";
import Profile from "./pages/Profile";
// import Bookmark from './pages/Bookmark'
import Search from "./pages/Search";
import AllSubject from "./pages/AllSubject";
import { PWAInstallProvider } from "./context/PWAInstallProvider";
import DownloadSubject from "./pages/DownloadSubject";
import DownloadPdfViewer from "./pages/DownloadPdfViewer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // Setup Routes

  const routes = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <LoginVerify />,
      path: "/auth/success/",
    },

    {
      element: <Home />,
      path: "/",
    },
    {
      element: (
        <ProtectedRoutes>
          <Subject />
        </ProtectedRoutes>
      ),
      path: "/subject/:subjectId",
    },
    {
      element: (
        <ProtectedRoutes>
          <PdfViewer />
        </ProtectedRoutes>
      ),
      path: "/pdf/:id",
    },
    {
      element: (
        <ProtectedRoutes>
          <AllSubject />
        </ProtectedRoutes>
      ),
      path: "/all-subjects",
    },
    {
      element: (
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      ),
      path: "/profile",
    },
    // {
    //   path: "/bookmark",
    //   element: <Bookmark />,
    // },
    {
      path: "/search",
      element: (
        <ProtectedRoutes>
          <Search />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/download/subject/:subjectId",
      element: <DownloadSubject />,
    },
    {
      element: <DownloadPdfViewer />,
      path: "/download/pdf",
    },

    {
      element: (
        <AdminProtected>
          <Admin />
        </AdminProtected>
      ),
      path: "/admin/:page",
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <PWAInstallProvider>
        <RouterProvider router={routes} />
      </PWAInstallProvider>
    </QueryClientProvider>
  );
}

export default App;
