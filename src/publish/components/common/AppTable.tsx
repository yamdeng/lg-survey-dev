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

// table안에 로딩바 표기 : 현재는 사용X
const LoadingComponent = (props) => {
  const { loadingMessage } = props;
  return (
    <div className="ag-overlay-loading-center" role="presentation">
      <div
        role="presentation"
        style={{
          height: 100,
          width: 100,
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg%3E%3Ccircle cx='12' cy='2.5' r='1.5' fill='%23000' opacity='0.14'/%3E%3Ccircle cx='16.75' cy='3.77' r='1.5' fill='%23000' opacity='0.29'/%3E%3Ccircle cx='20.23' cy='7.25' r='1.5' fill='%23000' opacity='0.43'/%3E%3Ccircle cx='21.5' cy='12' r='1.5' fill='%23000' opacity='0.57'/%3E%3Ccircle cx='20.23' cy='16.75' r='1.5' fill='%23000' opacity='0.71'/%3E%3Ccircle cx='16.75' cy='20.23' r='1.5' fill='%23000' opacity='0.86'/%3E%3Ccircle cx='12' cy='21.5' r='1.5' fill='%23000'/%3E%3CanimateTransform attributeName='transform' calcMode='discrete' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat`,
          margin: '0 auto',
        }}
      ></div>
      <div aria-live="polite" aria-atomic="true">
        {loadingMessage}
      </div>
    </div>
  );
};

/*

  <AppTable />
   -className(string) : 별도의 스타일 적용하기 위한 css 클래스명
   -rowData([]) : 테이블에 반영할 목록 data
   -columns([]) : 테이블에 반영할 헤더 컬럼 목록
   -setColumns(function) : 동적 컬럼 변경시 변경된 정보를 즉시 반영하기 위한 함수
   -customButtons([]) : 우측 상단에 추가할 버튼 목록
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
   -gridTotalCountTemplate : total count 메시지 템플릿 적용을 위한
   -getGridRef(function) : 컴포넌트의 ref를 전달받고 싶을때 콜백 함수로 전달
   -applyAutoHeight(boolean) : agGrid의 domLayout 설정을 반영하기 위한 : 현재 사용 x
   -store : listSlice에 적용된 store(페이징 및 공통 처리를 반영하기 위한 zustand store를 props로 전달)
   -hiddenPagination(boolean) : 하단 페이징 hide 여부
   -hiddenTableHeader(boolean) : 상단 헤더 영역 hide 여부
   -defaultColDef({}) : 기본 컬럼 정책을 override 하기 위한 설정

*/
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
    rowSelectMode = 'multiRow',
    enableCheckBox = false,
    hideDisabledCheckboxes = false,
    isRowSelectable = () => true,
    pageSize = Config.defaultGridPageSize,
    pageSizeList = Config.defaultPageSizeList,
    getGridRef,
    applyAutoHeight,
    store = null,
    hiddenPagination,
    readOnlyEdit = true,
    defaultColDef = {},
    ...rest
  } = props;

  const applyDefaultColDef = { ...basicDefaultColDef, ...defaultColDef };

  // store
  const { currentPage, prevPage, nextPage, displayPageIndexList = [] } = store || {};

  // 컬럼 동적 셋팅 모달 open

  // 선택 정책을 props에 전달받은 값을 기준으로 재반영
  const selection = useMemo(() => {
    if (enableCheckBox) {
      return {
        mode: rowSelectMode,
        hideDisabledCheckboxes: hideDisabledCheckboxes,
        isRowSelectable: isRowSelectable,
      };
    }
    return null;
  }, [enableCheckBox, rowSelectMode, hideDisabledCheckboxes, isRowSelectable]);

  const searchRowSpanIndex = columns.findIndex((info) => info.enableRowSpan);

  // columns convert 작업
  const applyColumns = columns;

  const loadingOverlayComponent = useMemo(() => {
    return LoadingComponent;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: 'wait please...',
    };
  }, []);

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
          loadingOverlayComponent={loadingOverlayComponent}
          loadingOverlayComponentParams={loadingOverlayComponentParams}
          overlayNoRowsTemplate={noDataMessage}
          onSelectionChanged={onSelectionChanged}
          onRowDoubleClicked={handleRowDoubleClick}
          onRowClicked={handleRowSingleClick}
          selection={selection}
          paginationPageSize={store ? store.pageSize : pageSize}
          paginationPageSizeSelector={pageSizeList}
          pagination={false}
          suppressRowTransform={searchRowSpanIndex !== -1 ? true : false}
          defaultColDef={applyDefaultColDef}
          tooltipShowDelay={100}
          tooltipHideDelay={1000}
          tooltipMouseTrack={true}
          enableBrowserTooltips={false}
          readOnlyEdit={readOnlyEdit}
          onGridReady={(params) => {
            if (displayTableLoading) {
              params.api.showLoadingOverlay();
            } else {
              params.api.hideOverlay();
            }
            if (getGridRef) {
              getGridRef(params);
            }
          }}
        />
      </div>

      <div className="pagination" style={{ display: hiddenPagination ? 'none' : '' }}>
        <a
          className="first"
          href=""
          style={{ display: prevPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.goFirstPage();
          }}
        ></a>
        <a
          className="prev"
          href=""
          style={{ display: prevPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.changeCurrentPage(prevPage);
          }}
        ></a>
        <span>
          {displayPageIndexList.map((pageIndex) => {
            let pageComponent = (
              <a
                href=""
                key={pageIndex}
                onClick={(event) => {
                  event.preventDefault();
                  store.changeCurrentPage(pageIndex);
                }}
              >
                {pageIndex}
              </a>
            );
            if (pageIndex === currentPage) {
              pageComponent = (
                <strong
                  title="현재페이지"
                  key={pageIndex}
                  onClick={() => {
                    store.changeCurrentPage(pageIndex);
                  }}
                >
                  {pageIndex}
                </strong>
              );
            }
            return pageComponent;
          })}
        </span>
        <a
          className="next"
          href=""
          style={{ display: nextPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.changeCurrentPage(nextPage);
          }}
        ></a>
        <a
          className="last"
          href=""
          style={{ display: nextPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.goLastPage();
          }}
        ></a>
      </div>
    </>
  );
}

export default AppTable;
