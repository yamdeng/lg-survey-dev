import Config from '@/config/Config';
import AppButton from '@/components/common/AppButton';
import { useNavigate } from 'react-router-dom';
import { globalNavigate } from '@/utils/navigation';

function GuideNavigate() {
  const navigate = useNavigate();

  const customButtonStyle = { marginBottom: 10 };
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              navigate 예제 :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideNavigate.tsx`}>
                GuideNavigate
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton
              style={customButtonStyle}
              onClick={() => navigate('/guides/dev/GuideToastService')}
              value="react-router-dom의 navigate 사용법"
            />
            <AppButton
              style={customButtonStyle}
              onClick={() => globalNavigate('/guides/dev/GuideLoadingBar')}
              value="공통 유틸 navigate"
            />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideNavigate;
