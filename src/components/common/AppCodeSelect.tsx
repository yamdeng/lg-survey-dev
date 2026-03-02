import AppSelect from '@/components/common/AppSelect';
import CommonUtil from '@/utils/CommonUtil';
import { useState, useEffect } from 'react';
import ApiService from '@/services/ApiService';
import { getOptions, convertOptions } from '@/services/CodeService';

/*

   #.<AppSelect /> 전용 속성
    -value(string || string[])
    -onChange(string || string[], event)
    -options(object[]) : {[{ label: '라벨', value: '값' }]}
    -isMultiple(boolean) : 다중선택 여부
    -applyAllSelect(boolean) : 전체 선택 반영 여부
    -allValue(string) : 전체 선택시 value 값(applyAllSelect 값이 true인 경우만 반영)
    -allLabel(string) : 전체 선택 라벨(기본값은 'ALL')
    -codeGrpId(string) : 코드그룹id

*/
function AppCodeSelect(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    value,
    labelKey = 'label',
    onChange,
    placeholder = '',
    required = false,
    errorMessage,
    disabled = false,
    style = { width: '100%' },
    isMultiple = false,
    applyAllSelect = false,
    allValue = '',
    allLabel = 'ALL',
    isRemote = false,
    codeGrpId = '',
    ...rest
  } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (codeGrpId) {
      if (isRemote) {
        ApiService.get(`common/codes/${codeGrpId}`).then((apiResult) => {
          const data = apiResult;
          const result = convertOptions(data);
          setOptions(result);
        });
      } else {
        setOptions(getOptions(codeGrpId));
      }
    }
  }, [isRemote, codeGrpId]);

  return (
    <>
      <AppSelect
        {...rest}
        style={style}
        id={id}
        options={options}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        errorMessage={errorMessage}
        disabled={disabled}
        applyAllSelect={applyAllSelect}
        allValue={allValue}
        allLabel={allLabel}
        isMultiple={isMultiple}
        labelKey={labelKey}
        valueKey="value"
      />
    </>
  );
}

export default AppCodeSelect;
