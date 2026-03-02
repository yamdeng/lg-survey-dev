import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { produce } from 'immer';
import _ from 'lodash';
import { useState } from 'react';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
  listApiPath: 'TODO:목록api패스',
  baseRoutePath: 'TODO:UI라우트패스',
};

/* zustand store 생성 */
const SysMessageListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  expanded: true,

  toggleRepresentReport: (index, expanded) => {
    set(
      produce((state: any) => {
        const list = state.list;
        const children = list[index].children || [];
        const applyChildren = _.cloneDeep(children);
        if (expanded) {
          list.splice(index + 1, 0, ...applyChildren);
        } else {
          list.splice(index + 1, applyChildren.length);
        }
        list[index].expanded = expanded;
        state.list = list;
      }),
    );
  },

  list: [
    {
      name: 'report1',
      reportTitle: 'aaa1',
      createUserName: '안용성',
      children: [
        { name: 'report1-1', reportTitle: 'aaa1-1', isChild: true, createUserName: '안용성-child' },
        { name: 'report1-2', reportTitle: 'aaa1-2', isChild: true, createUserName: '안용성-child' },
        { name: 'report1-3', reportTitle: 'aaa1-3', isChild: true, createUserName: '안용성-child' },
      ],
      hasChildren: true,
      expanded: false,
    },
    {
      name: 'report2',
      reportTitle: 'aaa2',
      createUserName: '안용성',
      children: [
        { name: 'report2-1', reportTitle: 'aaa2-1', isChild: true, createUserName: '안용성-child' },
        { name: 'report2-2', reportTitle: 'aaa2-2', isChild: true, createUserName: '안용성-child' },
        { name: 'report2-3', reportTitle: 'aaa2-3', isChild: true, createUserName: '안용성-child' },
      ],
      hasChildren: true,
      expanded: false,
    },
    {
      name: 'report3',
      reportTitle: 'aaa3',
      createUserName: '안용성',
      children: [],
      hasChildren: false,
    },
    {
      name: 'report4',
      reportTitle: 'aaa4',
      createUserName: '안용성',
      children: [
        { name: 'report4-1', reportTitle: 'aaa4-1', isChild: true, createUserName: '안용성-child' },
        { name: 'report4-2', reportTitle: 'aaa4-2', isChild: true, createUserName: '안용성-child' },
        { name: 'report4-3', reportTitle: 'aaa4-3', isChild: true, createUserName: '안용성-child' },
      ],
      hasChildren: true,
      expanded: false,
    },
  ],

  toggleExpand: () => {
    const { expanded } = get();
    set({ expanded: !expanded });
  },
}));

function HasChildrenCheckComponent(props) {
  const { store, node } = props;
  const { rowIndex } = node;
  const { toggleRepresentReport } = store;
  const { value, data } = props;
  const { isChild, expanded } = data;

  // +, -, ''
  const expandedComponent = <span></span>;
  // 묶음 하위 보고서인 경우
  if (isChild) {
    return <span>ㄴ</span>;
  } else if (value) {
    // 자식이 존재하는 경우
    // 펼쳐져 있을 경우
    if (expanded) {
      return <span onClick={() => toggleRepresentReport(rowIndex, false)}>-</span>;
    } else {
      return <span onClick={() => toggleRepresentReport(rowIndex, true)}>+</span>;
    }
  }
  return <span>{expandedComponent}</span>;
}

function GuideTableUseStore2() {
  const state = SysMessageListStore();
  const { list } = state;
  const [columns] = useState([
    {
      field: 'hasChildren',
      headerName: '묶음',
      cellRenderer: HasChildrenCheckComponent,
      cellRendererParams: {
        store: state,
      },
    },
    { field: 'name', headerName: '이름' },
    { field: 'reportTitle', headerName: '보고서명' },
    { field: 'creator', headerName: '등록자' },
  ]);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 store 연동 case 2 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableUseStore2.tsx`}
              >
                GuideTableUseStore2
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable rowData={list} columns={columns} hiddenPagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideTableUseStore2;
