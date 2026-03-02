import Config from '@/config/Config';
import FirstStoreTest from './FirstStoreTest';
import SecondStoreTest from './SecondStoreTest';

function GuideZustandStoreCommunication() {
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              store 간의 소통 방법 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/store/GuideZustandStoreCommunication.tsx`}
              >
                GuideZustandStoreCommunication
              </a>
            </h3>
          </div>
          <div className="content-body">
            <FirstStoreTest />
            <SecondStoreTest />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideZustandStoreCommunication;
