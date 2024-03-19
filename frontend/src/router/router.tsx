import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Login from '../features/Users/Login.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';
import Register from '../features/Users/Register.tsx';
import CustomContainer from '../features/Сontainer/CustomContainer.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CustomContainer />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
