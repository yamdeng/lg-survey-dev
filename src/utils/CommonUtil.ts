import {
  DATE_PICKER_TYPE_DATE,
  DATE_PICKER_TYPE_MONTH,
  DATE_PICKER_TYPE_QUARTER,
  DATE_PICKER_TYPE_YEAR,
  ERROR_TYPE_CORE,
} from '@/config/CommonConstant';
import { useAppStore } from '@/stores/useAppStore';
import { useUIStore } from '@/stores/useUIStore';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { navigate } from '@/utils/navigation';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { Cookies } from 'react-cookie';
import Logger from './Logger';

const cookies = new Cookies();

// Message Template 반영
const formatString = (template, ...args) => {
  return template.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === 'undefined' ? match : args[index];
  });
};

const saveInfoToLocalStorage = (key, value) => {
  if (value === null || value === undefined) {
    localStorage.setItem(key, '');
  } else if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to stringify value for localStorage:', e);
    }
  }
};

// 로컬 스토리지 삭제
const removeToLocalStorage = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};

// 로컬 스토리지에 정보 가져오기 : json object로 가져옴
const getByLocalStorage = (key) => {
  const jsonString = localStorage.getItem(key);

  if (!jsonString) return null;

  try {
    // 문자열이 JSON 구조인지 아닌지 체크
    if (jsonString.startsWith('{') || jsonString.startsWith('[')) {
      return JSON.parse(jsonString);
    }
    return jsonString; // 순수 문자열이면 그대로 반환
  } catch (e) {
    Logger.error(`localStorage getByLocalStorage error : ${e}`);
    return jsonString; // 파싱 실패해도 그냥 문자열 반환
  }
};

// <AppTable /> rowSpan 반영하기 위한 데이터 사전작업 반영
const applyGroupingRowSpanByPageSize = (data, columnName, pageSize = 1000000) => {
  let applyRowIndex = 0;
  let rowSpanGroupCount = 1;
  let diffValue = '';

  for (let index = 0; index < data.length; index++) {
    const dataInfo = data[index];
    const currentValue = dataInfo[columnName];
    if (index !== 0 && index % pageSize === 0) {
      data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
      rowSpanGroupCount = 1;
      applyRowIndex = index;
    } else {
      if (diffValue === currentValue) {
        rowSpanGroupCount++;
        if (index === data.length - 1) {
          data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
        }
      } else {
        data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
        rowSpanGroupCount = 1;
        applyRowIndex = index;
      }
    }
    diffValue = currentValue;
  }
  return _.cloneDeep(data);
};

// tree 구조의 데이터를 list 자료구조로 반영
function treeDataToList(treeInfo, allList) {
  allList.push(treeInfo);
  if (treeInfo.children && treeInfo.children.length) {
    treeInfo.children.forEach((childrenInfo) => {
      treeDataToList(childrenInfo, allList);
    });
  }
}

function listToTreeData(items, treeKey, treeParentKey, rootValue) {
  const rootItems = [];
  const lookup = {};

  for (const item of items) {
    const lookUpTreeValue = item[treeKey];
    const lookUpTreeParentValue = item[treeParentKey];

    if (!lookup[lookUpTreeValue]) {
      lookup[lookUpTreeValue] = { children: [] };
    }

    lookup[lookUpTreeValue] = {
      ...item,
      children: lookup[lookUpTreeValue].children,
    };

    if (lookUpTreeParentValue === rootValue) {
      rootItems.push(lookup[lookUpTreeValue]);
    } else {
      if (!lookup[lookUpTreeParentValue]) {
        lookup[lookUpTreeParentValue] = { children: [] };
      }
      lookup[lookUpTreeParentValue].children.push(lookup[lookUpTreeValue]);
    }
  }

  // 정렬 함수 정의
  function sortChildrenRecursive(nodes) {
    if (!nodes || nodes.length === 0) return;

    nodes.sort((a, b) => {
      if (a.orgType) {
        if (a.orgType !== b.orgType) {
          return a.orgType === 'D' ? -1 : 1;
        }
      }

      const aSort = a.sortIndex ?? 0;
      const bSort = b.sortIndex ?? 0;
      return aSort - bSort;
    });

    for (const node of nodes) {
      sortChildrenRecursive(node.children);
    }
  }

  // 최종 정렬
  sortChildrenRecursive(rootItems);

  return rootItems;
}

