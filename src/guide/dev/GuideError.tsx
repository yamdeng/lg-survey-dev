import ApiService from '@/services/ApiService';
import Config from '@/config/Config';
import AppButton from '@/components/common/AppButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const errorTestFunction = () => {
  const fnObject: any = {};
  console.log(`fnObject : ${fnObject.aaa.bbb}`);
};

function GuideError() {
  const navigate = useNavigate();

  const [testObject, setTestObject] = useState<any>({});
  const [testArray, setTestArray] = useState([]);

  // 1.render 직전에 스크립트 오류
  const renderErrorCase1 = () => {
    setTestObject(null);
  };

  // 2.render 자체에서 에러
  const renderErrorCase2 = () => {
    setTestArray([{}]);
  };

  // 3.api 오류 발생시키기
  const apiErrorTest = async () => {
    await ApiService.get('error/etc');
  };

  // 4.자바스크립트 함수 호출해서 오류 발생시키기 : 리액트 컴포넌트 안에 정의한 함수
  const coreFunctionErrorTest = () => {
    errorTestFunction();
  };

  // 5.일반 promise 에서 에러 발생시키기
  const promiseError = () => {
    return Promise.reject({ message: 'test1111' });
  };

  // 6.권한오류
  const apiAccessErrorTest = async () => {
    await ApiService.get('error/403');
  };

  // 7.페이지없음
  const notFoundError = () => {
    navigate('/asdasd/asdasdasd');
  };

  const customButtonStyle = { marginBottom: 10 };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              GuideError :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideError.tsx`}>
                GuideError
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton
              onClick={renderErrorCase1}
              style={customButtonStyle}
              value="1.render 직전에 스크립트 오류"
            />
            <AppButton
              onClick={renderErrorCase2}
              style={customButtonStyle}
              value="2.render 자체에서 에러"
            />
            <AppButton
              onClick={apiErrorTest}
              style={customButtonStyle}
              value="3.api 오류 발생시키기"
            />
            <AppButton
              onClick={coreFunctionErrorTest}
              style={customButtonStyle}
              value="4.자바스크립트 함수 호출해서 오류 발생시키기 : 리액트 컴포넌트 안에 정의한 함수"
            />
            <AppButton
              onClick={promiseError}
              style={customButtonStyle}
              value="5.일반 promise 에서 에러 발생시키기"
            />
            <AppButton onClick={apiAccessErrorTest} style={customButtonStyle} value="6.권한오류" />
            <AppButton onClick={notFoundError} style={customButtonStyle} value="7.페이지없음" />
          </div>
          <p>{testObject.aaa}</p>
          <p>
            {testArray.map((info: any, index) => {
              return <div key={index}>{info.name.bbb}</div>;
            })}
          </p>
        </div>
      </main>
    </>
  );
}
export default GuideError;
