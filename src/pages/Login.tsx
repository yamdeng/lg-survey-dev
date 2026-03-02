import logoImage from '@/resources/images/LG-Symbol.jpg';
import ApiService from '@/services/ApiService';
import { useAppStore } from '@/stores/useAppStore';
import { useState } from 'react';
import { useStore } from 'zustand';
import AppButton from '@/components/common/AppButton';
import AppTextInput from '@/components/common/AppTextInput';

// const enableLocalDevelop = __APP_ENV && __APP_ENV === 'local';
const enableLocalDevelop =
  import.meta.env.VITE_LOCAL_DEVELOP && import.meta.env.VITE_LOCAL_DEVELOP === 'true';

function Login() {
  const { setLoginToken } = useStore(useAppStore, (state) => state) as any;
  const [loginId, setLoginId] = useState(enableLocalDevelop ? 'system' : '');
  const [loginPassword, setLoginPassword] = useState(enableLocalDevelop ? 'survey1234' : '');

  const login = async () => {
    const apiParam: any = {};
    apiParam.userId = loginId;
    apiParam.password = loginPassword;
    const apiResult = await ApiService.post('auth/login', apiParam);
    const { accessToken, refreshToken } = apiResult;
    setLoginToken(accessToken, refreshToken);
    location.href = `/`;
  };

  return (
    <>
      <div className="survey">
        <div className="sv-content" style={{ padding: 120, alignItems: 'center' }}>
          <h1 className="login_logo">
            <img src={logoImage} alt="logo" style={{ width: 100, height: 100 }} />
          </h1>
          <p>
            <span>LG 설문조사</span> 로그인페이지입니다.
          </p>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <AppTextInput
                name="userId"
                placeholder="아이디"
                textAlign="center"
                value={loginId}
                onChange={(value) => setLoginId(value)}
                search={login}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <AppTextInput
                name="password"
                placeholder="비밀번호"
                inputType="password"
                textAlign="center"
                value={loginPassword}
                onChange={(value) => setLoginPassword(value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    login();
                  }
                }}
              />
            </div>
            <AppButton theme="secondary" value="로그인" onClick={login}></AppButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
