import { Outlet } from 'react-router-dom';

export default function GuideLayout() {
  return (
    <>
      <div className="survey">
        <div className="sv-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
