import LoadingBar from '@/utils/LoadingBar';

function PLoadingBar() {
  const handleClick = () => {
    LoadingBar.show();
  };

  return (
    <>
      <div onClick={handleClick}>로딩바 show</div>
      <p>로딩바가 나오면 다시 페이지를 refresh 해주세요</p>
    </>
  );
}

export default PLoadingBar;
