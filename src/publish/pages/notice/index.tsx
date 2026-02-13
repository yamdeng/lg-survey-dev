import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HeaderMenu from '@/publish/components/headerMenu';

import { Home, Search, FilePenLine, ClipboardList, Paperclip } from 'lucide-react';

import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import AppSearchInput from '@/publish/components/common/AppSearchInput';
import AppSelect from '@/publish/components/common/AppSelect';

interface DataType {
  key: React.Key;
  name: string;
  title: string;
  content: string;
}

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name1: index + 1,
    name2: '국내 사무직',
    name3: 'LG 팀장',
    name4: '2025.01.01',
    name5: '25',
  });
}

const Notice = () => {
  const [columns] = useState<any>([
    {
      field: 'name1',
      headerName: ``,
      headerComponent: () => <Paperclip size={14} style={{ marginLeft: 5 }} />,
      width: 60,
      cellStyle: { textAlign: 'center' },
    },
    { field: 'name2', headerName: '제목', width: 400 },
    { field: 'name3', headerName: '게시자', width: 120, cellStyle: { textAlign: 'center' } },
    { field: 'name4', headerName: '수정일', width: 100, cellStyle: { textAlign: 'center' } },
    { field: 'name5', headerName: '조회수', width: 100, cellStyle: { textAlign: 'center' } },
  ]);

  return (
    <>
      <header className="content-header">
        <FlexBox className="content-inner" justify={'space-between'}>
          <div className="bread-crumb">
            <dl className="bread-crumb-list">
              <dt>
                <a href="/">
                  <Home size={16} />
                </a>
              </dt>
              <dd>
                <a href="#">Notice</a>
              </dd>
            </dl>
          </div>
          <HeaderMenu />
        </FlexBox>
      </header>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">Notice</h3>
          </div>

          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppSelect
                    placeholder="제목+내용"
                    // defaultValue="opt-3" // defaultValue 기본값 입력시 에러남
                    id="iqSelect"
                    name="iqSelect"
                    width={140}
                    options={[
                      { label: '제목', value: 'opt-1' },
                      { label: '내용', value: 'opt-2' },
                      { label: '제목 + 내용', value: 'opt-3' },
                    ]}
                  />
                  <AppSearchInput
                    placeholder="검색하세요"
                    width={400}
                    id="iqSearch"
                    name="iqSearch"
                    hiddenSearchButton={false}
                  />
                </div>
              </form>
            </div>

            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <div className={'ag-theme-quartz'} style={{ height: 400 }}>
                    <AgGridReact
                      rowModelType="clientSide"
                      suppressMultiSort={true}
                      domLayout={'normal'}
                      rowData={rowData}
                      columnDefs={columns}
                      // pagination={true} // 퍼블 페이징 화면출력 삭제
                      tooltipShowDelay={100}
                      tooltipHideDelay={1000}
                      tooltipMouseTrack={true}
                      enableBrowserTooltips={false}
                      headerHeight={40}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Notice;
