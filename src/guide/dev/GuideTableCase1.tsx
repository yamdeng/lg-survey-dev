import { useState } from 'react';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
};

/* zustand store 생성 */
const GuideTableCase1ListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  expanded: true,

  list: [
    {
      name: 'aaa',
      reportTitle: 'bbb',
      auditors: [
        { color: 'red', name: '안용성1-1', dutyTitle: '사장1-1' },
        { name: '안용성1-2', dutyTitle: '사장1-2' },
        { name: '안용성1-3', dutyTitle: '사장1-3' },
      ],
    },
    {
      name: 'aaa',
      reportTitle: 'bbb',
      auditors: [
        { color: 'blue', name: '안용성2-1', dutyTitle: '사장2-1' },
        { name: '안용성2-2', dutyTitle: '사장2-2' },
        { name: '안용성2-3', dutyTitle: '사장2-3' },
      ],
    },
  ],

  toggleExpand: () => {
    const { expanded } = get();
    set({ expanded: !expanded });
  },
}));

function AuditorListComponent(props) {
  const state = GuideTableCase1ListStore();
  const { expanded } = state;
  const { value } = props;
  let applyAuditorList = [];
  if (value && value.length) {
    if (expanded) {
      applyAuditorList = value;
    } else {
      applyAuditorList = [value[0]];
    }
  }

  const onClick = (auditorInfo) => {
    alert(`auditorInfo : ${JSON.stringify(auditorInfo)}`);
  };

  return (
    <span>
      {applyAuditorList.map((info) => {
        const { name, dutyTitle } = info;
        const applyStyle: any = {};
        if (info.color) {
          applyStyle.color = info.color;
        }
        return (
          <>
            <span key={name} onClick={() => onClick(info)} style={applyStyle}>
              {name} / {dutyTitle}
            </span>
          </>
        );
      })}
    </span>
  );
}

function GuideTableCase1() {
  const state = GuideTableCase1ListStore();
  const { list, toggleExpand, expanded } = state;
  const [columns] = useState([
    { field: 'name', headerName: '이름' },
    { field: 'reportTitle', headerName: '보고서명' },
    {
      field: 'auditors',
      headerName: '감시자들',
      flex: 1,
      cellRenderer: AuditorListComponent,
      cellRendererParams: {
        expanded: GuideTableCase1ListStore.getState().expanded,
      },
    },
  ]);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 case1(펼치기/닫기)
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideTableCase1.tsx`}>
                GuideTableCase1
              </a>
            </h3>
          </div>
          <p>
            <AppCheckbox
              label="펼치기/닫기"
              value={expanded}
              onChange={(value) => {
                toggleExpand(value);
              }}
            />
          </p>
          <div className="content-body">
            <AppTable rowData={list} columns={columns} />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideTableCase1;
