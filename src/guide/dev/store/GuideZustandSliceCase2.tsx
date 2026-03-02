import { useEffect } from 'react';
import Config from '@/config/Config';
import { create } from 'zustand';
import { createListSlice } from '@/guide/stores/testSlice';

const useListSliceTestStore = create<any>((set, get) => ({
  ...createListSlice(set, get),
  currentPage: 20,
  changePageSize: (pageSize) => {
    console.log('custom changePageSize call');
    alert(pageSize);
    set({ pageSize: pageSize, currentPage: 1 });
    get().search();
  },
}));

function GuideZustandSliceCase2() {
  const { currentPage, pageSize, changeCurrentPage, changePageSize, list, search, clearStore } =
    useListSliceTestStore();

  useEffect(() => {
    return () => {
      clearStore();
    };
  }, []);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              zustand slice 예시2 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideZustandSliceCase2.tsx`}
              >
                GuideZustandSliceCase2
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p>currentPage {currentPage}</p>
            <p>pageSize {pageSize}</p>
            <p>list {JSON.stringify(list)}</p>
            <p>
              <button className="app-btn primary small" onClick={() => changeCurrentPage(2)}>
                changeCurrentPage
              </button>
            </p>
            <p>
              <button className="app-btn primary small" onClick={() => changePageSize(50)}>
                changePageSize
              </button>
            </p>
            <p>
              <button className="app-btn primary small" onClick={search}>
                saerch
              </button>
            </p>
            <p>
              <button className="app-btn primary small" onClick={clearStore}>
                clearStore
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideZustandSliceCase2;
