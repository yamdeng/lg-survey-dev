import useSecondStore from '@/guide/stores/useSecondStore';

function SecondStoreTest() {
  const { name, changeName, age, changeAge } = useSecondStore();

  return (
    <>
      <div>
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
    </>
  );
}
export default SecondStoreTest;
