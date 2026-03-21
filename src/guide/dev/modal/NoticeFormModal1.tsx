import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSelect from '@/components/common/AppSelect';
import AppTextEditor from '@/components/common/AppTextEditor';
import AppTextInput from '@/components/common/AppTextInput';
import Code from '@/config/Code';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { Modal } from 'antd';
import { Check, X } from 'lucide-react';
import { create } from 'zustand';
import * as yup from 'yup';
import { useEffect } from 'react';
import { FORM_TYPE_ADD } from '@/config/CommonConstant';

/* yup validation */
const yupFormSchema = yup.object({
  boardTitle: yup.string().required('게시판 제목을 입력해주세요.'),
  boardType: yup.string().required('게시판 유형을 선택해주세요.'),
  boardContent: yup
    .string()
    .test('is-empty', '내용을 입력해주세요', (value) => {
      if (!value) return false;
      // 1. HTML 태그 제거
      // 2. 공백 문자(&nbsp; 등) 제거
      const cleanText = value
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, '')
        .trim();
      return cleanText.length > 0; // 실제 글자가 있어야 통과
    })
    .required('내용을 입력해주세요'),
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

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  byPassSaveCancel: true /* 매우중요! */,
  formApiPath: 'notices',
  baseRoutePath: '/notices',
  formName: '',
  formValue: {
    ...initFormValue,
  },
};

const useNoticeFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue }, fileList: [] });
  },
}));

/* store 연동 모달 */
function NoticeFormModal1(props) {
  const { isOpen, formInfo, detailId, closeModal, okModal } = props;

  /* formStore state input 변수 */
  const { errors, changeInput, formValue, formType, getDetail, save, clear, setFormValue } =
    useNoticeFormStore();

  const { boardType, boardTitle, boardContent, useYn, mainYn, boardAuthType, securityLevel } =
    formValue;

  const handleSave = () => {
    save(okModal);
  };

  useEffect(() => {
    if (isOpen) {
      if (formInfo || detailId) {
        if (formInfo) {
          setFormValue(formInfo, formInfo.boardKey);
        }
        if (detailId) {
          getDetail(detailId);
        }
      } else {
        setFormValue(initFormValue);
      }
    } else {
      clear();
    }
  }, [isOpen, formInfo]);

  useEffect(() => {
    clear();
  }, []);

  return (
    <Modal
      width={800} // 직접 props로 전달 (숫자는 px 단위)
      centered // 양이 많으므로 화면 중앙에 배치 추천
      closable={true}
      title={formType === FORM_TYPE_ADD ? '공지사항 등록' : ' 공지사항수정'}
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div>
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
            <AppButton icon={<Check size={18} />} value="저장" onClick={handleSave} />
            <AppButton icon={<X size={18} />} value="취소" theme="secondary" onClick={closeModal} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NoticeFormModal1;