// 검색된 키 목록을 기준으로 전체 트리 목록에서 펼쳐져야하는 key 목록을 셋탱해줌 : 검색된 정보의 상위 트리를 열어줘야 함
const addExpandedKeys = function (allList, resultKeys, info, key, parentKey) {
  if (info) {
    resultKeys.push(info[key]);
    const searchIndex = _.findIndex(allList, (tree) => {
      return tree[key] === info[parentKey];
    });
    addExpandedKeys(allList, resultKeys, allList[searchIndex], key, parentKey);
  }
};

// <AppDatePicker/> <AppRangeDatePicker/> 에 적용될 dateFormat 반환
const getDateFormatByPickerType = (pickerType, useWithTimePicker, excludeSecondsTime) => {
  if (pickerType === DATE_PICKER_TYPE_DATE) {
    if (useWithTimePicker) {
      if (excludeSecondsTime) {
        return 'YYYY-MM-DD HH:mm';
      } else {
        return 'YYYY-MM-DD HH:mm:ss';
      }
    } else {
      return 'YYYY-MM-DD';
    }
  } else if (pickerType === DATE_PICKER_TYPE_MONTH) {
    return 'YYYY-MM';
  } else if (pickerType === DATE_PICKER_TYPE_YEAR) {
    return 'YYYY';
  } else if (pickerType === DATE_PICKER_TYPE_QUARTER) {
    return `YYYY-MM-DD`;
  }
};

// 'YYYY-MM-DD'인 날짜를 분기 문자열로 변환
const convertDateToQuarterValueString = (dateStringInfo) => {
  let result = null;
  if (dateStringInfo) {
    if (Array.isArray(dateStringInfo)) {
      if (dateStringInfo.length) {
        result = dateStringInfo.map((dateString) =>
          dayjs(dateString, 'YYYY-MM-DD').format('YYYY-[Q]Q'),
        );
      }
    } else {
      result = dayjs(dateStringInfo, 'YYYY-MM-DD').format('YYYY-[Q]Q');
    }
  }

  return result;
};

/**
 *
 * @param params : query string으로 변환할 object
 * 예시) { page:1, pageSize: 10} : ?page=1&pageSize=10
 * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
 */
const objectToQueryString = (params: object): string => {
  const urlSearchParamsInstance = new URLSearchParams(params as Record<string, string>);

  return urlSearchParamsInstance.toString() ? '?' + urlSearchParamsInstance.toString() : '';
};

// []의 값을 하나의 파라미터 값 기준으로 queryString conver
const getQueryStringByArray = (parameterName: string, arr: string[]): string => {
  let result = '';
  if (arr && arr.length) {
    for (let arrIndex = 0; arrIndex < arr.length; arrIndex++) {
      const stringValue = arr[arrIndex];
      if (arrIndex === 0) {
        result = result + `?${encodeURIComponent(parameterName)}=` + stringValue;
      } else {
        result = result + `&${encodeURIComponent(parameterName)}=` + stringValue;
      }
    }
  }

  return result;
};

const getUUID = () => {
  return nanoid();
};

// yup validate 공통 함수
const validateYupForm = async (yupFormSchema, formValue) => {
  let success = true;
  let firstErrorFieldKey = '';
  const errors = {};
  try {
    await yupFormSchema.validate(formValue, { abortEarly: false });
  } catch (error: any) {
    success = false;
    console.log(error.errors);
    const yupErrors = error.inner;
    firstErrorFieldKey = yupErrors[0].path;
    const groupErrorInfo = _.groupBy(yupErrors, 'path');
    const errorKeys = Object.keys(groupErrorInfo);
    errorKeys.forEach((errorKey) => {
      errors[errorKey] = groupErrorInfo[errorKey][0].message;
    });
  }
  return { success, firstErrorFieldKey, errors };
};

