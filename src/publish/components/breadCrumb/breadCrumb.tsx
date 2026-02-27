import React from 'react';
import { Link, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => Boolean((match.handle as any)?.breadcrumb))
    .map((match) => {
      const handle = match.handle as any;
      return {
        label: handle.breadcrumb(match.data),
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
