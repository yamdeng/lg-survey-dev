import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';
import * as Yup from 'yup';

const case1YupSchema = Yup.object().shape({
  parentField: Yup.string().required('parentField는 필수입니다.'),
  childField: Yup.string().when('parentField', {
    is: 'someValue2',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
});

const case2YupSchema = Yup.object().shape({
  parentField: Yup.string(),
  event: Yup.object().shape({
    findNotifyCd: Yup.string().required(),
    findTypeCd: Yup.string().when('findNotifyCd', {
      is: '10',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema,
    }),
  }),
});

// // 테스트 데이터
const case1Value = {
  parentField: 'someValue',
  childField: '', // childField가 비어 있을 경우, parentField가 'someValue'이면 에러 발생
};

const case2Value = {
  parentField: 'someValue',
  event: {
    findNotifyCd: '20',
    findTypeCd: '',
  },
};

function GuideYupCase3() {
  const save = async () => {
    const validateResult = await CommonUtil.validateYupForm(case1YupSchema, case1Value);
    console.log(validateResult);
    const validateResult2 = await CommonUtil.validateYupForm(case2YupSchema, case2Value);
    console.log(validateResult2);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              yup use function :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideYupCase3.tsx`}>
                GuideYupCase3
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p style={{ fontWeight: 'bold', fontSize: 20, padding: 10 }}>
              <button className="app-btn primary small" onClick={save}>
                유효성체크(when)
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideYupCase3;
