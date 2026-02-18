import { useState, useEffect } from 'react';
import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';
import { getPageData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';

const initListData = {
  ...listBaseState,
};

/* zustand store 생성 */
const GuideTableCase2ListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  settingInitData: () => {
    const { setTotalCount } = get();
    const list = getPageData(1, 10);
    const totalCount = 111;
    set({ pageSize: 10, currentPage: 1, list: list });
    setTotalCount(totalCount);
  },
}));

function GuideTableCase2() {
  const listStore = GuideTableCase2ListStore();
  const { list, settingInitData } = listStore;
  const [columns] = useState(testColumnInfos);

  useEffect(() => {
    settingInitData();
  }, []);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              LocalData 연동하기
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideTableCase2.tsx`}>
                GuideTableCase2
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppTable rowData={list} columns={columns} store={listStore} />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideTableCase2;
