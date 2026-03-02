import TopHeader from './TopHeader';
import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';

function MainLayout() {
  return (
    <>
      <div className="survey">
        <LeftMenu />
        <div className="sv-content">
          <TopHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
