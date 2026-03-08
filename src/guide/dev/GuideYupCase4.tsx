import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';
import * as Yup from 'yup';

const yupCheckListData = [
  {
    dataTestId: '1',
    name: 'test1',
    age: 10,
    desc: '',
    status: '대기',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '2',
    name: '',
    age: 11,
    desc: '',
    status: '진행중',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '3',
    name: 'aaa',
    age: 11,
    desc: 'ccc',
    status: '진행중',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
];

const listSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required('이름은 필수 입력 항목입니다.'),
    desc: Yup.string().required('이름은 필수 입력 항목입니다.'),
    userLevel: Yup.string().required('사용자 레벨이 없습니다.'),
  }),
);

function GuideYupCase4() {
  const save = async () => {
    // const result = await CommonUtil.validateYupForm(listSchema, yupCheckListData);
    const result = await CommonUtil.applyErrorByList(listSchema, yupCheckListData);
    console.log(result);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              list yup :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideYupCase4.tsx`}>
                GuideYupCase4
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p style={{ fontWeight: 'bold', fontSize: 20, padding: 10 }}>
              <button className="app-btn primary small" onClick={save}>
                유효성체크(list)
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideYupCase4;
