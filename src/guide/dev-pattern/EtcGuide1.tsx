import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import AppTextInput from '@/components/common/AppTextInput';
import Code from '@/config/Code';
import ApiService from '@/services/ApiService';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { listBaseState } from '@/stores/slice/listSlice';
import { FilePenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';
import { userBaseColumns } from '@/data/grid/table-column';

/* yup validation */
const yupFormSchema = yup.object({
  deptKey: yup.string().required('부서키를 입력해주세요.'),
  deptName: yup.string().required('부서명를 입력해주세요.'),
  useYn: yup.string().default('Y'),
});

/* formValue 초기값 */
const initFormValue = {
  deptKey: '',
  upperDeptKey: '-1',
  deptName: '',
  useYn: 'Y', // 사용 여부 기본값 Y
  sortIndex: null,
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,
  byPassSaveCancel: true /* 매우중요! */,
  formName: '',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
export const useTotalStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  // 부서 관련 변수 함수
  deptList: [],
  selectedDeptInfo: null,

  // 부서 선택시 정보 변환
  selectDept: async (deptInfo) => {
    const { setFormValue } = get();
    const apiResult = await ApiService.get('user', { deptKey: deptInfo.deptKey });
    const userList = apiResult || [];
    setFormValue(deptInfo, deptInfo.deptKey);
    set({ userList });
  },

  searchDept: async () => {
    const apiResult = await ApiService.get('dept');
    const deptList = apiResult || [];
    set({ deptList: deptList });
  },

  // 사용자 관련 변수 함수
  userList: [],

  clear: () => {
    set({ ...listBaseState, ...formBaseState });
  },
}));

/* 기타가이드 1 */
function EtcGuide1() {
  const listStore = useTotalStore();

  const [deptColumns] = useState<any>([
    {
      field: 'deptKey',
      headerName: '게시판 키',
      width: 100,
    },
    {
      field: 'deptName',
      headerName: '부서명',
      width: 200,
    },
  ]);

  const { searchDept, deptList, changeInput, errors, userList, formValue, selectDept, clear } =
    listStore;

  const { deptName, deptKey, upperDeptKey, useYn, sortIndex } = formValue;

  const handleRowDoubleClick = (selectedInfo) => {
    selectDept(selectedInfo.data);
  };

  useEffect(() => {
    searchDept();
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    return clear;
  }, []);
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">조직관리 가이드</h3>
          </div>
          <div
            className="content-body"
            style={{
              display: 'flex',
              flexDirection: 'row', // ★ 가로 방향임을 명시적으로 강제
              gap: '20px',
              alignItems: 'flex-start',
              width: '100%', // ★ 부모 너비를 다 쓰도록 설정
            }}
          >
            {/* [1] 좌측 영역: 고정 너비 */}
            <div className="side-block" style={{ width: '350px', flexShrink: 0 }}>
              <div className="grid-block">
                <div className="grid-block-title">■ 조직도</div>
                <AppSearchInput
                  placeholder="검색하세요"
                  style={{ width: 300 }}
                  search={searchDept}
                />
                <div className="grid-block-body">
                  <div className="ag-grid">
                    <AppTable
                      tableHeight={750}
                      rowData={deptList}
                      columns={deptColumns}
                      handleRowDoubleClick={handleRowDoubleClick}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 2. 우측 영역: 상세정보 및 하단 사원정보 그리드 */}
            <div className="main-block" style={{ flex: 1, minWidth: 0 }}>
              <div className="content-block-modify">
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
                        <label htmlFor="title">부서명</label>
                      </th>
                      <td colSpan={3}>
                        <AppTextInput
                          id="deptKey"
                          style={{ width: 500 }}
                          value={deptName}
                          onChange={(value) => changeInput('deptName', value)}
                          errorMessage={errors.deptName}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="range">사용여부</label>
                      </th>
                      <td>
                        <AppSelect
                          id="useYn"
                          options={Code.useYn}
                          style={{ width: 100 }}
                          value={useYn}
                          onChange={(value) => changeInput('useYn', value)}
                          errorMessage={errors.useYn}
                          required
                        />
                      </td>
                      <th>
                        <label htmlFor="exposure">부서키</label>
                      </th>
                      <td>
                        <AppTextInput
                          id="deptKey"
                          value={deptKey}
                          onChange={(value) => changeInput('deptKey', value)}
                          errorMessage={errors.deptKey}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="range">상위부서키</label>
                      </th>
                      <td>
                        <AppTextInput
                          id="upperDeptKey"
                          value={upperDeptKey}
                          onChange={(value) => changeInput('upperDeptKey', value)}
                          errorMessage={errors.upperDeptKey}
                          required
                        />
                      </td>
                      <th>
                        <label htmlFor="exposure">순서</label>
                      </th>
                      <td>
                        <AppTextInput
                          id="sortIndex"
                          inputType="number"
                          value={sortIndex}
                          onChange={(value) => changeInput('sortIndex', value)}
                          errorMessage={errors.sortIndex}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* 우측 하단: 사원정보 그리드 영역 */}
              <div className="grid-block">
                <div className="grid-block-title">■ 사원정보</div>
                <div className="grid-block-body">
                  <div className="ag-grid">
                    <AppTable
                      tableHeight={400}
                      columns={userBaseColumns} // 사원 목록 컬럼 정의
                      rowData={userList} // 사원 목록 데이터
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
}
export default EtcGuide1;
