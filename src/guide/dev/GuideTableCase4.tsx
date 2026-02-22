import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';

const list = [];

for (let index = 1; index <= 10; index++) {
  list.push({
    msgKey: `key${index}`,
    msgKor: `msgKor${index}`,
    msgEng: `msgEng${index}`,
    msgChn: `msgChn${index}`,
    msgJpn: `msgJpn${index}`,
    msgEtc: `msgEtc${index}`,
  });
}

function GuideTableCase4() {
  const columns = [
    { field: 'msgKey', headerName: '메시지 키', width: 300 },
    { field: 'msgKor', headerName: '설명(한국어)', flex: 1 },
    { field: 'msgEng', headerName: '설명(영어)' },
    { field: 'msgChn', headerName: '설명(중국어)' },
    { field: 'msgJpn', headerName: '설명(일본어)' },
    { field: 'msgEtc', headerName: '설명(기타)' },
  ];

  const handleRowSelect = (selectedRowList) => {
    console.log(`selectedInfo : ${selectedRowList}`);
  };

  // const rowSelectMode = 'singleRow'; // 체크박스 선택을 하나만 선택 가능
  const rowSelectMode = 'multiRow'; // 체크박스 선택을 다수 선택 가능(공통컴포넌트의 기본값)

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              checkbox(multipe, disable)
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideTableCase4.tsx`}>
                GuideTableCase42
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="grid-block">
              <div className="grid-block-header">
                <div className="btn-group-end">
                  <AppButton size="small" value="조회" />
                </div>
              </div>
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable
                    rowData={list}
                    columns={columns}
                    handleRowSelect={handleRowSelect}
                    enableCheckBox
                    rowSelectMode={rowSelectMode}
                    isRowSelectable={(rowNode) =>
                      rowNode.data.msgKey === 'key1' || rowNode.data.msgKey === 'key2'
                        ? true
                        : false
                    }
                    hideDisabledCheckboxes
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideTableCase4;
