import { Link, useMatches, useNavigate } from 'react-router-dom';

import FlexBox from '@/components/common/ui/FlexBox';
import HeaderRight from '@/components/layout/HeaderRight';

import { House } from 'lucide-react';

const TopHeader = () => {
  const matches: any = useMatches();

  const navigate = useNavigate();

  // MainRouter에 해당하는 경로 추출 : handle.breadcrumbName
  const matcheRouters = matches
    .filter((match) => match.handle?.breadcrumbName)
    .map((match) => {
      return {
        path: match.pathname,
        label: match.handle?.breadcrumbName,
        isLink: match.handle?.isLink,
      };
    });

  return (
    <header className="content-header">
      <FlexBox className="content-inner" justify={'space-between'}>
        <div className="bread-crumb">
          <dl className="bread-crumb-list">
            <dt
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/');
              }}
            >
              <House />
            </dt>
            {matcheRouters.map((crumb) => (
              <dd key={crumb.path}>
                {crumb.isLink ? (
                  <Link to={crumb.path}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </dd>
            ))}
          </dl>
        </div>
        <HeaderRight />
      </FlexBox>
    </header>
  );
};

export default TopHeader;
