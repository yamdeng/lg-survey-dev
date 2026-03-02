import Config from '@/config/Config';
import { produce } from 'immer';
import { create } from 'zustand';

/*

  zustand immer 연동 기본 예시

*/
const profileInitailState = {
  name: 'ays',
  authList: ['R', 'W'],
  deptInfo: {
    asName: 'asDevelop',
    name: 'develop',
  },
};

const initailState = {
  rootName: 'yamdeng',
  profile: profileInitailState,
};

const useTestStore = create<any>((set, get) => ({
  ...initailState,

  writeLog: (fnName) => {
    console.log(`call function name : ${fnName}`);
    const profile = get().profile;
    console.log(`profile.name : ${profile.name}`);
  },

  changeProfileName: (newName) => {
    set(
      produce((state: any) => {
        state.profile.name = newName + 'good';
      }),
    );
    get().writeLog('changeProfileName');
  },

  changeProfileDeptName: (newDeptName) =>
    set(
      produce((state: any) => {
        state.profile.deptInfo.name = newDeptName + 'good';
      }),
    ),

  changeRootName: (name) => {
    set(
      produce((state: any) => {
        state.rootName = name + ' > root';
      }),
    );
    get().writeLog('changeProfileName');
  },

  clearStore: () =>
    set(() => ({
      profile: {
        name: 'test',
        authList: ['D'],
        deptInfo: {
          asName: 'test',
          name: 'test',
        },
      },
    })),
  clearDirect: () => {
    useTestStore.getState().clearStore();
  },
  clearStoreByInitData: () =>
    set(() => ({
      profile: profileInitailState,
    })),
  clearStoreByInitDataAll2: () => set(() => initailState),
  clearStoreByInitDataAll: () => set(initailState), // 이것도됨
}));

function GuideZustandImmer() {
  const {
    profile,
    rootName,
    changeProfileName,
    changeProfileDeptName,
    changeRootName,
    clearStore,
    clearStoreByInitData,
  } = useTestStore();

  console.log(clearStore);
  console.log(clearStoreByInitData);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              zustand + immer 사용방법 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideZustandImmer.tsx`}
              >
                GuideZustandImmer
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p>profile : {JSON.stringify(profile)}</p>
            <p>rootName : {rootName}</p>
            <div>
              <p>
                <button
                  className="app-btn primary small"
                  onClick={() => changeProfileName('안용성2')}
                >
                  changeProfileName
                </button>
              </p>
              <p>
                <button
                  className="app-btn primary small"
                  onClick={() => changeProfileDeptName('develop')}
                >
                  changeProfileDeptName
                </button>
              </p>
              <p>
                <button
                  className="app-btn primary small"
                  onClick={() => changeRootName('yamdeng2')}
                >
                  changeRootName
                </button>
              </p>
              <p>
                <button className="app-btn primary small" onClick={() => clearStoreByInitData()}>
                  clearStoreByInitData
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideZustandImmer;
