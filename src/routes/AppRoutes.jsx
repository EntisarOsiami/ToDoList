import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from '../pages/HomePage';
import Layout from '../layout/Layout';

function AppRoutes() {
  const AppRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [{
        path: '/',
        element: <HomePage />,
      }],
    },
  ]);

  return (
    <RouterProvider router={AppRoutes} />
  );
}

export default AppRoutes;
