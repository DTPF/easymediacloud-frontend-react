import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { aAdmin, aContent, aHome, aUsers, routes } from "./paths";
// LAYOUTS
const BasicLayout = lazy(() => import('views/layouts/layoutBasic'));
const AdminLayout = lazy(() => import('views/layouts/layoutAdmin'));
// BASIC PAGES
const HomeBasic = lazy(() => import('views/pages/basic/home'));
const MyAccountBasic = lazy(() => import('views/pages/basic/myAccount'));
// ADMIN PAGES
const HomeAdmin = lazy(() => import('views/pages/admin/home'));
const ContentAdmin = lazy(() => import('views/pages/admin/content'));
const UsersAdmin = lazy(() => import('views/pages/admin/users'));
// MESSAGES PAGES
const Error404 = lazy(() => import('views/pages/errors/Error404'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<></>}><BasicLayout /></Suspense>,
    children: [
      {
        path: routes.home,
        element: <Suspense fallback={<></>}><HomeBasic /></Suspense>,
      },
      {
        path: routes.myAccount,
        element: <Suspense fallback={<></>}><MyAccountBasic /></Suspense>
      },
      {
        path: aAdmin,
        element: <Suspense fallback={<></>}><AdminLayout /></Suspense>,
        children: [
          {
            path: aHome,
            element: <Suspense fallback={<></>}><HomeAdmin /></Suspense>,
          },
          {
            path: aContent,
            element: <Suspense fallback={<></>}><ContentAdmin /></Suspense>
          },
          {
            path: aUsers,
            element: <Suspense fallback={<></>}><UsersAdmin /></Suspense>,
          },
          {
            path: "*",
            element: <Suspense fallback={<></>}><Error404 /></Suspense>
          }
        ],
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><Error404 /></Suspense>
      }
    ],
  },
]);

export default router;