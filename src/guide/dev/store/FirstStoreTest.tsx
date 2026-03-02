import useFirstStore from '@/guide/stores/useFirstStore';

function FirstStoreTest() {
  const { name, changeName, age, changeAge } = useFirstStore();

  return (
    <>
      <div>
        FirstStoreTest test
        <br />
        <p>name : {name}</p>
        <p>age : {age}</p>
        <p>
          <button className="app-btn primary small" onClick={() => changeName('ays2')}>
            changeName
          </button>
        </p>
        <p>
          <button className="app-btn primary small" onClick={() => changeAge(28)}>
            changeAge
          </button>
        </p>
      </div>
    </>
  );
}
export default FirstStoreTest;
