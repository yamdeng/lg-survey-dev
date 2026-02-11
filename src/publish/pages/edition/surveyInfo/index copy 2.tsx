import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, themeAlpine, colorSchemeLight } from 'ag-grid-community';
import { Button, DatePicker } from 'antd';
import { useState } from 'react';

const { RangePicker } = DatePicker;

// Form
import CompanyNameSelect from '@/publish/components/formItem/CompanyNameSelect';
import YearSelect from '@/publish/components/formItem/YearSelect';
import StatusSelect from '@/publish/components/formItem/StatusSelect';

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
} from 'lucide-react';

import AppSearchInput from '@/publish/components/comform/AppSearchInput';
import AppSelect from '@/publish/components/comform/AppSelect';

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
  // const [form] = Form.useForm();

  const [columns] = useState<any>([
    { field: 'name1', headerName: '설문코드', width: 100 },
    { field: 'name2', headerName: '구분', width: 120 },
    { field: 'name3', headerName: '설문유형', width: 120 },
    { field: 'name4', headerName: '회사', width: 200 },
    { field: 'name5', headerName: '설문명', width: 320 },
    { field: 'name6', headerName: '대상년도', width: 90 },
    { field: 'name7', headerName: '시작일자', width: 100 },
    { field: 'name8', headerName: '종료일자', width: 100 },
    { field: 'name9', headerName: '상태', width: 120 },
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
                  <YearSelect /> {/*  // 년도 iqYear */}
                  <CompanyNameSelect /> {/*  // 회사명 iqCmpny */}
                  <StatusSelect /> {/*   // 처리상태 iqStatus */}
                  <AppSearchInput
                    placeholder="placeholder"
                    label="label text"
                    icon={<CalendarDays />}
                    required
                    defaultValue="defaultValue"
                    id="idTest"
                    name="nameText"
                    width={200}
                  />
                  <AppSelect
                    placeholder="placeholder"
                    label="label text"
                    icon={<CalendarDays />}
                    required
                    defaultValue="defaultValue"
                    id="idTest2"
                    name="nameText2"
                    width={160}
                  />
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
                  <h3 className="title-text">Survey List</h3>
                  {/* 게시판 전체 데이터 건수 */}
                  <small className="num">( 113 )</small>
                </div>
                <div className="btn-group-end">
                  <Button type="primary" size="middle" icon={<Download size={18} />} />
                </div>
              </div>

              <div className="grid-block-body">
                <div className="ag-grid">
                  <div style={{ height: 280 }}>
                    <AgGridReact
                      theme={themeAlpine}
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
                        <label htmlFor="year">대상년도</label>
                      </th>
                      <td>
                        <input id="year" type="text" defaultValue="2025" />
                      </td>
                      <th>
                        <label htmlFor="survey">설문유형</label>
                      </th>
                      <td>
                        <select id="survey" style={{ width: 300 }}>
                          <option value="LG WAY 1"> LG WAY 1 </option>
                          <option value="LG WAY 2"> LG WAY 3 </option>
                          <option value="LG WAY 3"> LG WAY 4 </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="code">설문코드</label>
                      </th>
                      <td>
                        <input id="code" type="text" value="2025W394" readOnly />
                        {/* <span className="data-text">2025W394</span> */}
                      </td>
                      <th>
                        <label htmlFor="survey">상위코드</label>
                      </th>
                      <td>
                        <input id="code2" type="text" value="2025U0052" readOnly />
                        {/* <span className="data-text">2025U0052</span> */}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={4}>
                        <label htmlFor="comp">회 사</label>
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <ul className="form-item-list">
                          <li className="form-item">
                            <label htmlFor="All">
                              전체
                              <input type="checkbox" value="All" id="All" />
                            </label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="A" id="A" />
                            <label htmlFor="A">LG 전자</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="B" id="B" />
                            <label htmlFor="B">LG 마그나</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="A" id="C" />
                            <label htmlFor="C">LG 디스플레이</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="D" id="D" />
                            <label htmlFor="D">LG 이노텍</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="E" id="E" />
                            <label htmlFor="E">LG 전자</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="F" id="F" />
                            <label htmlFor="F">LG 마그나</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="G" id="G" />
                            <label htmlFor="G">LG 디스플레이</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="H" id="H" />
                            <label htmlFor="H">LG 이노텍</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="All" id="All" />
                            <label htmlFor="All">전체</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="A" id="A" />
                            <label htmlFor="A">LG 전자</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="B" id="B" />
                            <label htmlFor="B">LG 마그나</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="A" id="C" />
                            <label htmlFor="C">LG 디스플레이</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="D" id="D" />
                            <label htmlFor="D">LG 이노텍</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="E" id="E" />
                            <label htmlFor="E">LG 전자</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="F" id="F" />
                            <label htmlFor="F">LG 마그나</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="G" id="G" />
                            <label htmlFor="G">LG 디스플레이</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="H" id="H" />
                            <label htmlFor="H">LG 이노텍</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="All" id="All" />
                            <label htmlFor="All">전체</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="A" id="A" />
                            <label htmlFor="A">LG 전자</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="B" id="B" />
                            <label htmlFor="B">LG 마그나</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="A" id="C" />
                            <label htmlFor="C">LG 디스플레이</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="D" id="D" />
                            <label htmlFor="D">LG 이노텍</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="E" id="E" />
                            <label htmlFor="E">LG 전자</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="F" id="F" />
                            <label htmlFor="F">LG 마그나</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="G" id="G" />
                            <label htmlFor="G">LG 디스플레이</label>
                          </li>
                          <li className="form-item">
                            <input type="checkbox" value="H" id="H" />
                            <label htmlFor="H">LG 이노텍</label>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="test">구분</label>
                      </th>
                      <td>
                        <select id="test" required style={{ width: 275 }}>
                          <option value="01">국내 사무직</option>
                          <option value="02">국외 사무직</option>
                          <option value="03">국내 현장직</option>
                          <option value="04">국외 현장직</option>
                        </select>
                      </td>
                      <th>
                        <label htmlFor="surveyName">설문명</label>
                      </th>
                      <td>
                        <select id="surveyName" style={{ width: 275 }}>
                          <option value="01">설문시연 테스트1</option>
                          <option value="02">설문시연 테스트2</option>
                          <option value="03">설문시연 테스트3</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="date">설문 일자</label>
                      </th>
                      <td>
                        <RangePicker />
                      </td>
                      <th>
                        <label htmlFor="date2">결과조회 일자</label>
                      </th>
                      <td>
                        <RangePicker />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="btn-group-end">
                <Button
                  // color="primary"
                  // variant="outlined"
                  type="primary"
                  icon={<Plus size={18} />}
                  iconPlacement="end"
                  size="large"
                >
                  신규
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
