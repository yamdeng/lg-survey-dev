import React from 'react';
import { Link, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  // 현재 경로와 일치하는 모든 라우트 매치 정보를 가져옵니다.
  const matches = useMatches();
  // 각 라우트 객체의 handle 속성에 정의된 breadcrumb 데이터를 추출합니다.
  const breadcrumbs = matches
    .filter((match) => Boolean((match.handle as any)?.breadcrumb))
    .map((match) => {
      const handle = match.handle as any;
      return {
        label: handle.breadcrumb(match.data), // 함수형태로 정의하여 데이터 전달 가능
        path: match.pathname,
      };
    })
    .slice(1);

  if (breadcrumbs.length === 0) return null;

  return (
    <>
      {breadcrumbs.map((crumb, index) => (
        <dd key={crumb.path}>
          <Link to={crumb.path}>{crumb.label}</Link>
          {index < breadcrumbs.length - 1 && ' / '}
        </dd>
      ))}
    </>
  );
};
export default Breadcrumb;
