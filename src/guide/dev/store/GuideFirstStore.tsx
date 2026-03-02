import Config from '@/config/Config';
import useFirstStore from '@/guide/stores/useFirstStore';

function GuideFirstStore() {
  const { name, changeName, age, changeAge } = useFirstStore();

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              store 예시 첫번째 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideFirstStore.tsx`}
              >
                GuideFirstStore
              </a>
            </h3>
          </div>
          <div className="content-body">
            FirstStoreTest test
            <br />
            <p>name : {name}</p>
            <p>age : {age}</p>
            <p>
              <button className="button" onClick={() => changeName('ays2')}>
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
export default GuideFirstStore;
