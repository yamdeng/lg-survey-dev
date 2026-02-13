import { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { Button } from 'antd';

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
  StickyNote,
  Globe,
} from 'lucide-react';

import AppButton from '@/publish/components/common/AppButton';
import AppSelect from '@/publish/components/common/AppSelect';

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name: index + 1,
    name2: index + 1,
    name3: 'AA000002',
    name4: '객관식(단일선택)',
    name5: '한국어',
    name6: '구성원 비전 인식',
    name7: '다음은 회사와 구성원의 꿈과 열정에 관련된 문항입니다.',
    name8: '선택',
    name9: '1. 매우그렇다 2. 그렇다 3. 보통이다 4. 아니다 5. 매우 아니다',
  });
}

const CommonInfo = () => {
  const [form] = Form.useForm();

  const [columns] = useState<any>([
    { field: 'name', headerName: '페이지', width: 70, cellStyle: { textAlign: 'center' } },
    { field: 'name2', headerName: '순서', width: 60, cellStyle: { textAlign: 'center' } },
    { field: 'name3', headerName: '문항키', width: 98, cellStyle: { textAlign: 'center' } },
    { field: 'name4', headerName: '문항유형', width: 140, cellStyle: { textAlign: 'center' } },
    { field: 'name5', headerName: '언어', width: 100, cellStyle: { textAlign: 'center' } },
    { field: 'name6', headerName: '문항제목', width: 160 },
    { field: 'name7', headerName: '문항내용', width: 400 },
    { field: 'name8', headerName: '보기', width: 60, cellStyle: { textAlign: 'center' } },
    { field: 'name9', headerName: '보기내용', width: 400 },
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
                <a href="#">Common Info</a>
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
            <h3 className="title-text">Common Info</h3>
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
                    width={200}
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
                    placeholder="설문선택"
                    label="설문"
                    icon={<FilePen />}
                    // defaultValue="설문조사"
                    id="iqSurvey"
                    name="iqSurvey"
                    width={280}
                    options={[
                      { label: '2025 국내 사무직 설문조사', value: 'sv001' },
                      { label: '2025 국외 사무직 설문조사', value: 'sv002' },
                    ]}
                  />
                  <AppSelect
                    placeholder="선택"
                    label="페이지"
                    icon={<StickyNote />}
                    // defaultValue="0"
                    id="iqPage"
                    name="iqPage"
                    width={80}
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                      { label: '5', value: '5' },
                      { label: '6', value: '6' },
                    ]}
                  />
                  <AppSelect
                    placeholder="언어선택"
                    label="언어"
                    icon={<Globe />}
                    // defaultValue="1"
                    id="iqLang"
                    name="iqLang"
                    width={120}
                    options={[
                      { label: '한국어', value: 'ko' },
                      { label: '영어', value: 'en' },
                      { label: '중국어', value: 'ch' },
                      { label: '일본', value: 'jp' },
                    ]}
                  />
                </div>

                <AppButton icon={<Search size={18} />} value="조회" />
              </Form>
            </div>

            <div className="grid-block">
              <div className="grid-block-header">
                <div className="content-title">
                  <ClipboardList size={18} />
                  <h3 className="title-text">Common List</h3>
                  {/* 게시판 전체 데이터 건수 */}
                  <small className="num">( 973 )</small>
                </div>
                <div className="btn-group-end">
                  <AppButton icon={<Download size={14} />} size="small" value="" />
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
                      tooltipShowDelay={100}
                      tooltipHideDelay={1000}
                      tooltipMouseTrack={true}
                      enableBrowserTooltips={false}
                      headerHeight={40}
                      // pagination={true} // 퍼블 페이징 화면출력 삭제
                    />
                  </div>
                </div>
              </div>
              <div className="btn-group-end">
                <AppButton
                  icon={<Search size={20} />}
                  size="large"
                  theme="secondary"
                  value="미리보기"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommonInfo;
