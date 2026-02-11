import { Button } from 'antd';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import HeaderMenu from '@/publish/components/headerMenu';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import { Form } from 'antd';

import {
  Home,
  Download,
  Search,
  FilePenLine,
  ClipboardList,
  Plus,
  CalendarDays,
  FileInput,
  FilePen,
  Building2,
} from 'lucide-react';

import AppSelect from '@/publish/components/comform/AppSelect';

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

const LanguageInfo = () => {
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
            <h3 className="title-text">Language Info</h3>
          </div>

          <div className="content-body">
            <div className="form-block">
              <Form form={form}>
                <div className="form-inline">
                  <AppSelect
                    placeholder="년도"
                    label="년도"
                    icon={<CalendarDays />}
                    required
                    defaultValue="2026"
                    id="iqYear"
                    name="iqYear"
                    width={80}
                    options={[
                      { label: '2021', value: '2021' },
                      { label: '2022', value: '2022' },
                      { label: '2023', value: '2023' },
                      { label: '2024', value: '2024' },
                      { label: '2025', value: '2025' },
                      { label: '2026', value: '2026' },
                    ]}
                  />
                  <AppSelect
                    placeholder="회사명"
                    label="회사명"
                    icon={<Building2 />}
                    required
                    defaultValue="LG CNS"
                    id="iqCmpny"
                    name="iqCmpny"
                    width={160}
                    options={[
                      { label: 'LG CNS', value: 'cp01' },
                      { label: 'LG 전자', value: 'cp02' },
                      { label: 'LG 123', value: 'cp03' },
                      { label: 'LG 1234', value: 'cp04' },
                      { label: 'LG 1235', value: 'cp05' },
                      { label: 'LG 1236', value: 'cp06' },
                    ]}
                  />
                  <AppSelect
                    placeholder="처리상태"
                    label="처리상태"
                    icon={<FileInput />}
                    required
                    defaultValue="설문 생성"
                    id="iqStatus"
                    name="iqStatus"
                    width={140}
                    options={[
                      { label: '설문 생성', value: '설문 생성' },
                      { label: '설문 작성 중', value: '설문 작성 중' },
                      { label: '설문 종료', value: '설문 종료' },
                    ]}
                  />
                  <AppSelect
                    placeholder="설문"
                    label="설문"
                    icon={<FilePen />}
                    required
                    defaultValue="설문조사"
                    id="iqSurvey"
                    name="iqSurvey"
                    width={280}
                    options={[
                      { label: '2025 국내 사무직 설문조사', value: 'sv001' },
                      { label: '2025 국외 사무직 설문조사', value: 'sv002' },
                    ]}
                  />
                </div>

                <Button htmlType="submit" type="primary" icon={<Search size={18} />}>
                  조회
                </Button>
              </Form>
            </div>

            <div className="grid-block">
              <div className="grid-block-header">
                <div className="content-title">
                  <ClipboardList size={18} />
                  <h3 className="title-text">Language Info</h3>
                </div>
                <div className="btn-group-end">
                  <Button type="primary" size="middle" icon={<Download size={18} />} />
                </div>
              </div>

              <div className="grid-block-body">
                <div className="ag-grid">
                  <div className={'ag-theme-quartz'} style={{ height: 400 }}>
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
                      headerHeight={40}
                    />
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

export default LanguageInfo;
