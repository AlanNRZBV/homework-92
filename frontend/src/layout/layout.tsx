import { Outlet } from 'react-router-dom';
import Navigation from '../components/UI/Navigation/Navigation.tsx';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Layout;
