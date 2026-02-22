import HeaderMenu from '@/publish/components/header/HeaderMenu';
import { useEffect, useState } from 'react';

import { FilePenLine, Home } from 'lucide-react';

import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import Code from '@/config/Code';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import ApiService from '@/services/ApiService';

function GuidePatternTable2() {
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

  const [searchParam, setSearchParam] = useState<any>({});
  const [list, setList] = useState<any>({});

  const { searchType, searchWord } = searchParam;

  const changeSearchInput = (inputName: string, inputValue: any) => {
    setSearchParam((prev: any) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  };

  const enterSearch = async () => {
    const apiResult = await ApiService.get('notices', searchParam);
    setList(apiResult);
  };

  useEffect(() => {
    enterSearch();
  }, []);

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
                <a href="#">Notice</a>
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
            <h3 className="title-text">Notice</h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppSelect
                    placeholder="제목+내용"
                    // defaultValue="opt-3" // defaultValue 기본값 입력시 에러남
                    style={{ width: 140 }}
                    options={Code.boardSearchType}
                    value={searchType}
                    onChange={(value) => {
                      changeSearchInput('searchType', value);
                    }}
                  />
                  <AppSearchInput
                    placeholder="검색하세요"
                    style={{ width: 400 }}
                    hiddenSearchButton={false}
                    search={enterSearch}
                    value={searchWord}
                    onChange={(value) => {
                      changeSearchInput('searchWord', value);
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable columns={columns} rowData={list} rowKey="boardKey" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuidePatternTable2;
