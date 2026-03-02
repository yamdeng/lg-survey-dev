import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSelect from '@/components/common/AppSelect';
import AppTextEditor from '@/components/common/AppTextEditor';
import AppTextInput from '@/components/common/AppTextInput';
import Code from '@/config/Code';
import CommonUtil from '@/utils/CommonUtil';
import { Check, FilePenLine } from 'lucide-react';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import * as yup from 'yup';
import ToastService from '@/services/ToastService';

/* yup validation */
const yupFormSchema = yup.object({
  boardTitle: yup.string().required('게시판 제목을 입력해주세요.'),
  boardType: yup.string().required('게시판 유형을 선택해주세요.'),
  boardContent: yup.string().required('내용을 입력해주세요'), // 목록에서 숨김 처리되나 상세 데이터용
  useYn: yup.string().default('Y'),
  mainYn: yup.string().default('N'),
  boardAuthType: yup.string().nullable(),
  securityLevel: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .nullable(), // 숫자형 대응
});

/* formValue 초기값 */
const initFormValue = {
  boardTitle: '',
  boardType: 'notice',
  boardContent: '',
  useYn: 'Y', // 사용 여부 기본값 Y
  mainYn: 'N', // 메인 노출 기본값 N
  boardAuthType: 'ALL',
  securityLevel: '1', // 숫자 필드는 null 혹은 기본값 설정
};

const GuidePatternForm2 = () => {
  /* formStore state input 변수 */

  const [formValue, setFormValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});

  const { boardType, boardTitle, boardContent, useYn, mainYn, boardAuthType, securityLevel } =
    formValue;

  const changeInput = async (inputName: string, inputValue: any) => {
    setFormValue((draft) => {
      draft[inputName] = inputValue;
    });

    try {
      await yupFormSchema.validateAt(inputName, {
        ...formValue,
        [inputName]: inputValue,
      });

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [inputName]: null,
      }));
    } catch (error: any) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [inputName]: error.message,
      }));
    }
  };

  const save = async () => {
    const validateResult = await CommonUtil.validateYupForm(yupFormSchema, formValue);
    const { success, firstErrorFieldKey, firstErrorMessage, errors } = validateResult;
    const applyFirstErrorFieldKey = firstErrorFieldKey;
    const firstInputDom = document.getElementById(applyFirstErrorFieldKey);
    const firstEditorDom: any = document.querySelector(`#${applyFirstErrorFieldKey} .ql-editor`);
    if (!success) {
      setErrors(errors);
      if (firstEditorDom) {
        setTimeout(() => {
          firstEditorDom.focus();
        }, 10);
      } else if (firstInputDom) {
        firstInputDom.focus();
      }
      ToastService.warn(`${firstErrorMessage}`);
    }
  };

  return (
    <main className="content-main">
      <div className="content-inner">
        <div className="content-title">
          <FilePenLine size={18} />
          <h3 className="title-text">폼 예시(store)</h3>
        </div>
        <div className="content-body">
          <div className="content-block-modify">
            <table className="modify-table">
              <colgroup>
                <col width="12%" />
                <col width="30%" />
                <col width="12%" />
                <col width="46%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="title">제목</label>
                  </th>
                  <td colSpan={3}>
                    <AppTextInput
                      id="boardTitle"
                      name="queryJavaName"
                      style={{ width: 500 }}
                      value={boardTitle}
                      onChange={(value) => changeInput('boardTitle', value)}
                      errorMessage={errors.boardTitle}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="writer">게시판유형</label>
                  </th>
                  <td colSpan={3}>
                    <AppSelect
                      id="boardType"
                      options={Code.boardType}
                      style={{ width: 250 }}
                      value={boardType}
                      onChange={(value) => changeInput('boardType', value)}
                      errorMessage={errors.boardType}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={4}>
                    <div className="textEdit">
                      <AppTextEditor
                        id="boardContent"
                        value={boardContent}
                        onChange={(value) => changeInput('boardContent', value)}
                        errorMessage={errors.boardContent}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="range">사용여부</label>
                  </th>
                  <td>
                    <AppSelect
                      id="useYn"
                      options={Code.useYn}
                      style={{ width: 100 }}
                      value={useYn}
                      onChange={(value) => changeInput('useYn', value)}
                      errorMessage={errors.useYn}
                      required
                    />
                  </td>
                  <th>
                    <label htmlFor="exposure">메인노출 여부</label>
                  </th>
                  <td>
                    <AppCodeSelect
                      id="mainYn"
                      codeGrpId="MAIN_DISPLAY_YN"
                      style={{ width: 100 }}
                      value={mainYn}
                      onChange={(value) => changeInput('mainYn', value)}
                      errorMessage={errors.mainYn}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="range">게시판권한유형</label>
                  </th>
                  <td>
                    <AppCodeSelect
                      id="boardAuthType"
                      codeGrpId="BOARD_AUTH_TYPE"
                      style={{ width: 150 }}
                      value={boardAuthType}
                      onChange={(value) => changeInput('boardAuthType', value)}
                      errorMessage={errors.boardAuthType}
                      required
                    />
                  </td>
                  <th>
                    <label htmlFor="exposure">보안레벨</label>
                  </th>
                  <td>
                    <AppCodeSelect
                      id="securityLevel"
                      codeGrpId="USER_LEVEL"
                      options={Code.securityLevel}
                      style={{ width: 150 }}
                      value={securityLevel}
                      onChange={(value) => changeInput('securityLevel', value)}
                      errorMessage={errors.securityLevel}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="btn-group-end">
            <AppButton icon={<Check size={18} />} value="저장" onClick={save} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuidePatternForm2;
