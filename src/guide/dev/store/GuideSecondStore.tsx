import Config from '@/config/Config';
import useSecondStore from '@/guide/stores/useSecondStore';

function GuideSecondStore() {
  const { name, changeName, age, changeAge } = useSecondStore();

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              store 예시 첫번째 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideSecondStore.tsx`}
              >
                GuideFirstStore
              </a>
            </h3>
          </div>
          <div className="content-body">
            SecondStoreTest test
            <br />
            <p>name : {name}</p>
            <p>age : {age}</p>
            <p>
              <button className="button" onClick={() => changeName('ays333')}>
                changeName
              </button>
            </p>
            <p>
              <button className="button" onClick={() => changeAge(28)}>
                changeAge
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideSecondStore;
