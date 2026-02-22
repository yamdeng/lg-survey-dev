import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import { create } from 'zustand';

/* yup validation */
const yupFormSchema = yup.object({
  boardTitle: yup.string().required('게시판 제목을 입력해주세요.'),
  boardType: yup.string().required('게시판 유형을 선택해주세요.'),
  boardContent: yup.string().nullable(), // 목록에서 숨김 처리되나 상세 데이터용
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

  formApiPath: 'notices',
  baseRoutePath: 'dev-pattern/GuidePatternTable1',
  formName: '',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
export const useGuidePatternFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));
