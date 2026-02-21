import React from 'react';
import { Outlet, Link, useMatches, useLocation } from 'react-router-dom';
import { Router, RouteHandle } from '@/publish/Router';

import HeaderMenu from '@/publish/components/header/HeaderMenu';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';

import { House, Laptop, Files, FileText } from 'lucide-react';

interface MyHandle {
  breadcrumbName?: string;
}

const Header = () => {
  const matches = useMatches();
  // 2. 브레드크럼 아이템 생성 로직 - handle에 breadcrumbName이 정의된 라우트만 추출
  const crumbs = matches
    .filter((match) => (match.handle as MyHandle)?.breadcrumbName)
    .map((match) => ({
      path: match.pathname,
      label: (match.handle as MyHandle).breadcrumbName,
    }));

  return (
    <header className="content-header">
      <FlexBox className="content-inner" justify={'space-between'}>
        <div className="bread-crumb">
          <dl className="bread-crumb-list">
            <dt>
              <House />
            </dt>
            {/* //  map을 통해 개별 객체의 label에 접근 */}
            {crumbs.map((crumb) => (
              <dd key={crumb.path}>
                <Link to={crumb.path}>{crumb.label}</Link>
              </dd>
            ))}
          </dl>
        </div>
        <HeaderMenu />
      </FlexBox>
    </header>
  );
};

export default Header;
