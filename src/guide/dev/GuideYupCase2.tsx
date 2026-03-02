import Config from '@/config/Config';
import AppTextInput from '@/components/common/AppTextInput';
import { useState } from 'react';
import * as yup from 'yup';
import { useImmer } from 'use-immer';
import CommonUtil from '@/utils/CommonUtil';

const formName = 'SysMessageForm';

/* yup validation */
const yupFormSchema = yup.object().shape({
  msgKey: yup.string().required(),
  msgKor: yup.string().required(),
  msgEng: yup.string().required(),
  msgChn: yup.string(),
  childeList1: yup
    .array()
    .min(1, '목록은 최소 하나여야 합니다.')
    .of(
      yup.object().shape({
        name: yup.string().required('Name is a required field'),
        age: yup.number().required('age is a required field'),
        content: yup.string().required('content is a required field'),
      }),
    ),
});

// const childeList1 = [];
const childeList1 = [
  { name: '', age: null },
  { name: 'aaa', age: null, content: '' },
];

/* form 초기화 */
const initFormValue = {
  msgKey: 'aa',
  msgKor: '',
  msgEng: 'c',
  msgChn: '',
  childeList1: childeList1,
};

function GuideYupCase2() {
  const [formValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});

  const save = async () => {
    const validateResult = await CommonUtil.validateYupForm(yupFormSchema, formValue);
    const { success, firstErrorFieldKey, errors } = validateResult;
    if (!success) {
      setErrors(errors);
      if (formName + firstErrorFieldKey) {
        document.getElementById(formName + firstErrorFieldKey).focus();
      }
    }
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              yup case(object, child(list)) :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideYupCase2.tsx`}>
                GuideYupCase2
              </a>
            </h3>
          </div>
          <div className="content-body">
            <h1>마스터 정보</h1>
            <div>
              <AppTextInput id={formName + 'msgKey'} errorMessage={errors.msgKey} />
            </div>
            <div>
              <AppTextInput id={formName + 'msgKor'} errorMessage={errors.msgKor} />
            </div>
            <div>
              <AppTextInput id={formName + 'msgEng'} errorMessage={errors.msgEng} />
            </div>
            <div>
              <AppTextInput id={formName + 'msgChn'} errorMessage={errors.msgChn} />
            </div>

            <h1>{errors.childeList1}</h1>

            <h1>하위 정보</h1>

            <div>
              {childeList1.map((childInfo, index) => {
                // const { name, age, content } = childInfo;
                return (
                  <div key={index}>
                    <div>
                      <AppTextInput
                        id={formName + `childeList1[${index}].name`}
                        errorMessage={errors[`childeList1[${index}].name`]}
                      />
                    </div>
                    <div>
                      <AppTextInput
                        id={formName + `childeList1[${index}].age`}
                        errorMessage={errors[`childeList1[${index}].age`]}
                      />
                    </div>
                    <div>
                      <AppTextInput
                        id={formName + `childeList1[${index}].content`}
                        errorMessage={errors[`childeList1[${index}].content`]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
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
export default GuideYupCase2;
