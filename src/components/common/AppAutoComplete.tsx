import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import CommonInputError from './CommonInputError';

/*

  value(string, object, [string], [object]) : value 값으로 isMultiple, isValueString 속성에 맞춰서 타입이 달라짐
  isMultiple(boolean) : 다중 선택여부
  apiUrl(string) : auto 검색된 apiUrl
  labelKey(boolean): input, drowdown에 보여질 키값
  valueKey(boolean): value 키값
  onlySelect(boolean) : 선택한 값을 input 영역에 셋팅되는 것이 아닌 별도로 사용하고 싶을때 사용
  onSelect(function) : 선탹한 정보를 콜백함수로 전달
  isValueString(boolean) : value를 object 형식이 아닌 '' 문자열 유형으로 사용할지 여부(isValueString 사용시 isMultiple이 불가능함)
  apiKeywordName(string) : api 검색시 api 파라미터 키값
  isValueStringApiKeywordName(string) : value 속성에 대응하는 api 검색 키값
  dataKey(string) : api 응답값 속성중 어떤 키값을 응답값으로 사용할지 
  defaultInputValue : 기본값 value
  notFoundMessage(string) : 검색된 값이 없을 경우 메시지
  isClearable(boolean) : clear 버튼 사용 여부
  fixApiParam(object) : auto api 검색시 전달할 고정 api parameter 

*/

// 검색 아이콘 수동으로 사트일 반영하기 위한
const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <button type="button" className="icon-sch" style={{ position: 'inherit' }}></button>
    </components.DropdownIndicator>
  );
};

function AppAutoComplete(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    errorMessage,
    style = { width: '100%' },
    disabled = false,
    isStatic = false,
    isMultiple = false,
    apiUrl,
    labelKey = 'label',
    valueKey = 'value',
    onlySelect = false,
    onSelect,
    isValueString = false,
    apiKeywordName = 'searchWord',
    isValueStringApiKeywordName = 'searchWord',
    dataKey = 'data',
    defaultInputValue,
    notFoundMessage = '',
    isClearable = true,
    fixApiParam = {},
    options = [],
    ...rest
  } = props;

  // 한번 이라도 서버 call을 요청하였는지 확인 하기 위한
  const isServerLoaded = useRef(false);

  // 마지막 요청된 api의 응답값 체크하기 위한 변수
  const apiLastCheckId = useRef('');

  const [isFocused, setIsFocused] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const applyNotFoundMessage = notFoundMessage ? notFoundMessage : 'no data';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // API 호출 함수
  const fetchOptions = useCallback(
    async (input) => {
      if (input.length < 1) return;
      setIsLoading(true);

      try {
        isServerLoaded.current = true;

        const apiParam = {
          [apiKeywordName]: input,
          pageNum: 1,
          pageSize: 1000,
          ...fixApiParam,
        };

        // api 요청시 config 값으로 id를 부여해서 던지고 마지막에 적용된 api 요청만 반영
        apiLastCheckId.current = CommonUtil.getUUID();
        const apiOriginalResult: any = await ApiService.get(`${apiUrl}`, apiParam, {
          applyOriginalResponse: true,
          disableLoadingBar: true,
          apiCallId: apiLastCheckId.current,
        });
        const { config } = apiOriginalResult;
        const apiResult = apiOriginalResult.data;
        if (config.apiCallId === apiLastCheckId.current) {
          const data = _.get(apiResult, dataKey) || [];
          setSelectOptions(data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, apiKeywordName],
  );

  // debounce를 사용하여 입력 후 1000ms 동안 추가 입력이 없을 때만 API 호출
  const debouncedFetchOptions = useCallback(_.debounce(fetchOptions, 1000), []);

  // inputValue가 변경될 때마다 호출
  const handleInputChange = (newValue) => {
    debouncedFetchOptions(newValue);
  };

  const handleOnChange = useCallback(
    (selectedValue) => {
      let applySelectedValue = selectedValue;
      // value 값을 object/array가 아닌 string 형식으로 사용시 아래와 같이 원시적인 값만 추출
      // single : '', multi : ['aaa', 'bbb']
      if (isValueString) {
        if (Array.isArray(selectedValue)) {
          applySelectedValue = selectedValue.map((info) => info[valueKey]);
        } else {
          applySelectedValue = selectedValue ? selectedValue[valueKey] : '';
        }
      }

      if (onlySelect) {
        if (applySelectedValue) {
          onSelect(applySelectedValue, selectedValue);
        }
      } else {
        onChange(applySelectedValue, selectedValue);
      }
    },
    [isValueString, onlySelect, valueKey, onSelect, onChange],
  );

  const applyClassName = classNames('app-form-select', {
    focused: isFocused,
    disabled: disabled,
    'select-in-valid': !isFocused && errorMessage,
  });

  let applyValue = value;
  // 선택한 값을 별도로 사용하는 경우 value 값을 컴포넌트에 셋팅하지 않음
  if (onlySelect) {
    applyValue = null;
  }

  if (!isMultiple) {
    if (value && isValueString) {
      applyValue = selectOptions.find((option) => option[valueKey] === value);
    }
  }
  const applyOptions = isStatic ? options : selectOptions;

  useEffect(() => {
    if (isValueString && defaultInputValue) {
      if (!isServerLoaded.current) {
        ApiService.get(
          `${apiUrl}`,
          {
            [isValueStringApiKeywordName]: defaultInputValue,
            pageNum: 1,
            pageSize: 1000,
          },
          { disableLoadingBar: true },
        ).then((apiResult) => {
          const data = _.get(apiResult, dataKey) || [];
          setSelectOptions(data);
        });
      }
    }
  }, [isValueString, defaultInputValue]);

  useEffect(() => {
    return () => {
      debouncedFetchOptions.cancel();
    };
  }, []);

  useEffect(() => {
    if (!isMultiple) {
      if (isValueString && value) {
        ApiService.get(
          `${apiUrl}`,
          {
            [isValueStringApiKeywordName]: value,
            pageNum: 1,
            pageSize: 1000,
          },
          { disableLoadingBar: true },
        ).then((apiResult) => {
          const data = _.get(apiResult, dataKey) || [];
          setSelectOptions(data);
        });
      }
    }
  }, [isValueString, value]);

  // dropdown 영역이 body를 기준으로 반영되고 zindex를 최대로 해서 펼쳐졌을때 항상 보이게
  const customStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 1050,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const customComponents: any = { DropdownIndicator: CustomDropdownIndicator };
  if (isMultiple && !isClearable) {
    customComponents.MultiValueRemove = () => null;
  }

  return (
    <>
      <Select
        components={customComponents}
        inputId={id}
        name={name}
        value={applyValue}
        onInputChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleOnChange}
        options={applyOptions}
        isMulti={isMultiple}
        isLoading={isLoading}
        classNames={applyClassName}
        placeholder={placeholder}
        style={style}
        styles={customStyles}
        menuPortalTarget={document.body}
        isDisabled={disabled}
        getOptionLabel={(info) => {
          return info[labelKey];
        }}
        getOptionValue={(info) => {
          return info[valueKey];
        }}
        noOptionsMessage={() => applyNotFoundMessage}
        isClearable={isClearable}
        {...rest}
      />
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppAutoComplete;
