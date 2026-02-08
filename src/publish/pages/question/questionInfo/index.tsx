import { Button } from 'antd';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import ClassifySelect from '@/publish/components/formItem/ClassifySelect';
import CompanyNameSelect from '@/publish/components/formItem/CompanyNameSelect';
import LanguageSelect from '@/publish/components/formItem/LanguageSelect';
import PageSelect from '@/publish/components/formItem/PageSelect';
import SurveySelect from '@/publish/components/formItem/SurveySelect';
import YearSelect from '@/publish/components/formItem/YearSelect';
import HeaderMenu from '@/publish/components/headerMenu';

import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import { Form } from 'antd';

import { Home, Download, Search, FilePenLine, ClipboardList } from 'lucide-react';

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name: index + 1,
    name2: index + 1,
    name3: 'AA000002',
    name4: '객관식(단일선택)',
    name5: '영어',
    name6: '구성원 비전 인식',
    name7: '다음은 회사와 구성원의 꿈과 열정에 관련된 문항입니다.',
    name8: '선택',
    name9: '1. 매우그렇다 2. 그렇다 3. 보통이다 4. 아니다 5. 매우 아니다',
  });
}

const QuestionInfo = () => {
  const [form] = Form.useForm();

  const [columns] = useState<any>([
    { field: 'name', headerName: '페이지', width: 70, align: 'center' },
    { field: 'name2', headerName: '순서', width: 60 },
    { field: 'name3', headerName: '문항키', width: 94 },
    { field: 'name4', headerName: '문항유형', width: 150 },
    { field: 'name5', headerName: '언어', width: 100, align: 'center' },
    { field: 'name6', headerName: '문항제목', width: 160, align: 'center' },
    { field: 'name7', headerName: '문항내용', width: 400, align: 'center' },
    { field: 'name8', headerName: '보기', width: 60, align: 'center' },
    { field: 'name9', headerName: '보기내용', width: 400, align: 'center' },
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
                <a href="#">Question</a>
              </dd>
              <dd>
                <a href="#">Question Info</a>
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
            <h3 className="title-text">Menu03-sub02 Title : Question Info</h3>
          </div>

          <div className="content-body">
            <div className="form-block">
              <Form form={form}>
                <div className="form-inline">
                  <YearSelect /> {/* 년도 */}
                  <CompanyNameSelect /> {/* 회사명 */}
                  <ClassifySelect /> {/* 구분 */}
                  <SurveySelect /> {/* 설문 */}
                  <PageSelect /> {/* 페이지 */}
                  <LanguageSelect /> {/* 언어 */}
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
                  <h3 className="title-text">Question Info</h3>
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
                  color="primary"
                  variant="outlined"
                  // type="primary"
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

export default QuestionInfo;
