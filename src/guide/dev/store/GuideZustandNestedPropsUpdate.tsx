import Config from '@/config/Config';
import { create } from 'zustand';

/*

  zustand 내부 속성 변경 예시(여러방법)

*/
const useTestStore = create<any>((set) => ({
  profile: {
    name: 'ays',
    authList: ['R', 'W'],
    deptInfo: {
      name: 'develop',
    },
  },

  changeProfileName: (newName) =>
    set((state) => ({
      profile: { ...state.profile, name: newName },
    })),

  changeProfileDeptName: (newDeptName) =>
    set((state) => ({
      profile: {
        ...state.profile,
        deptInfo: { ...state.deptInfo, name: newDeptName },
      },
    })),

  addAuthList: (authName) =>
    set((state) => ({
      profile: {
        ...state.profile,
        authList: [...state.profile.authList, authName],
      },
    })),
}));

function GuideZustandNestedPropsUpdate() {
  console.log('ZustandGuideNestedPropsUpdate render');

  const profile = useTestStore((state) => state.profile);
  const changeProfileName = useTestStore((state) => state.changeProfileName);
  const changeProfileDeptName = useTestStore((state) => state.changeProfileDeptName);
  const addAuthList = useTestStore((state) => state.addAuthList);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              zustand 내부 속성 변경 방법 예시 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideZustandNestedPropsUpdate.tsx`}
              >
                GuideZustandNestedPropsUpdate
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p>name : {profile.name}</p>
            <p>deptInfo : {profile.deptInfo.name}</p>
            <p>authList : {profile.authList}</p>
            <div>
              <button className="button" onClick={() => changeProfileName('ays777')}>
                changeProfileName
              </button>
              <br />
              <button className="button" onClick={() => changeProfileDeptName('ower')}>
                changeProfileDeptName
              </button>
              <br />
              <button className="button" onClick={() => addAuthList('D')}>
                addAuthList
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideZustandNestedPropsUpdate;
