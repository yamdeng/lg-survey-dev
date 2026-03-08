import { useAppStore } from '@/stores/useAppStore';

// code그룹id 기준으로 original 코드 목록 반환
export const getCodeListByCodeGrpId = (groupCode) => {
  const { codeAllMap } = useAppStore.getState();
  if (groupCode) {
    const searchCodeOptions = codeAllMap[groupCode];
    if (searchCodeOptions && searchCodeOptions.length) {
      return searchCodeOptions;
    }
  }
  return [];
};

// code그룹id + codeValue 기준으로 original 코드 info 반환
export const getCodeInfo = (groupCode, codeValue) => {
  const { codeAllMap } = useAppStore.getState();
  if (groupCode) {
    const searchCodeOptions = codeAllMap[groupCode];
    if (searchCodeOptions && searchCodeOptions.length) {
      return searchCodeOptions.find((info) => info.cd === codeValue);
    }
  }
  return null;
};

// code그룹id + codeValue 기준으로 라벨 반환 : 다국어 반영
export const getCodeLabelByValue = (groupCode, codeValue) => {
  const { codeAllMap } = useAppStore.getState();
  let codeLabel = '';
  if (groupCode && codeValue) {
    const searchCodeOptions = codeAllMap[groupCode];
    if (searchCodeOptions && searchCodeOptions.length) {
      const searchIndex = searchCodeOptions.findIndex((codeInfo) => codeInfo.cd === codeValue);
      if (searchIndex !== -1) {
        const findCodeInfo = searchCodeOptions[searchIndex];
        const { cdNm } = findCodeInfo;
        codeLabel = cdNm;
      }
    }
  }
  return codeLabel;
};

// code그룹id 기준으로 코드 목록 반환 : code / value 키 적용
export const getOptions = (groupCode, applyAllValue = false) => {
  const { codeAllMap } = useAppStore.getState();
  if (groupCode) {
    const codeAllMapOptions = codeAllMap[groupCode];
    if (codeAllMapOptions && codeAllMapOptions.length) {
      const options = codeAllMapOptions.map((info) => {
        const { cdNm, cd } = info;
        const label = cdNm;
        return {
          value: cd,
          label: label,
        };
      });
      if (applyAllValue) {
        return [
          {
            value: '',
            label: '전체',
          },
          ...options,
        ];
      } else {
        return options;
      }
    }
  }
  return [];
};

// 서버에서 받은 값을 기준으로 코드 목록 변환 : code / value 키 적용
export const convertOptions = (options) => {
  if (options && options.length) {
    return options.map((info) => {
      const { cdNm, cd } = info;
      const label = cdNm;
      return {
        value: cd,
        label: label,
      };
    });
  }
  return [];
};

const CodeService = {
  getCodeListByCodeGrpId,
  getCodeInfo,
  getOptions,
  getCodeLabelByValue,
  convertOptions,
};

export default CodeService;
