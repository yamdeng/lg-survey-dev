import { Button } from 'antd';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import CompanyNameSelect from '@/publish/components/formItem/CompanyNameSelect';
import ClassifySelect from '@/publish/components/formItem/ClassifySelect';

import SurveySelect from '@/publish/components/formItem/SurveySelect';
import YearSelect from '@/publish/components/formItem/YearSelect';

import HeaderMenu from '@/publish/components/headerMenu';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import { Form } from 'antd';

import { Home, Download, Search, FilePenLine, ClipboardList } from 'lucide-react';

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name: '12345678' + (index + 1),
    name2: '국내 사무직',
    name3: 'LG 테스트 회사명',
    name4: '2025 LG Way 설문 (국내사무직)',
    name5: '2025',
    name6: '2025.01.01',
    name7: '2025.12.01',
    name8: '확정',
  });
}

const LangugeInfo = () => {
  const [form] = Form.useForm();

  const [columns] = useState<any>([
    { field: 'name', headerName: '설문코드', width: 150, align: 'center' },
    { field: 'name2', headerName: '구분', width: 200 },
    { field: 'name3', headerName: '회사', width: 300 },
    { field: 'name4', headerName: '설문명', width: 400 },
    { field: 'name5', headerName: '대상년도', width: 100, align: 'center' },
    { field: 'name6', headerName: '시작일자', width: 100, align: 'center' },
    { field: 'name7', headerName: '종료일자', width: 100, align: 'center' },
    { field: 'name8', headerName: '확정여부', width: 100, align: 'center' },
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
                <div className="form-inline">
                  <YearSelect /> {/* 년도 */}
                  <CompanyNameSelect /> {/* 회사명 */}
                  <ClassifySelect /> {/* 구분 */}
                  <SurveySelect /> {/* 설문 */}
                </div>

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
                  <h3 className="title-text">Survey Info</h3>
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
                      pagination={false}
                      tooltipShowDelay={100}
                      tooltipHideDelay={1000}
                      tooltipMouseTrack={true}
                      enableBrowserTooltips={false}
                    />
                  </div>

                  <div className="pagination">
                    <a className="first" href="">
                      <span className="sr-only">이전</span>
                    </a>
                    <a className="prev" href="">
                      <span className="sr-only">이전</span>
                    </a>
                    <span>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageIndex) => {
                        const pageComponent = (
                          <a href="" key={pageIndex}>
                            {pageIndex}
                          </a>
                        );
                        return pageComponent;
                      })}
                    </span>
                    <a className="next" href="">
                      <span className="sr-only">다음</span>
                    </a>
                    <a className="last" href="">
                      <span className="sr-only">다음</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="btn-group-end">
                <Button
                  // color="primary"
                  // variant="outlined"
                  type="primary"
                  icon={<Search />}
                  iconPlacement="end"
                  size="large"
                >
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

export default LangugeInfo;
