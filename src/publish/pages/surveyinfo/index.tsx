import { Button } from 'antd';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

// Form

import HeaderMenu from '@/publish/components/header/HeaderMenu';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import { Form } from 'antd';

import { Home, Download, Search, FilePenLine, ClipboardList } from 'lucide-react';

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name1: '2025W39' + (index + 1),
    name2: '국내 사무직',
    name3: 'LG WAY',
    name4: 'LG CNS 테스트 회사명',
    name5: '2025 LG Way 설문 시연 테스트',
    name6: '2025',
    name7: '2025.01.01',
    name8: '2025.12.01',
    name9: '설문 작성 중',
  });
}

const SurveyInfo = () => {
  const [form] = Form.useForm();

  const [columns] = useState<any>([
    { field: 'name1', headerName: '설문코드', width: 100, align: 'center' },
    { field: 'name2', headerName: '구분', width: 140 },
    { field: 'name3', headerName: '설문유형', width: 120 },
    { field: 'name4', headerName: '회사', width: 160 },
    { field: 'name5', headerName: '설문명', width: 320 },
    { field: 'name6', headerName: '대상년도', width: 80, align: 'center' },
    { field: 'name7', headerName: '시작일자', width: 100, align: 'center' },
    { field: 'name8', headerName: '종료일자', width: 100, align: 'center' },
    { field: 'name9', headerName: '상태', width: 100, align: 'center' },
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
                <a href="#">Edition</a>
              </dd>
              <dd>
                <a href="#">Language Info</a>
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
            <h3 className="title-text">Menu02-sub02 Title : Languge Info</h3>
          </div>

          <div className="content-body">
            <div className="form-block">
              <Form form={form}>
                <div className="form-inline"></div>

                <Button
                  htmlType="submit"
                  // color="primary"
                  // variant="outlined"
                  type="primary"
                  icon={<Search size={18} />}
                >
                  조회
                </Button>
              </Form>
            </div>

            <div className="grid-block">
              <div className="grid-block-header">
                <div className="content-title">
                  <ClipboardList size={18} />
                  <h3 className="title-text">Survey List</h3>
                </div>
                <div className="btn-group-end">
                  <Button type="primary" size="middle" icon={<Download size={18} />} />
                </div>
              </div>

              <div className="grid-block-body">
                <div className="ag-grid">
                  <div className={'ag-theme-quartz'} style={{ height: 500 }}>
                    <AgGridReact
                      rowModelType="clientSide"
                      suppressMultiSort={true}
                      domLayout={'normal'}
                      rowData={rowData}
                      columnDefs={columns}
                      pagination={true}
                      tooltipShowDelay={100}
                      tooltipHideDelay={1000}
                      tooltipMouseTrack={true}
                      enableBrowserTooltips={false}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-group-end">
                <Button type="primary" icon={<Search />} iconPlacement="end" size="large">
                  미리보기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SurveyInfo;
