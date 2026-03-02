import { useEffect, useState } from 'react';

import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppRangeDatePicker from '@/components/common/AppRangeDatePicker';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import { FilePenLine, Search, CalendarDays } from 'lucide-react';

import { useGuidePatternListStore } from '@/guide/stores/useGuidePatternListStore';

function GuidePatternTable3() {
  const {
    search,
    searchParam,
    changeSearchInput,
    changeSearchType,
    displayTableLoading,
    initSearchInput,
    list,
    clear,
    searchParamErrors,
  } = useGuidePatternListStore();

  const { searchType, searchWord, boardType, startDate, rangeDate, useYn } = searchParam;

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
    // search();
    return () => {
      clear();
    };
  }, []);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">목록 개발 패턴1(store)</h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppCodeSelect
                    label="유형"
                    required
                    icon={<CalendarDays />}
                    style={{ width: 150 }}
                    codeGrpId="BOARD_TYPE"
                    value={boardType}
                    onChange={(value) => {
                      changeSearchInput('boardType', value);
                    }}
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
                    onChange={(value) => {
                      changeSearchType(value);
                    }}
                    disabled={boardType === 'normal' ? true : false}
                  />
                  <AppDatePicker
                    onChange={(value) => {
                      changeSearchInput('startDate', value);
                    }}
                    value={startDate}
                    pickerType="date"
                  />

                  <AppRangeDatePicker
                    onChange={(value) => {
                      changeSearchInput('rangeDate', value);
                    }}
                    value={rangeDate}
                    pickerType="date"
                  />
                  <AppCheckbox
                    style={{ marginLeft: 5 }}
                    label="AppCheckbox"
                    checkboxTitle="사용여부"
                    value={useYn === 'Y' ? true : false}
                    onChange={(checked) => {
                      changeSearchInput('useYn', checked ? 'Y' : 'N');
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
    </>
  );
}
export default GuidePatternTable3;
