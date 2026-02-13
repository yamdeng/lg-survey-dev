import { AgGridReact } from 'ag-grid-react';
import { Button } from 'antd';
import { useState } from 'react';

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
  Building2,
} from 'lucide-react';

// Form Components
import AppButton from '@/publish/components/common/AppButton';
import AppSelect from '@/publish/components/common/AppSelect';
import AppTextInput from '@/publish/components/common/AppTextInput';
import AppCheckboxGroup from '@/publish/components/common/AppCheckboxGroup';
import AppRangeDatePicker from '@/publish/components/common/AppRangeDatePicker';

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name1: '2025W39' + (index + 1), // link -> modify-table
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
  const [columns] = useState<any>([
    { field: 'name1', headerName: '설문코드', width: 120, cellStyle: { textAlign: 'center' } },
    { field: 'name2', headerName: '구분', width: 140, cellStyle: { textAlign: 'center' } },
    { field: 'name3', headerName: '설문유형', width: 120 },
    { field: 'name4', headerName: '회사', width: 220 },
    { field: 'name5', headerName: '설문명', width: 400 },
    { field: 'name6', headerName: '대상년도', width: 90, cellStyle: { textAlign: 'center' } },
    { field: 'name7', headerName: '시작일자', width: 100, cellStyle: { textAlign: 'center' } },
    { field: 'name8', headerName: '종료일자', width: 100, cellStyle: { textAlign: 'center' } },
    { field: 'name9', headerName: '상태', width: 120, cellStyle: { textAlign: 'center' } },
  ]);

  // 퍼블 화면 출력 용
  const CompanyOptions = [
    { label: '전제', value: 'All' },
    { label: 'LG 전자', value: 'E10001' },
    { label: 'LG 마그나', value: 'E10002' },
    { label: 'LG 디스플레이', value: 'E10003' },
    { label: 'LG 이노텍', value: 'E10004' },
    { label: 'LG 하이프라자', value: 'E10005' },
    { label: 'LG 하이엠솔루텍', value: 'E10006' },
    { label: 'LG 하이텔레서비스', value: 'E10007' },
    { label: 'LG 하이케어솔루션', value: 'E10008' },
    { label: 'LG 화학', value: 'E10009' },
    { label: 'LG 에너지솔루션', value: 'E100010' },
    { label: 'LG 팜한농', value: 'E100011' },
    { label: 'LG 비바웨이브', value: 'E100012' },
    { label: 'LG 생활건강', value: 'E100013' },
    { label: 'LG 코카콜라음료', value: 'E100014' },
    { label: 'LG 태극제약', value: 'E100015' },
    { label: 'LG F & M', value: 'E100016' },
    { label: 'LG 한국음료', value: 'E100017' },
    { label: 'LG 해태 HTB', value: 'E100018' },
    { label: 'LG GSI', value: 'E100019' },
    { label: 'LG 에버라이프', value: 'E100020' },
    { label: 'LG FMG', value: 'E100021' },
    { label: 'LG 유블러스', value: 'E100022' },
    { label: 'LG 씨에스리더', value: 'E100023' },
    { label: 'LG 아인텔레서비스', value: 'E100024' },
    { label: 'LG 헬로비젼', value: 'E100025' },
    { label: 'LG 데이콤크로싱', value: 'E100026' },
    { label: 'LG 미디어로그', value: 'E100027' },
    { label: 'LG 씨에스원파트너', value: 'E100028' },
    { label: 'LG CNS', value: 'E100029' },
    { label: 'LG 유플러스홈서비스', value: 'E100030' },
    { label: 'LG 위드유', value: 'E100031' },
    { label: 'LG SYSGRP', value: 'E100032' },
    { label: 'LG 비즈테크아이', value: 'E100033' },
    { label: 'LG 비즈테크온', value: 'E100034' },
    { label: 'LG D & O', value: 'E100035' },
    { label: 'LG D & O CM', value: 'E100036' },
    { label: 'LG HSAD', value: 'E100037' },
    { label: 'LG 사이언스파크', value: 'E100038' },
    { label: 'LG 스포츠', value: 'E100039' },
    { label: 'LG (주)', value: 'E100040' },
    { label: 'LG 인화원', value: 'E100041' },
    { label: 'LG 경영연구원', value: 'E100042' },
    { label: 'LG 글로벌 전략개발원', value: 'E100043' },
    { label: 'AI 연구원', value: 'E100044' },
    { label: 'LG 재단', value: 'E100045' },
  ];

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
                <a href="#">Survey Info</a>
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
            <h3 className="title-text">Survey Info</h3>
          </div>

          <div className="content-body">
            <div className="form-block">
              <Form>
                <div className="form-inline">
                  <AppSelect
                    value="2026"
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
                    value="cp01"
                    label="회사명"
                    icon={<Building2 />}
                    id="iqCmpny"
                    name="iqCmpny"
                    width={200}
                    options={[
                      { label: 'LG CNS', value: 'cp01' },
                      { label: 'LG 전자', value: 'cp02' },
                      { label: 'LG 123', value: 'cp03' },
                      { label: 'LG 1234', value: 'cp04' },
                      { label: 'LG 1235', value: 'cp05' },
                      { label: 'LG 글로벌 전략 개발원', value: 'cp06' },
                    ]}
                  />
                  <AppSelect
                    value="설문 생성"
                    label="처리상태"
                    icon={<FileInput />}
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
                </div>

                <AppButton icon={<Search size={18} />} value="조회" />
              </Form>
            </div>

            <div className="grid-block">
              <div className="grid-block-header">
                <div className="content-title">
                  <ClipboardList size={18} />
                  <h3 className="title-text">Survey List</h3>
                  {/* 게시판 전체 데이터 건수 */}
                  <small className="num">( 113 )</small>
                </div>
                <div className="btn-group-end">
                  <AppButton icon={<Download size={14} />} size="small" value="" />
                </div>
              </div>

              <div className="grid-block-body">
                <div className="ag-grid">
                  <div style={{ height: 300 }}>
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

              <div className="grid-block-modify">
                <table className="modify-table">
                  <colgroup>
                    <col width="12%" />
                    <col width="30%" />
                    <col width="12%" />
                    <col width="46%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="year" className="required">
                          대상년도
                        </label>
                      </th>
                      <td>
                        <AppTextInput name="year" value="2025" />
                      </td>
                      <th>
                        <label htmlFor="survey" className="required">
                          설문유형
                        </label>
                      </th>
                      <td>
                        <AppSelect
                          id="survey"
                          width={274}
                          value="LG WAY"
                          // disabled={true}
                          options={[
                            { label: 'LG WAY 1', value: 'LG01' },
                            { label: 'LG WAY 2', value: 'LG02' },
                            { label: 'LG WAY 3', value: 'LG03' },
                          ]}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="code" className="required">
                          설문코드
                        </label>
                      </th>
                      <td>
                        <AppTextInput id="code" name="code" value="2025W394" readOnly />
                      </td>
                      <th>
                        <label htmlFor="survey" className="required">
                          상위코드
                        </label>
                      </th>
                      <td>
                        <AppTextInput id="code2" name="code2" value="2025U0052" readOnly />
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={4}>
                        <label htmlFor="comp">회 사</label>
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <AppCheckboxGroup name="cmpnyCd" options={CompanyOptions} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="test" className="required">
                          구분
                        </label>
                      </th>
                      <td>
                        <AppSelect
                          id="classify"
                          width={274}
                          value="국내 사무직"
                          // disabled={true}
                          options={[
                            { label: '국내 사무직', value: 'LG01' },
                            { label: '국외 사무직', value: 'LG02' },
                            { label: '국내 현장직', value: 'LG03' },
                            { label: '국외 현장직', value: 'LG04' },
                          ]}
                        />
                      </td>
                      <th>
                        <label htmlFor="surveyName" className="required">
                          설문명
                        </label>
                      </th>
                      <td>
                        <AppTextInput
                          id="surveyName"
                          name="surveyName"
                          value="설문 시연 테스트"
                          width={'96%'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="svdate" className="required">
                          설문 일자
                        </label>
                      </th>
                      <td>
                        <AppRangeDatePicker
                          id="svdate"
                          name="svdate"
                          defaultValue="20151125"
                          width={274}
                        />
                      </td>
                      <th>
                        <label htmlFor="svdate2" className="required">
                          결과조회 일자
                        </label>
                      </th>
                      <td>
                        <AppRangeDatePicker
                          id="svdate2"
                          name="svdate2"
                          defaultValue="20151225"
                          width={274}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="btn-group-end">
                <AppButton icon={<Plus size={20} />} size="large" value="신규" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SurveyInfo;
