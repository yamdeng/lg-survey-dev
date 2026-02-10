import { Outlet } from 'react-router-dom';

export default function GuideLayout() {
  return (
    <div>
      <p>TOP</p>
      <div>
        <Outlet />
      </div>
      <p>BOTTOM</p>
    </div>
  );
}
