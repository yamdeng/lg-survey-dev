import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import { Select } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import CommonInputError from '@/components/common/CommonInputError';

/*

   #.<AppSelect /> 전용 속성
    -value(string || string[])
    -onChange(string || string[], event)
    -options(object[]) : {[{ label: '라벨', value: '값' }]}
    -isMultiple(boolean) : false(다중선택 여부)
    -applyAllSelect(boolean) : false
    -allValue(string) : 전체 선택시 value 값(applyAllSelect 값이 true인 경우만 반영)
    -allLabel(string)
    -labelKey(string) : 'label'
    -valueKey(string) : 'value'
    -apiUrl(string) : 원격으로 select 정보를 가져올때 사용
    -showSearch(boolean) : 우측 검색 아이콘 display 여부
    -allowClear(boolean) : 우측 x 버튼 display 여부

*/
function AppSelect(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    icon,
    value,
    defaultValue,
    onChange,
    placeholder = '',
    errorMessage,
    disabled = false,
    required = false,
    // style = { width: '100%' },
    width = {},
    options = [],
    isMultiple = false,
    applyAllSelect = false,
    allValue = '',
    allLabel = 'ALL',
    apiUrl = '',
    labelKey = 'label',
    valueKey = 'value',
    showSearch = false,
    allowClear = false,
    labelRender,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const rawOptions = apiUrl ? stateOptions : options;
  const applyOptions = applyAllSelect
    ? [{ [labelKey]: allLabel, [valueKey]: allValue }, ...rawOptions]
    : rawOptions;
  const applyClassName = classNames('app-form-select', {});

  useEffect(() => {
    if (apiUrl) {
      ApiService.get(`${apiUrl}`).then((apiResult) => {
        const data = apiResult.data;
        setStateOptions(data);
      });
    }
  }, [apiUrl]);

  return (
    <>
      <div className="form-item">
        {label && (
          <label htmlFor={id}>
            {icon} {label} {required && <strong>*</strong>}
          </label>
        )}
        <div className="form-select-outlined">
          <Select
            {...rest}
            mode={isMultiple ? 'multiple' : ''}
            status={!isFocused && errorMessage ? 'error' : ''}
            style={{ width: width }}
            className={applyClassName}
            id={id}
            name={name}
            value={placeholder && !value ? undefined : value}
            defaultValue={defaultValue}
            options={applyOptions}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            fieldNames={{ label: labelKey, value: valueKey }}
            showSearch={showSearch}
            notFoundContent={null}
            optionFilterProp={labelKey}
            allowClear={allowClear}
            labelRender={labelRender}
          ></Select>
        </div>
        <CommonInputError errorMessage={errorMessage} label={label} />
      </div>
    </>
  );
}

export default AppSelect;
