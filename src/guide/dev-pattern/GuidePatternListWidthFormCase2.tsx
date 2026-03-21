import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import AppTextEditor from '@/components/common/AppTextEditor';
import AppTextInput from '@/components/common/AppTextInput';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import Code from '@/config/Code';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { Check, FilePenLine, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
  baseRoutePath: '/notices',
  listApiPath: 'notices',
  isOpenFormModal: false,
  listSelectedInfo: null,
};

const initSearchParam = {
  searchWord: '',
  searchType: '',
  boardType: 'notice',
};

/* yup validation */
const yupFormSchema = yup.object({
  boardTitle: yup.string().required('게시판 제목을 입력해주세요.'),
  boardType: yup.string().required('게시판 유형을 선택해주세요.'),
  boardContent: yup
    .string()
    .test('is-empty', '내용을 입력해주세요', (value) => {
      if (!value) return false;
      // 1. HTML 태그 제거
      // 2. 공백 문자(&nbsp; 등) 제거
      const cleanText = value
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, '')
        .trim();
      return cleanText.length > 0; // 실제 글자가 있어야 통과
    })
    .required('내용을 입력해주세요'),
  useYn: yup.string().default('Y'),
  mainYn: yup.string().default('N'),
  boardAuthType: yup.string().nullable(),
  securityLevel: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .nullable(), // 숫자형 대응
});

/* formValue 초기값 */
const initFormValue = {
  boardTitle: '',
  boardType: 'notice',
  boardContent: '',
  useYn: 'Y', // 사용 여부 기본값 Y
  mainYn: 'N', // 메인 노출 기본값 N
  boardAuthType: 'ALL',
  securityLevel: '1', // 숫자 필드는 null 혹은 기본값 설정
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  byPassSaveCancel: true /* 매우중요! */,
  formApiPath: 'notices',
  baseRoutePath: '/notices',
  formName: '',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
export const useNoticeList = create<any>((set, get) => ({
  ...createListSlice(set, get),
  ...createFormSliceYup(set, get),

  ...initListData,
  ...initFormData,

  yupFormSchema: yupFormSchema,

  searchParam: {
    ...initSearchParam,
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...initSearchParam,
      },
    });
  },

  openModal: (listSelectedInfo) => {
    set({ isOpenFormModal: true, listSelectedInfo: listSelectedInfo });
  },

  closeModal: () => {
    set({ isOpenFormModal: false });
  },

  okModal: async () => {
    const { search } = get();
    set({ isOpenFormModal: false });
    await search();
  },

  clear: () => {
    set({ ...listBaseState, ...formBaseState, searchParam: { ...initSearchParam } });
  },
}));

