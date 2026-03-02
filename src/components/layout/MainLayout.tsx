import TopHeader from './TopHeader';
import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import ErrorBoundary from '@/components/ErrorBoundary';

function MainLayout() {
  return (
    <>
      <div className="survey">
        <LeftMenu />
        <div className="sv-content">
          <TopHeader />
          {/* 콘텐츠 영역(Outlet)에서 발생하는 에러만 여기서 잡아냅니다 */}
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
