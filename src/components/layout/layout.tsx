import { Outlet } from 'react-router-dom';

import Header from '../header/header';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
