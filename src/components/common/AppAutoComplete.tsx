import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import Select, { components } from 'react-select';
import CommonInputError from './CommonInputError';

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
    required = false,
    errorMessage,
    style = { width: '100%' },
    disabled = false,
    isMultiple = false,
    labelKey = 'label',
    valueKey = 'value',
    onlySelect = false,
    onSelect,
    isValueString = false,
    notFoundMessage = '',
    isClearable = true,
    options = [],
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const applyNotFoundMessage = notFoundMessage ? notFoundMessage : 'no data';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
        onSelect(applySelectedValue);
      } else {
        onChange(applySelectedValue);
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

  if (value && isValueString) {
    if (isMultiple) {
      applyValue = options.filter((info) => {
        const optionsValue = info[valueKey];
        return value.includes(optionsValue);
      });
    } else {
      applyValue = options.find((option) => option[valueKey] == value);
    }
  }
  const applyOptions = options;

  const customStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 1050,
    }),
  };

  const customComponents: any = { DropdownIndicator: CustomDropdownIndicator };
  if (isMultiple && !isClearable) {
    customComponents.MultiValueRemove = () => null;
  }

  return (
    <>
      <Select
        components={customComponents}
        id={id}
        name={name}
        classNames={applyClassName}
        value={applyValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleOnChange}
        options={applyOptions}
        isMulti={isMultiple}
        placeholder={placeholder}
        style={style}
        styles={customStyles}
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
      <CommonInputError errorMessage={errorMessage} />
    </>
  );
}

export default AppAutoComplete;
