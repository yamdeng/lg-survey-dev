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
      return searchCodeOptions.find((info) => info.code === codeValue);
    }
  }
  return null;
};

// code그룹id 기준으로 코드그룹정보 가져오기
export const getCodeGroupInfo = (searchCodeGrpId, manualLocale = '') => {
  const { currentLocale } = useAppStore.getState();
  const applyLocale = manualLocale ? manualLocale : currentLocale;
  const fistCodeInfo = getCodeListByCodeGrpId(searchCodeGrpId)[0];
  const { groupCode, groupName, groupNameEn } = fistCodeInfo;
  return {
    value: groupCode,
    label: applyLocale === 'en' ? groupNameEn : groupName,
  };
};

// code그룹id + codeValue 기준으로 라벨 반환 : 다국어 반영
export const getCodeLabelByValue = (groupCode, codeValue, manualLocale = '') => {
  const { codeAllMap, currentLocale } = useAppStore.getState();
  const applyLocale = manualLocale ? manualLocale : currentLocale;
  let codeLabel = '';
  if (groupCode && codeValue) {
    const searchCodeOptions = codeAllMap[groupCode];
    if (searchCodeOptions && searchCodeOptions.length) {
      const searchIndex = searchCodeOptions.findIndex((codeInfo) => codeInfo.code === codeValue);
      if (searchIndex !== -1) {
        const findCodeInfo = searchCodeOptions[searchIndex];
        const { codeName, codeNameEn } = findCodeInfo;
        codeLabel = codeName;
        if (applyLocale === 'en') {
          codeLabel = codeNameEn;
        }
      }
    }
  }
  return codeLabel;
};

// code그룹id 기준으로 코드 목록 반환 : code / value 키 적용
export const getOptions = (groupCode, manualLocale = '') => {
  const { codeAllMap, currentLocale } = useAppStore.getState();
  const applyLocale = manualLocale ? manualLocale : currentLocale;
  if (groupCode) {
    const codeAllMapOptions = codeAllMap[groupCode];
    if (codeAllMapOptions && codeAllMapOptions.length) {
      const searchCodeOptions = codeAllMapOptions.filter((info) => info.useYn === 'Y');
      const options = searchCodeOptions.map((info) => {
        const { codeName, codeNameEn, code, codeField1 } = info;
        let label = codeName;
        if (applyLocale === 'en') {
          label = codeNameEn;
        }
        return {
          value: code,
          label: label,
          codeField1: codeField1,
        };
      });
      return options;
    }
  }
  return [];
};

// code그룹id 기준으로 코드 목록 반환 : code / value 키 적용
export const getOptionsByCodeFieldId = (groupCode, codeFieldId, manualLocale = '') => {
  const { codeAllMap, currentLocale } = useAppStore.getState();
  const applyLocale = manualLocale ? manualLocale : currentLocale;
  if (groupCode) {
    const searchCodeOptions = codeAllMap[groupCode];
    if (searchCodeOptions) {
      const options = searchCodeOptions
        .filter((info) => info.codeField1 === codeFieldId)
        .map((info) => {
          const { codeName, codeNameEn, code } = info;
          let label = codeName;
          if (applyLocale === 'en') {
            label = codeNameEn;
          }
          return {
            value: code,
            label: label,
          };
        });
      return options;
    }
  }
  return [];
};

// 서버에서 받은 값을 기준으로 코드 목록 변환 : code / value 키 적용
export const convertOptionsByCurrentLocale = (options, manualLocale = '') => {
  const { currentLocale } = useAppStore.getState();
  const applyLocale = manualLocale ? manualLocale : currentLocale;
  if (options && options.length) {
    return options.map((info) => {
      const { codeName, codeNameEn, code } = info;
      let label = codeName;
      if (applyLocale === 'en') {
        label = codeNameEn;
      }
      return {
        value: code,
        label: label,
      };
    });
  }
  return [];
};

const CodeService = {
  getCodeListByCodeGrpId,
  getCodeInfo,
  getCodeGroupInfo,
  getOptions,
  getCodeLabelByValue,
  convertOptionsByCurrentLocale,
};

export default CodeService;