const getNowByServerTime = (dateType = 'dateTime') => {
  const serverTimeDiffSecondValue = getByLocalStorage('serverTimeDiffSecondValue') || 0;
  const resultDate = dayjs().add(serverTimeDiffSecondValue, 'second');
  if (dateType === 'date') {
    return resultDate.format('YYYY-MM-DD');
  } else {
    return resultDate.format('YYYY-MM-DD HH:mm:ss');
  }
};

const convertNumberFormat = (numberValue) => {
  const result = '';
  if (numberValue !== null && numberValue !== undefined) {
    return Number(numberValue).toLocaleString();
  }
  return result;
};

// 전역 promise 에러 handle
const handleGlobalUnhandledRejection = function (event) {
  const reason = event.reason;
  if (reason) {
    const errorType = reason.errorType || '';
    if (reason instanceof AxiosError || errorType === 'api') {
      const apiConfig = reason.config || {};
      if (reason.response && reason.response.status === 401) {
        return;
      }

      const appErrorObject = {
        errorType: 'api',
        message: reason.message,
        url: apiConfig.url || '',
        method: apiConfig.method || '',
        stack: reason.stack ? reason.stack : '',
      };
      // 서버 api 오류는 error 정보를 전달하지 않는다
      Logger.info('server api error : ' + JSON.stringify(appErrorObject));
    } else {
      const appErrorObject = {
        errorType: 'otherpromis',
        message: reason.message || reason.toString(),
        stack: reason.stack ? reason.stack : '',
      };
      Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));
    }
  }
};

// 전역 오류 에러 handle
const handleGlobalError = function (message, sourceUrl, lineNumber, column, errorObject) {
  if (sourceUrl && sourceUrl.includes('.vite')) {
    // Vite와 관련된 에러는 무시
    return true;
  }
  const { lastErrorMessage, lastSourceUrl } = useUIStore.getState();
  if (message && sourceUrl) {
    if (lastErrorMessage === message && sourceUrl === lastSourceUrl) {
      return true;
    }
    useUIStore.getState().changeErrorInfo(message, sourceUrl);
  }
  errorObject = errorObject || {};
  if (errorObject && typeof errorObject === 'string') {
    errorObject = {
      message: errorObject,
    };
  }
  if (!errorObject.message) {
    errorObject.message = message || 'no_message';
  }

  // full error message
  let displayErrorMessage = '';
  displayErrorMessage = displayErrorMessage + 'url : ' + sourceUrl + '\n';
  displayErrorMessage = displayErrorMessage + 'lineNumber : ' + lineNumber + '\n';
  displayErrorMessage = displayErrorMessage + 'column : ' + column + '\n';
  displayErrorMessage = displayErrorMessage + 'message : ' + errorObject.message + '\n';

  // message, stack, errorType
  const appErrorObject: any = {
    errorType: errorObject.errorType || ERROR_TYPE_CORE,
    message: displayErrorMessage,
  };
  if (errorObject.stack) {
    appErrorObject.statck = errorObject.stack;
  }
  Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));

  return false;
};

