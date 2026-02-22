import HeaderMenu from '@/publish/components/header/HeaderMenu';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer'; // useImmer 임포트

import { FilePenLine, Home } from 'lucide-react';

import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import Code from '@/config/Code';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import ApiService from '@/services/ApiService';

function GuidePatternTable3() {
  const [columns] = useState<any>([
    { field: 'boardKey', headerName: '게시판 키', width: 100 },
    { field: 'boardType', headerName: '게시판 유형', width: 120 },
    {
      field: 'boardTitle',
      headerName: '게시판 제목',
      minWidth: 200,
      flex: 1,
      cellStyle: { fontWeight: 'bold' },
    },
    { field: 'boardContent', headerName: '내용', hide: true },
    { field: 'useYn', headerName: '사용 여부', width: 100, cellStyle: { textAlign: 'center' } },
    { field: 'mainYn', headerName: '메인 노출', width: 100, cellStyle: { textAlign: 'center' } },
    { field: 'boardAuthType', headerName: '권한 유형', width: 120 },
    {
      field: 'securityLevel',
      headerName: '보안 레벨',
      width: 100,
      cellStyle: { textAlign: 'center' },
    },
  ]);

  // useState 대신 useImmer 사용
  const [searchParam, setSearchParam] = useImmer<any>({
    searchType: '',
    searchWord: '',
  });

  // 테이블 리스트도 Immer로 관리 (추후 특정 행 수정 시 용이)
  const [list, setList] = useImmer<any[]>([]);

  const { searchType, searchWord } = searchParam;

  // Immer를 사용한 가독성 좋은 상태 변경
  const changeSearchInput = (inputName: string, inputValue: any) => {
    setSearchParam((draft) => {
      draft[inputName] = inputValue;
    });
  };

  const enterSearch = async () => {
    const apiResult = await ApiService.get('notices', searchParam);
    // Immer의 setter는 일반 값을 넣어도 잘 작동하며,
    // 필요시 setList(draft => { return apiResult }) 형태로도 가능합니다.
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
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-inline justify-end">
                  <AppSelect
                    placeholder="제목+내용"
                    style={{ width: 140 }}
                    options={Code.boardSearchType}
                    value={searchType}
                    onChange={(value) => changeSearchInput('searchType', value)}
                  />
                  <AppSearchInput
                    placeholder="검색하세요"
                    style={{ width: 400 }}
                    hiddenSearchButton={false}
                    search={enterSearch}
                    value={searchWord}
                    onChange={(value) => changeSearchInput('searchWord', value)}
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

export default GuidePatternTable3;
