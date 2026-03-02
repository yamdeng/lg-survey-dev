import Config from '@/config/Config';
import { memo } from 'react';
import useGuideTestStore from '@/guide/stores/useGuideTestStore';

const Name = memo(function Name(props: any) {
  console.log('Name Component Render');
  const { name } = props;
  return <p>Name Component {name}</p>;
});

const Profile = memo(function Profile() {
  console.log('Profile Component Render');
  const changeProfile = useGuideTestStore((state) => state.changeProfile);
  const profile = useGuideTestStore((state) => state.profile);
  return (
    <div>
      <p>profile : {profile ? JSON.stringify(profile) : 'not profile'}</p>
      <button className="button" onClick={() => changeProfile({ name: '안용성3' })}>
        changeProfile : Profile 컴포넌트 안
      </button>
    </div>
  );
});

function GuideZustandCreateFunction() {
  // 전체 state select : 권한하지 않을 것 같지만 가독성이 좋으므로 가능하면 해당 방법을 사용한다
  // const { name, age, changeName, clearStore } = useGuideTestStore();

  // 개별로 selector로 지정하는 방법 : 성능이 중요한 극소수 페이지에만 반영(결국은 memo랑 같이 써야 효율성이 존재함)
  const name = useGuideTestStore((state) => state.name);
  const age = useGuideTestStore((state) => state.age);
  const changeName = useGuideTestStore((state) => state.changeName);
  const clearStore = useGuideTestStore((state) => state.clearStore);

  // 변수에 할당하는 다른 방법 1 : 전체 selector와 동일함
  // const { name, age, changeName, clearStore } = useGuideTestStore((state) => ({
  //   name: state.name,
  //   age: state.age,
  //   changeName: state.changeName,
  //   clearStore: state.clearStore,
  // }));

  // 변수에 할당하는 다른 방법 2 : 전체 selector와 동일함
  // const [name, age, changeName, clearStore] = useGuideTestStore((state) => [
  //   state.name,
  //   state.age,
  //   state.changeName,
  //   state.clearStore,
  // ]);

  // 함수와 변수를 분류해서 사용할 수 있으므로 대충써도 자동으로 분류됨
  const changeProfile = useGuideTestStore((state) => state.changeProfile);

  const setStateExample = () => {
    useGuideTestStore.setState({
      name: 'yamdeng',
    });
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              zustand create 및 기본 사용법 예시 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideZustandCreateFunction.tsx`}
              >
                GuideZustandCreateFunction
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p>age: {age}</p>
            <p>name : {name}</p>
            <Name name={name} />
            <Profile />
            <div>
              <button className="button" onClick={() => changeName('안용성2')}>
                changeName
              </button>
              <br />
              <button className="button" onClick={() => changeProfile({ name: '안용성7' })}>
                changeProfile : Profile 컴포넌트 밖
              </button>
              <button className="button" onClick={() => clearStore()}>
                clearStore
              </button>
              <button className="button" onClick={() => setStateExample()}>
                setStateExample
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideZustandCreateFunction;
