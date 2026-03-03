import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import { create } from 'zustand';
import { produce } from 'immer';

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

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'notices',
  baseRoutePath: '/notices',
  formName: '',
  formValue: {
    ...initFormValue,
  },
  fileList: [],
  addFileKeyList: [],
  deleteFileKeyList: [],
};

/* zustand store 생성 */
export const useNoticeFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  getApiParam: () => {
    const { formValue, addFileKeyList, deleteFileKeyList } = get();
    const apiParam = { ...formValue };
    apiParam.addFileKeyList = addFileKeyList;
    apiParam.deleteFileKeyList = deleteFileKeyList;
    return apiParam;
  },

  convertDetail: (detailInfo) => {
    const fileList = detailInfo.fileList;
    if (fileList && fileList.length) {
      set({ fileList: fileList });
    }
    return detailInfo;
  },

  // 파일 추가
  addFileList: (newFileList) => {
    if (!newFileList || newFileList.length === 0) return;

    set(
      produce((draft: any) => {
        // 기존 fileList 배열 뒤에 새로운 파일들을 붙입니다.
        draft.fileList.push(...newFileList);

        // 서버 전송용 신규 파일 키 리스트에 추가
        const newKeys = newFileList.map((file) => file.fileKey);
        draft.addFileKeyList.push(...newKeys);
      }),
    );
  },

  // 파일 삭제
  deleteFile: (fileKey) => {
    set(
      produce((draft: any) => {
        // 1) 화면 표시용 리스트에서 제거
        const index = draft.fileList.findIndex((file) => file.fileKey === fileKey);
        if (index !== -1) {
          draft.fileList.splice(index, 1);
        }

        // 2) 만약 방금 추가(addFileKeyList)했던 파일이라면 해당 리스트에서도 제거 (변심 취소)
        const addIdx = draft.addFileKeyList.indexOf(fileKey);
        if (addIdx !== -1) {
          draft.addFileKeyList.splice(addIdx, 1);
        } else {
          // 3) 기존에 저장되어 있던 파일이라면 삭제 리스트(deleteFileKeyList)에 추가
          if (!draft.deleteFileKeyList.includes(fileKey)) {
            draft.deleteFileKeyList.push(fileKey);
          }
        }
      }),
    );
  },

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue }, fileList: [] });
  },
}));
