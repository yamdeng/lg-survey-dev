import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import _ from 'lodash';
import { produce } from 'immer';
import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import { navigate } from '@/utils/navigation';

/*

  기본 form slice

*/

export const formBaseState = {
  detailInfo: {},
  errors: {},
  isDirty: false,
  isValid: false,
  formDetailId: null,
  formType: FORM_TYPE_ADD,
  formValue: {},
};

// yup 연동 공통 slice : 가능하면 yup를 사용하는 방법으로 통일합니다
export const createFormSliceYup = (set, get) => ({
  changeStateProps: (propsName, propsValue) => {
    set({ [propsName]: propsValue });
  },

  changeInput: (inputName, inputValue, errorInputName, byPassIsDirty = false) => {
    set(
      produce((state: any) => {
        const formValue = state.formValue;
        const errors = state.errors;
        _.set(formValue, inputName, inputValue);
        if (!byPassIsDirty) {
          state.isDirty = true;
        }
        state.formValue = formValue;
        if (inputValue) {
          state.errors = { ...errors, [errorInputName ? errorInputName : inputName]: '' };
        }
      }),
    );
  },

  changeInputByFormName: (formName, inputName, inputValue, byPassIsDirty = false) => {
    set(
      produce((state: any) => {
        const formValue = state[formName];
        _.set(formValue, inputName, inputValue);
        if (!byPassIsDirty) {
          state.isDirty = true;
        }
        state[formName] = formValue;
      }),
    );
  },

  getApiParam: () => {
    const { detailInfo, formValue, excludeApiKeys } = get();
    const apiParam = { ...detailInfo, ...formValue };
    if (excludeApiKeys && excludeApiKeys.length) {
      excludeApiKeys.forEach((keyName) => {
        if (apiParam[keyName]) {
          delete apiParam[keyName];
        }
      });
    }
    return apiParam;
  },

  getFormValue: () => {
    const { formValue } = get();
    return _.cloneDeep({ ...formValue });
  },

  validate: async () => {
    let success = true;
    const errors = {};
    const { yupFormSchema, getFormValue, formName, disableValidateToast = false } = get();
    const formValue = getFormValue();
    let firstErrorFieldKey = '';
    let firstErrorMessage = '';
    let firstErrorLabel = '';

    try {
      await yupFormSchema.validate(formValue, { abortEarly: false });
    } catch (error: any) {
      success = false;
      console.log(error.errors);
      const yupErrors = error.inner;
      firstErrorFieldKey = yupErrors[0].path;
      const groupErrorInfo = _.groupBy(yupErrors, 'path');
      const errorKeys = Object.keys(groupErrorInfo);
      errorKeys.forEach((errorKey, index) => {
        const groupErrorInfoDetail = groupErrorInfo[errorKey][0];
        const { message, params } = groupErrorInfoDetail;
        const { label } = params;
        if (index === 0) {
          firstErrorMessage = message;
          firstErrorLabel = label || '';
        }
        errors[errorKey] = message;
      });
    }

    if (firstErrorMessage && !disableValidateToast) {
      ToastService.warn(`${firstErrorMessage}(${firstErrorLabel})`);
    }

    if (firstErrorFieldKey) {
      success = false;
      const applyFormName = formName ? formName : '';
      const applyFirstErrorFieldKey = applyFormName + firstErrorFieldKey;
      try {
        if (document.getElementById(applyFirstErrorFieldKey)) {
          document.getElementById(applyFirstErrorFieldKey).focus();
        }
      } catch (e) {
        // 로그를 찍을 필요가 없는 에러 catch
        console.error(e);
      }
    }

    const validateResult = {
      isDirty: true,
      isValid: success,
      errors: errors,
    };

    set(validateResult);
    return validateResult;
  },

  save: async (saveAfterCallback) => {
    const {
      validate,
      customValidate,
      getApiParam,
      customGetApiParam,
      formType,
      formDetailId,
      formApiPath,
      getUpdateUrl,
      cancel,
      byPassSaveCancel,
      saveAfter,
    } = get();
    const applyValidate = customValidate ? customValidate : validate;
    const { isValid } = await applyValidate();
    if (isValid) {
      ModalService.confirm({
        body: '저장하시겠습니까?',
        ok: async () => {
          const apiParam = customGetApiParam ? customGetApiParam() : getApiParam();
          console.log(`apiParam : ${JSON.stringify(apiParam)}`);
          let saveServerData = null;
          if (formType === FORM_TYPE_ADD) {
            const apiResult = await ApiService.post(`${formApiPath}`, apiParam);
            saveServerData = apiResult.data;
          } else {
            const putUrl = getUpdateUrl ? getUpdateUrl() : `${formApiPath}/${formDetailId}`;
            const apiResult = await ApiService.put(putUrl, apiParam);
            saveServerData = apiResult.data;
          }
          await set({ isDirty: false });
          ToastService.success('저장되었습니다.');
          if (!byPassSaveCancel) {
            await cancel();
          }
          if (saveAfter) {
            await saveAfter(saveServerData);
          }
          if (saveAfterCallback) {
            saveAfterCallback();
          }
        },
      });
    }
  },

  remove: async () => {
    const { formDetailId, formApiPath, removeAfterNavigation } = get();
    ModalService.confirm({
      body: '삭제하시겠습니까?',
      ok: async () => {
        await ApiService.delete(`${formApiPath}/${formDetailId}`);
        ModalService.alert({
          body: '삭제되었습니다.',
          ok: async () => {
            removeAfterNavigation();
          },
        });
      },
    });
  },

  getDetail: async (id) => {
    const { formApiPath, convertDetail, getDetailUrl } = get();
    const detailUrl = getDetailUrl ? getDetailUrl(id) : `${formApiPath}/${id}`;
    const response: any = await ApiService.get(detailUrl);
    const detailInfo = response.data;
    const applyDetailInfo = convertDetail ? convertDetail(detailInfo) : detailInfo;
    set({
      detailInfo: applyDetailInfo,
      formValue: applyDetailInfo,
      formDetailId: id,
      formType: FORM_TYPE_UPDATE,
    });
  },

  // 모달 전용으로 formData를 set할때 사용 : initFormValue 기준으로 상세 정보없이 초기화 시키고 싶을떄 사용
  setFormValue: (detailInfo, id = '') => {
    const { initFormValue = {} } = get();
    const copyDetailInfo = detailInfo ? _.cloneDeep(detailInfo) : null;
    const applyFormValue = initFormValue
      ? { ...initFormValue, ...copyDetailInfo }
      : { ...copyDetailInfo };
    set({
      detailInfo: applyFormValue,
      formValue: applyFormValue,
      formDetailId: id,
      formType: id ? FORM_TYPE_UPDATE : FORM_TYPE_ADD,
    });
  },

  goFormPage: () => {
    const { formDetailId, baseRoutePath } = get();
    navigate(`${baseRoutePath}/${formDetailId}/edit`);
  },

  setErrors: (newErrors) => {
    if (newErrors) {
      set({ errors: newErrors });
    }
  },

  changeErrors: (errorKey, errorMessage) => {
    const { errors } = get();
    const newErrors = { ...errors };
    newErrors[errorKey] = errorMessage;
    set({ errors: newErrors });
  },

  removeAfterNavigation: () => {
    const { baseRoutePath } = get();
    navigate(`${baseRoutePath}`, { replace: true });
  },

  cancel: () => {
    const { baseRoutePath } = get();
    navigate(`${baseRoutePath}`);
  },

  clear: () => {
    set({ ...formBaseState });
  },
});
