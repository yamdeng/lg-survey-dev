import { Route } from 'react-router-dom';
import { PublishRoutes, DevRoutes } from '@/routes/GuideRoutes';
import GuideLayout from '@/guide/GuideLayout';

export const usePublishRoute = () => {
  const routes = (
    <>
      {PublishRoutes.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component />} />;
      })}
    </>
  );

  return (
    <Route path="/publish" element={<GuideLayout />}>
      {routes}
    </Route>
  );
};

export const useDevRoute = () => {
  const routes = (
    <>
      {DevRoutes.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component />} />;
      })}
    </>
  );

  return (
    <Route path="/dev" element={<GuideLayout />}>
      {routes}
    </Route>
  );
};
