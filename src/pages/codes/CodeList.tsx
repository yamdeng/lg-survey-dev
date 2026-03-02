import { useState, useEffect } from 'react';
import AppTable from '@/components/common/AppTable';
import { FilePenLine } from 'lucide-react';
import { useCodeListStore, useGroupCodeListStore } from './useCodeListStore';

const CodeList = () => {
  const [columns1] = useState<any>([
    {
      field: 'groupCode',
      headerName: '그룹 코드',
      width: 100,
    },
    {
      field: 'groupName',
      headerName: '그룹명',
      width: 120,
    },
    {
      field: 'useYn',
      headerName: '사용 여부',
      width: 120,
    },
    {
      field: 'description',
      headerName: '설명',
      flex: 1,
    },
    {
      field: 'regDate',
      headerName: '등록일시',
      width: 120,
    },
    {
      field: 'modDate',
      headerName: '수정일시',
      width: 120,
    },
  ]);

  const [columns2] = useState<any>([
    {
      field: 'cdGrp',
      headerName: '그룹 코드',
      width: 100,
    },
    {
      field: 'cd',
      headerName: '코드',
      width: 120,
    },
    {
      field: 'cdNm',
      headerName: '코드명',
      width: 120,
    },
    {
      field: 'sortOrd',
      headerName: '순서',
      width: 120,
    },
    {
      field: 'cdDesc',
      headerName: '설명',
      flex: 1,
    },
    {
      field: 'regDate',
      headerName: '등록일시',
      width: 120,
    },
    {
      field: 'modDate',
      headerName: '수정일시',
      width: 120,
    },
  ]);

  const groupCodeListStore = useGroupCodeListStore();
  const { list, search, clear } = groupCodeListStore;

  const codeListStore = useCodeListStore();
  const { searchByGroupCode } = codeListStore;
  const codeList = codeListStore.list;

  const handleRowSelect = (selectedInfo) => {
    if (selectedInfo) {
      searchByGroupCode(selectedInfo.groupCode);
    }
  };

  useEffect(() => {
    search();
    return clear;
  }, []);

  return (
    <main className="content-main">
      <div className="content-inner">
        <div className="content-title">
          <FilePenLine size={18} />
          <h3 className="title-text">코드관리</h3>
        </div>
        <div className="content-body">
          <div className="grid-block">
            <div className="grid-block-body">
              <div className="ag-grid">
                <AppTable
                  rowData={list}
                  columns={columns1}
                  handleRowSelect={handleRowSelect}
                  rowSelectMode={'singleRow'}
                />
              </div>
            </div>
            <div className="grid-block-body">
              <div className="ag-grid">
                <AppTable rowData={codeList} columns={columns2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CodeList;
