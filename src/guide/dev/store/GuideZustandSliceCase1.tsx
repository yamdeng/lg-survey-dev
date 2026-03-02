import { useEffect } from 'react';
import Config from '@/config/Config';
import { create } from 'zustand';
import { createListSlice } from '@/guide/stores/testSlice';

const useListSliceTestStore = create<any>((set, get) => ({
  ...createListSlice(set, get),
}));

function GuideZustandSliceCase1() {
  const { currentPage, pageSize, changeCurrentPage, changePageSize, list, search, clearStore } =
    useListSliceTestStore();

  //   useEffect(() => {
  //     return clearStore;
  //   }, []);

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
              zustand slice 예시1 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideZustandSliceCase1.tsx`}
              >
                GuideZustandSliceCase1
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p>currentPage {currentPage}</p>
            <p>pageSize {pageSize}</p>
            <p>list {JSON.stringify(list)}</p>
            <p>
              <button className="button" onClick={() => changeCurrentPage(2)}>
                changeCurrentPage
              </button>
            </p>
            <p>
              <button className="button" onClick={() => changePageSize(50)}>
                changePageSize
              </button>
            </p>
            <p>
              <button className="button" onClick={search}>
                saerch
              </button>
            </p>
            <p>
              <button className="button" onClick={clearStore}>
                clearStore
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideZustandSliceCase1;
