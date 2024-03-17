import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Login from '../features/Users/Login.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';
import Register from '../features/Users/Register.tsx';
import Container from '../features/Сontainer/Container.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Container />,
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