// yup error 기준으로 오류가 난 list index 추출, 첫번째 에러 정보 반환(row의 어떤 컬럼이 오류가 났는지)
const getYupListErrorInfo = (yupErrors, firstErrorPath, listKey = 'list') => {
  const validResult: any = {
    firstListErrorPath: '',
    firstErrorIndex: -1,
    isListFirstError: false,
    listErrorIndexList: [],
  };
  const listErrorIndexList = yupErrors
    .filter((error) => error.path.startsWith(listKey))
    .map((error) => {
      // const match = error.path.match(/list\[(\d+)\]/);
      const regex = listKey ? new RegExp(`${listKey}\\[(\\d+)\\]`) : new RegExp(`\\[(\\d+)\\]`);
      const match = error.path.match(regex);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((index) => index !== null);

  // 첫 번째 에러와 해당 경로 추출
  if (listErrorIndexList.length > 0) {
    const applyListErrorIndexList = _.uniq(listErrorIndexList);
    const firstErrorIndex = applyListErrorIndexList[0];
    const firstError = yupErrors.find(
      (error) => error.path.indexOf(`${listKey}[${firstErrorIndex}]`) !== -1,
    );
    validResult.listErrorIndexList = applyListErrorIndexList;
    validResult.firstListErrorPath = firstError.path;
    validResult.firstErrorIndex = firstErrorIndex;
    // 첫번째 에러가 list 에러면은 flag 반영
    if (firstErrorPath === validResult.firstListErrorPath) {
      validResult.isListFirstError = true;
    }
  }
  return validResult;
};

const getNowDateString = (displayFormat = 'YYYY-MM-DD') => {
  return dayjs().format(displayFormat);
};

const getNowMonthString = (displayFormat = 'YYYY-MM') => {
  return dayjs().format(displayFormat);
};

// date value를 custom한 format으로 변환
const convertDate = (value, valueFormat, displayFormat = '') => {
  let displayDate = '';
  const applyDisplayFormat = displayFormat ? displayFormat : valueFormat;
  if (value) {
    displayDate = dayjs(value, valueFormat).format(applyDisplayFormat);
  }
  return displayDate;
};

const getDateListByMonth = (searchMonth, monthFormat = 'YYYY-MM') => {
  const result = [];
  const dateFormat = 'YYYYMMDD';
  const firstDateString = dayjs(searchMonth, monthFormat).startOf('month').format(dateFormat);
  const endDateString = dayjs(searchMonth, monthFormat).endOf('month').format(dateFormat);

  // dateString : '20240901'
  // date : 1 ~ 31
  // weekday : 0 ~ 6

  let dayPlusIndex = 0;

  while (dayPlusIndex < 32) {
    const nextDate = dayjs(firstDateString, dateFormat).add(dayPlusIndex, 'day');
    const nextDateString = nextDate.format(dateFormat);
    const weekday = nextDate.day();
    result.push({
      dateString: nextDateString,
      date: nextDate.date(),
      weekday: nextDate.day(),
      isHoliday: weekday === 0,
      isSaturday: weekday === 6,
    });
    if (nextDateString === endDateString) {
      break;
    }
    dayPlusIndex++;
  }

  return result;
};

const convertWeekDayList = (dataList) => {
  const result = [];
  // 0 ~ 6 : 일 ~ 토
  let weekDayList = [null, null, null, null, null, null, null];
  // for : 1~31일 반복함
  for (let index = 0; index < dataList.length; index++) {
    // 해당 일에 요일 정보를 가져옴 : 일 ~ 토
    const dayInfo = dataList[index];
    weekDayList[dayInfo.weekday] = dayInfo;
    // 토요일이면 초기화 넣고 초기화
    if (dayInfo.weekday === 6 || index === dataList.length - 1) {
      result.push(weekDayList);
      // 마지막일이 아닌 경우만 변수 초기화 셋팅
      if (index !== dataList.length - 1) {
        weekDayList = [null, null, null, null, null, null, null];
      }
    }
  }
  return result;
};

const calculateDate = (value, valueFormat, dateKind, calculateNumber, displayFormat = '') => {
  let displayDate = '';
  const applyDisplayFormat = displayFormat ? displayFormat : valueFormat;
  if (value) {
    displayDate = dayjs(value, valueFormat)
      .add(calculateNumber, dateKind)
      .format(applyDisplayFormat);
  }
  return displayDate;
};

const getTimeStringByDateFullString = (dateFullString) => {
  let result = '';
  if (dateFullString) {
    result = dateFullString.substring(8, 10) + dateFullString.substring(10, 12);
  }
  return result;
};

const focusById = (domId) => {
  if (domId) {
    try {
      if (document.getElementById(domId)) {
        document.getElementById(domId).focus();
      }
    } catch (e) {
      // 로그를 찍을 필요가 없는 에러 catch
      console.log(e);
    }
  }
};

const nullConverter = (v) => {
  return v === null ? '' : v;
};

const upperFirstChar = (str) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const settingTreeCustomLabel = (
  children,
  parentInfo,
  applyLabelPropertyName,
  divisionString = ' ',
) => {
  if (children && children.length) {
    const parentCustomLabel = parentInfo.customLabel || '';
    children.forEach((childInfo) => {
      childInfo.customLabel = parentCustomLabel
        ? parentCustomLabel + divisionString + childInfo[applyLabelPropertyName]
        : childInfo[applyLabelPropertyName];
      if (childInfo.children && childInfo.children.length) {
        settingTreeCustomLabel(
          childInfo.children,
          childInfo,
          applyLabelPropertyName,
          divisionString,
        );
      }
    });
  }
};

// error를 reset 시키기 위한 공통 함수
const resetErrorKeyByInfo = (info, applyPrefixPropertyName) => {
  const checkInfo = _.cloneDeep(info);
  const infoKeys = _.keys(checkInfo);
  const errorApplyKeys = infoKeys.filter((key) => {
    if (info[key]) {
      return true;
    } else {
      return false;
    }
  });
  const resetErrors = {};
  errorApplyKeys.forEach((key) => {
    let applyKey = key;
    if (applyPrefixPropertyName) {
      applyKey = `${applyPrefixPropertyName}.${key}`;
    }
    resetErrors[applyKey] = '';
  });
  return resetErrors;
};

// 오늘날짜 가져오기 (EX: 20240828)
const getToDate = (format = 'YYYYMMDD') => {
  return dayjs().format(format);
};

// 오늘 년월 가져오기 (EX: 202410)
const getToYearMonth = (format = 'YYYYMM') => {
  return dayjs().format(format);
};

// 현재 년도에 1월1일 가져오기 (EX: 20240101)
const getToBeginOfYear = (format = 'YYYYMMDD') => {
  return dayjs().startOf('year').format(format);
};

// 현재 년도에 12월31일 가져오기 (EX: 20240101)
const getToEndOfYear = (format = 'YYYYMMDD') => {
  return dayjs().endOf('year').format(format);
};

// 현재 년월에 1일 가져오기  (EX:  20241001 )
const getToFirstDaytYearMonth = (format = 'YYYYMMDD') => {
  return dayjs().startOf('month').format(format);
};

// 현재 년월에  말 일(L) 가져오기  (EX:20241031)
const getToLastDayYearMonth = (format = 'YYYYMMDD') => {
  return dayjs().endOf('month').format(format);
};

const valueToDefaultLabel = (value, defaultLabel = '-') => {
  if (value !== 0 && !value) {
    return defaultLabel;
  }
  return value;
};

const safetyNumberToZero = (value) => {
  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
};

const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

const getCookie = (name: string) => {
  return cookies.get(name);
};

// widnow를 스크린 상의 가운데로 open
const openCenteredWindow = (url, width, height) => {
  // 현재 화면의 너비와 높이 가져오기
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // 중앙 정렬을 위한 위치 계산
  const left = (screenWidth - width) / 2;
  const top = (screenHeight - height) / 2;

  // 옵션 설정
  const options = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

  // 새 창 열기
  window.open(url, '_blank', options);
};

const getApiPrefixUrl = () => {
  return (
    `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_CONTEXT_PATH}${import.meta.env.VITE_API_PREFIX}` +
    '/'
  );
};

// 낙타표기법 문자열을 '_'으로 구분하여서 반환
const camelToSnake = (str) => {
  return _.words(str) // 단어 분리
    .join('_') // 언더스코어로 연결
    .toLowerCase(); // 소문자로 변환
};

/**
 * ✅ JavaScript 객체를 Spring Boot의 List<T>에 자동 매핑되도록 변환하는 함수
 * @param {Object} params - JavaScript 객체 (예: { name: '', filters: [] })
 * @returns {URLSearchParams} - GET 요청을 위한 URLSearchParams 객체
 */
const convertToQueryParams = (params) => {
  const queryParams = {};

  const arrayParamKeyList = [];

  // 1. 일반 키-값 쌍 추가 (배열이 아닌 속성들)
  Object.keys(params).forEach((key) => {
    if (!Array.isArray(params[key])) {
      queryParams[key] = params[key];
    }
    // 2.배열인 파라미터 키값 별도로 추출
    if (Array.isArray(params[key])) {
      arrayParamKeyList.push(key);
    }
  });

  arrayParamKeyList.forEach((arrayParamKey) => {
    params[arrayParamKey].forEach((item, index) => {
      Object.keys(item).forEach((subKey) => {
        queryParams[`${arrayParamKey}[${index}].${subKey}`] = item[subKey];
      });
    });
  });

  return queryParams;
};

const goPage = (routeUri) => {
  navigate(`${routeUri}`);
};

const findTreeNodeByKey = (nodes, key, keyName) => {
  for (const node of nodes) {
    if (node[keyName] === key) {
      return node;
    }
    if (node.children) {
      const result = findTreeNodeByKey(node.children, key, keyName);
      if (result) return result;
    }
  }
  return null;
};

// TODO : 다운로드파일 공통 함수
const downloadFile = (url, existParameter = false) => {
  const { accessToken } = useAppStore.getState();
  window.open(
    `${url}${existParameter ? '&' : '?'}AuthorizationOrbiswork=${encodeURIComponent(accessToken)}}`,
  );
};

// 트리데이터 setting
const normalizeTreeData = (nodes: any[]): any[] => {
  return nodes.map((node) => {
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: normalizeTreeData(node.children), // 재귀 호출
      };
    } else {
      return {
        ...node,
        children: undefined, // 하위 없는 경우 undefined로 설정
        isLeaf: node.isLeaf ?? false, // 필요시 isLeaf 세팅
      };
    }
  });
};

