import { useEffect, useState, useCallback } from 'react';
import { useImmer } from 'use-immer'; // use-immer 임포트
import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import { FilePenLine, Search } from 'lucide-react';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import * as yup from 'yup';

const initSearchParam = {
  searchWord: '',
  searchType: 'boardTitle',
  boardType: 'notice',
};

const yupSearchFormSchema = yup.object().shape({
  boardType: yup.string().required(),
});

function GuidePatternTable2() {
  const [searchParam, setSearchParam] = useImmer({ ...initSearchParam });
  const [searchParamErrors, setSearchParamErrors] = useImmer({});
  const [list, setList] = useState([]);
  const [displayTableLoading, setDisplayTableLoading] = useState(false);

  const { searchType, searchWord, boardType } = searchParam;

  const search = useCallback(async () => {
    if (yupSearchFormSchema) {
      const validateResult = await CommonUtil.validateYupForm(yupSearchFormSchema, searchParam);
      const { success, errors } = validateResult;
      if (!success) {
        setSearchParamErrors(errors);
        return;
      }
    }

    setSearchParamErrors({});
    setDisplayTableLoading(true);
    try {
      const apiResult = await ApiService.get('notices', searchParam);
      const list = apiResult || [];
      setList(list);
    } finally {
      setDisplayTableLoading(false);
    }
  }, [searchParam]);

  const changeSearchInput = useCallback(
    (key, value) => {
      setSearchParam((draft) => {
        draft[key] = value;
      });
    },
    [setSearchParam],
  );

  // 3. 검색 조건 초기화 함수
  const initSearchInput = useCallback(() => {
    setSearchParam(initSearchParam);
  }, [setSearchParam]);

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
    },
    {
      field: 'mainYn',
      headerName: '메인 노출',
      width: 100,
      cellStyle: { textAlign: 'center' },
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
    },
  ]);

  useEffect(() => {
    search();
  }, []);

  return (
    <main className="content-main">
      <div className="content-inner">
        <div className="content-title">
          <FilePenLine size={18} />
          <h3 className="title-text">목록 개발 패턴2 (useImmer)</h3>
        </div>
        <div className="content-body">
          <div className="form-block border-none">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                search();
              }}
            >
              <div className="form-inline justify-end">
                <AppCodeSelect
                  label="유형"
                  required
                  style={{ width: 150 }}
                  codeGrpId="BOARD_TYPE"
                  value={boardType}
                  onChange={(value) => changeSearchInput('boardType', value)}
                  errorMessage={searchParamErrors['boardType']}
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
                  onChange={(value) => changeSearchInput('searchType', value)}
                />
                <AppSearchInput
                  placeholder="검색하세요"
                  style={{ width: 400 }}
                  value={searchWord}
                  onChange={(value) => changeSearchInput('searchWord', value)}
                  search={search}
                />
                <AppButton
                  style={{ marginLeft: 10 }}
                  icon={<Search size={18} />}
                  value="조회"
                  onClick={search}
                />
                <AppButton style={{ marginLeft: 10 }} value="초기화" onClick={initSearchInput} />
              </div>
            </form>
          </div>
          <div className="grid-block">
            <div className="grid-block-body">
              <div className="ag-grid">
                <AppTable rowData={list} columns={columns} isLoading={displayTableLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GuidePatternTable2;
