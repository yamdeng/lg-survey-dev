import Config from '@/config/Config';

function GuideTemplate() {
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              가이드템플릿 :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideTemplate.tsx`}>
                GuideTemplate
              </a>
            </h3>
          </div>
          <div className="content-body"></div>
        </div>
      </main>
    </>
  );
}
export default GuideTemplate;
