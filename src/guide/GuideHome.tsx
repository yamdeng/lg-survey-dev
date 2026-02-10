import { DevRoutes, PublishRoutes } from '@/routes/GuideRoutes';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CommonRouteTable from './CommonRouteTable';

function PublishHome() {
  const [searchParams] = useSearchParams();
  const [tabIndex, setTabIndex] = useState(() => {
    const urlTabIndex = searchParams.get('tabIndex');
    return urlTabIndex ? Number(urlTabIndex) : 1;
  });

  const [keyword, setKeyword] = useState('');
  const [checkedNewTab, setCheckedNewTab] = useState(false);
  const navigate = useNavigate();

  const changeTabIndex = (tabIndex) => {
    setTabIndex(tabIndex);
    setKeyword('');
    navigate(`/?tabIndex=${tabIndex}`, { replace: true });
  };

  let contentComponent = (
    <CommonRouteTable
      moduleDirectoryPath="publish/"
      pageList={PublishRoutes.list}
      keyword={keyword}
      checkedNewTab={checkedNewTab}
    />
  );
  if (tabIndex === 1) {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="publish/"
        pageList={PublishRoutes.list}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (tabIndex === 2) {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="dev/"
        pageList={DevRoutes.list}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  }

  const changeKeyword = (event) => {
    const value = event.target.value;
    setKeyword(value);
  };

  const changeNewTab = (event) => {
    const checked = event.target.checked;
    setCheckedNewTab(checked);
  };

  return (
    <>
      <div className="publish-app tab">
        <button className={tabIndex === 1 ? 'active' : ''} onClick={() => changeTabIndex(1)}>
          퍼블리싱
        </button>
        <button className={tabIndex === 2 ? 'active' : ''} onClick={() => changeTabIndex(2)}>
          개발가이드
        </button>
      </div>
      <div style={{ padding: 10, marginBottom: 10 }}>
        이름/파일명 :{' '}
        <input
          style={{ padding: 5, border: '1px solid black' }}
          value={keyword}
          onChange={changeKeyword}
        />
        새탭 <input type="checkbox" checked={checkedNewTab} onChange={changeNewTab} />
      </div>
      {contentComponent}
    </>
  );
}

export default PublishHome;