/* 목록+폼(store + list선택연동) */
function GuidePatternListWidthFormCase2() {
  const listStore = useNoticeList();

  const [columns] = useState<any>([
    {
      field: 'boardKey',
      headerName: '게시판 키',
      width: 100,
    },
    {
      field: 'boardType',
      headerName: '게시판 유형',
      width: 120,
    },
    {
      field: 'boardTitle',
      headerName: '게시판 제목',
      minWidth: 200,
      flex: 1, // 남은 공간을 모두 차지하도록 설정
      cellStyle: { fontWeight: 'bold' },
    },
    {
      field: 'boardContent',
      headerName: '내용',
      hide: true, // 목록에서는 숨김 처리 (상세 페이지용 데이터)
    },
    {
      field: 'useYn',
      headerName: '사용 여부',
      width: 100,
      cellStyle: { textAlign: 'center' },
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'USE_YN',
      },
    },
    {
      field: 'mainYn',
      headerName: '메인 노출',
      width: 100,
      cellStyle: { textAlign: 'center' },
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'MAIN_DISPLAY_YN',
      },
    },
    {
      field: 'boardAuthType',
      headerName: '권한 유형',
      width: 120,
    },
    {
      field: 'securityLevel',
      headerName: '보안 레벨',
      width: 100,
      cellStyle: { textAlign: 'center' },
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'USER_LEVEL',
      },
    },
  ]);

  const {
    search,
    searchParam,
    changeSearchInput,
    list,
    errors,
    changeInput,
    changeBoardType,
    formValue,
    setFormValue,
    getDetail,
    save,
    clear,
  } = listStore;

  // boardType 동일한 변수로 alias로 정의한다.
  const { boardType: searchBoardType, searchType, searchWord } = searchParam;

  const { boardType, boardTitle, boardContent, useYn, mainYn, boardAuthType, securityLevel } =
    formValue;

  const handleRowDoubleClick = (selectedInfo) => {
    if (selectedInfo.data?.boardKey) {
      getDetail(selectedInfo.data?.boardKey);
    }
  };

  const handleAddButton = () => {
    setFormValue({ ...initFormValue });
  };

  const handleSave = async () => {
    save(async () => {
      await search();
      setFormValue({ ...initFormValue });
    });
  };

  useEffect(() => {
    search();
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
            <h3 className="title-text">공지사항</h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppCodeSelect
                    style={{ width: 150 }}
                    codeGrpId="BOARD_TYPE"
                    value={searchBoardType}
                    onChange={(value) => {
                      changeSearchInput('boardType', value);
                    }}
                  />
                  <AppSelect
                    style={{ width: 150 }}
                    allValue=""
                    allLabel="전체"
                    applyAllSelect
                    options={[
                      { label: '제목', value: 'boardTitle' },
                      { label: '내용', value: 'boardContent' },
                    ]}
                    value={searchType}
                    onChange={(value) => {
                      changeSearchInput('searchType', value);
                    }}
                  />
                  <AppSearchInput
                    placeholder="검색하세요"
                    style={{ width: 400 }}
                    value={searchWord}
                    onChange={(value) => {
                      changeSearchInput('searchWord', value);
                    }}
                    search={search}
                  />
                  <AppButton
                    style={{ marginLeft: 10 }}
                    icon={<Search size={18} />}
                    value="조회"
                    onClick={search}
                  />
                  <AppButton style={{ marginLeft: 10 }} value="등록" onClick={handleAddButton} />
                </div>
              </form>
            </div>
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable
                    rowData={list}
                    columns={columns}
                    handleRowDoubleClick={handleRowDoubleClick}
                  />
                </div>
              </div>
            </div>

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
                      <label htmlFor="title">제목</label>
                    </th>
                    <td colSpan={3}>
                      <AppTextInput
                        id="boardTitle"
                        name="queryJavaName"
                        style={{ width: 500 }}
                        value={boardTitle}
                        onChange={(value) => changeInput('boardTitle', value)}
                        errorMessage={errors.boardTitle}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="writer">게시판유형</label>
                    </th>
                    <td colSpan={3}>
                      <AppSelect
                        id="boardType"
                        options={Code.boardType}
                        style={{ width: 250 }}
                        value={boardType}
                        onChange={(value) => changeBoardType(value)}
                        errorMessage={errors.boardType}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4}>
                      <div className="textEdit">
                        <AppTextEditor
                          id="boardContent"
                          value={boardContent}
                          onChange={(value) => changeInput('boardContent', value)}
                          errorMessage={errors.boardContent}
                        />
                      </div>
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
                        disabled={boardType === 'normal' ? true : false}
                      />
                    </td>
                    <th>
                      <label htmlFor="exposure">메인노출 여부</label>
                    </th>
                    <td>
                      <AppCodeSelect
                        id="mainYn"
                        codeGrpId="MAIN_DISPLAY_YN"
                        style={{ width: 100 }}
                        value={mainYn}
                        onChange={(value) => changeInput('mainYn', value)}
                        errorMessage={errors.mainYn}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="range">게시판권한유형</label>
                    </th>
                    <td>
                      <AppCodeSelect
                        id="boardAuthType"
                        codeGrpId="BOARD_AUTH_TYPE"
                        style={{ width: 150 }}
                        value={boardAuthType}
                        onChange={(value) => changeInput('boardAuthType', value)}
                        errorMessage={errors.boardAuthType}
                        required
                      />
                    </td>
                    <th>
                      <label htmlFor="exposure">보안레벨</label>
                    </th>
                    <td>
                      <AppCodeSelect
                        id="securityLevel"
                        codeGrpId="USER_LEVEL"
                        options={Code.securityLevel}
                        style={{ width: 150 }}
                        value={securityLevel}
                        onChange={(value) => changeInput('securityLevel', value)}
                        errorMessage={errors.securityLevel}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btn-group-end">
              <AppButton icon={<Check size={18} />} value="저장" onClick={handleSave} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuidePatternListWidthFormCase2;
