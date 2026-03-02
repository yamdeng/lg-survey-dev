import Config from '@/config/Config';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

// 컬럼 기본값 정보
const basicDefaultColDef = {
  sortable: true,
  filter: false,
  wrapText: false,
  autoHeight: true,
  minWidth: 100,
};

/*

  <AppTable />
   -className(string) : 별도의 스타일 적용하기 위한 css 클래스명
   -rowData([]) : 테이블에 반영할 목록 data
   -columns([]) : 테이블에 반영할 헤더 컬럼 목록
   -tableHeight(number) : 기본적으로 적용되어있는 테이블의 높이를 변경하고 싶을때 사용
   -noDataMessage(string) : 데이터가 존재하지 않을때 메시지(기본정책이 아닌 다른메시지로 표기하고 싶을때 사용)
   -displayTableLoading(boolean) : 내부 로딩바 반영하기 위한
   -handleRowDoubleClick(function) : row 더블 클릭 이벤트 핸들러
   -handleRowSingleClick(function) : row 싱글 클릭 이벤트 핸들러
   -handleRowSelect(function) : row 선택 정보가 변경됬을때 핸들러
   -rowSelectMode(string) : 선택 모드 'singleRow', 'multiRow'
   -enableCheckBox(boolean) : 행 선택 체크박스 반영여부
   -hideDisabledCheckboxes(boolean) : 행 선택 체크박스 적용시 선택이 않되게끔 설정시 체크박스 자체를 않보이게 할지 여부
   -isRowSelectable(function) : 체크박스 선택이 가능한 filter 함수 정의
   -pageSize(number) : 페이징 사이즈
   -pageSizeList([]) : 페이징 사이즈(select options)
   -getGridRef(function) : 컴포넌트의 ref를 전달받고 싶을때 콜백 함수로 전달
   -applyAutoHeight(boolean) : agGrid의 domLayout 설정을 반영하기 위한 : 현재 사용 x
   -store : listSlice에 적용된 store(페이징 및 공통 처리를 반영하기 위한 zustand store를 props로 전달)
   -hiddenPagination(boolean) : 하단 페이징 hide 여부
   -defaultColDef({}) : 기본 컬럼 정책을 override 하기 위한 설정

*/

const convertColumns = (columns) => {
  const searchRowSpanColumn = columns.find((columnInfo) => columnInfo.enableRowSpan);
  const result = columns.map((columnInfo) => {
    if (columnInfo.enableRowSpan) {
      // rowSpan 적용
      columnInfo.rowSpan = (params) => {
        const rowspanCount = params.data.rowSpanGroupCount ? params.data.rowSpanGroupCount : 1;
        return rowspanCount;
      };
      columnInfo.cellClassRules = {
        'cell-span': (params) => params.data.rowSpanGroupCount && params.data.rowSpanGroupCount > 1,
      };
    }
    if (searchRowSpanColumn) {
      columnInfo.sortable = false;
    }
    return columnInfo;
  });
  return result;
};

function AppTable(props) {
  const gridRef = useRef<any>(null);
  const {
    className,
    rowData,
    columns,
    tableHeight = Config.defaultGridHeight,
    noDataMessage = Config.defaultGridNoDataMessage,
    displayTableLoading = false,
    handleRowDoubleClick,
    handleRowSingleClick,
    handleRowSelect = () => {},
    rowSelectMode = '',
    enableCheckBox = false,
    hideDisabledCheckboxes = false,
    isRowSelectable = () => true,
    pageSize = Config.defaultGridPageSize,
    pageSizeList = Config.defaultPageSizeList,
    getGridRef,
    applyAutoHeight,
    store = null,
    hiddenPagination,
    defaultColDef = {},
    ...rest
  } = props;

  const applyDefaultColDef = { ...basicDefaultColDef, ...defaultColDef };

  // 선택 정책을 props에 전달받은 값을 기준으로 재반영
  const selection = useMemo(() => {
    // 체크박스 사용 여부와 상관없이 기본 객체 구조를 유지하는 것이 안전합니다.
    if (rowSelectMode) {
      return {
        mode: rowSelectMode, // 'multiRow' 또는 'singleRow'
        checkboxes: enableCheckBox,
        headerCheckbox: enableCheckBox,
        hideDisabledCheckboxes: hideDisabledCheckboxes,
        isRowSelectable: isRowSelectable,
        enableClickSelection: true,
      };
    }
    return {};
  }, [enableCheckBox, rowSelectMode, hideDisabledCheckboxes, isRowSelectable]);

  const searchRowSpanIndex = columns.findIndex((info) => info.enableRowSpan);

  // columns convert 작업
  const applyColumns = convertColumns(columns);

  // table 선택 변경시 props로 전달받은 handleRowSelect 재전달
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    return handleRowSelect(selectedRows);
  }, [handleRowSelect]);

  useEffect(() => {
    if (gridRef && gridRef.current && gridRef.current.api) {
      if (displayTableLoading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [displayTableLoading]);

  useEffect(() => {
    if (gridRef?.current?.api) {
      gridRef.current.api.paginationGoToFirstPage();
    }
  }, [props.rowData]); // 데이터가 바뀔 때마다 1페이지로!

  useEffect(() => {
    const api = gridRef.current?.api;
    if (!api) return;

    if (displayTableLoading) {
      api.showLoadingOverlay();
    } else {
      // 로딩이 끝났을 때
      if (!rowData || rowData.length === 0) {
        // 데이터가 없다면 강제로 "데이터 없음" 오버레이 표시
        api.showNoRowsOverlay();
      } else {
        // 데이터가 있다면 오버레이 숨기기
        api.hideOverlay();
      }
    }
  }, [displayTableLoading, rowData]); // 두 값의 변화를 모두 감시

  return (
    <>
      <div
        className={className ? `ag-theme-quartz ${className}` : 'ag-theme-quartz'}
        style={{ height: tableHeight }}
      >
        <AgGridReact
          {...rest}
          ref={gridRef}
          rowModelType="clientSide"
          suppressServerSideSorting={true}
          suppressMultiSort={true}
          domLayout={applyAutoHeight ? 'autoHeight' : 'normal'}
          rowData={rowData}
          columnDefs={applyColumns}
          overlayNoRowsTemplate={noDataMessage}
          onSelectionChanged={onSelectionChanged}
          onRowDoubleClicked={handleRowDoubleClick}
          onRowClicked={handleRowSingleClick}
          rowSelection={selection}
          paginationPageSize={store ? store.pageSize : pageSize}
          paginationPageSizeSelector={pageSizeList}
          pagination={hiddenPagination ? false : true}
          suppressRowTransform={searchRowSpanIndex !== -1 ? true : false}
          defaultColDef={applyDefaultColDef}
          tooltipShowDelay={100}
          tooltipHideDelay={1000}
          tooltipMouseTrack={true}
          enableBrowserTooltips={false}
          loading={displayTableLoading ? true : false}
          onGridReady={(params) => {
            if (getGridRef) {
              getGridRef(params);
            }
          }}
        />
      </div>
    </>
  );
}

export default AppTable;