const getFilterListByMenuList = (menuList, keyword) => {
  const list = menuList;
  const filtedList = list.filter((menuInfo) => {
    const { title, fileName, path } = menuInfo;
    const componentName = fileName || path;
    if (keyword) {
      return title.indexOf(keyword) !== -1 || componentName.indexOf(keyword) !== -1;
    } else {
      return true;
    }
  });
  return filtedList;
};

export default {
  formatString,
  saveInfoToLocalStorage,
  removeToLocalStorage,
  getByLocalStorage,
  applyGroupingRowSpanByPageSize,
  listToTreeData,
  getDateFormatByPickerType,
  convertDateToQuarterValueString,
  getQueryStringByArray,
  objectToQueryString,
  getUUID,
  validateYupForm,
  getNowByServerTime,
  convertNumberFormat,
  addExpandedKeys,
  getToDate,
  handleGlobalError,
  handleGlobalUnhandledRejection,
  getYupListErrorInfo,
  getNowDateString,
  getNowMonthString,
  convertDate,
  getDateListByMonth,
  convertWeekDayList,
  calculateDate,
  getTimeStringByDateFullString,
  focusById,
  nullConverter,
  upperFirstChar,
  settingTreeCustomLabel,
  resetErrorKeyByInfo,
  getToYearMonth,
  getToBeginOfYear,
  getToEndOfYear,
  getToFirstDaytYearMonth,
  getToLastDayYearMonth,
  valueToDefaultLabel,
  safetyNumberToZero,
  setCookie,
  getCookie,
  treeDataToList,
  openCenteredWindow,
  getApiPrefixUrl,
  camelToSnake,
  convertToQueryParams,
  goPage,
  findTreeNodeByKey,
  downloadFile,
  normalizeTreeData,
  getFilterListByMenuList,
};
