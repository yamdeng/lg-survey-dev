import HeaderMenu from '@/publish/components/header/HeaderMenu';
import { useEffect, useState } from 'react';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';

import {
  Building2,
  CalendarDays,
  ClipboardList,
  Download,
  FileInput,
  FilePen,
  FilePenLine,
  Home,
  Search,
} from 'lucide-react';

import AppButton from '@/components/common/AppButton';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import { useGuidePatternListStore } from '@/guide/stores/useGuidePatternListStore';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';

function GuidePatternTable4() {
  const listStore = useGuidePatternListStore();

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
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'USER_LEVEL',
      },
      cellStyle: { textAlign: 'center' },
    },
  ]);

  const { enterSearch, searchParam, changeSearchInput, list, clear } = listStore;
  const { searchType, searchWord } = searchParam;

  useEffect(() => {
    enterSearch();
    return () => {
      clear();
    };
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
            <div className="form-block">
              <form>
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

                <AppButton icon={<Search size={18} />} value="조회" />
              </form>
            </div>

            <div className="grid-block">
              <div className="grid-block-header">
                <div className="content-title">
                  <ClipboardList size={18} />
                  <h3 className="title-text">Language Info</h3>
                </div>
                <div className="btn-group-end">
                  <AppButton icon={<Download size={14} />} size="small" value="" />
                </div>
              </div>
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable rowData={list} columns={columns} store={listStore} rowKey="boardKey" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuidePatternTable4;
