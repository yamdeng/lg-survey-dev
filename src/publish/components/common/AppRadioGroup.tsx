import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import CommonInputError from '@/components/common/CommonInputError';

/*
   #.<AppRadioGroup /> 전용 속성
    -value([])
    -onChange([], event)
    -options([])
    -labelKey(string)
    -valueKey(string)
*/
function AppRadioGroup(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    value,
    onChange,
    errorMessage,
    disabled = false,
    options = [],
    labelKey = 'label',
    valueKey = 'value',
  } = props;
  const selectedValue = value;
  const applyClassName = classNames('app-form-input', { error: errorMessage });
  return (
    <>
      <div id={id}>
        {options.map((info) => {
          const label = info[labelKey];
          const value = info[valueKey];
          return (
            <label key={label}>
              <input
                type="radio"
                className={applyClassName}
                name={name}
                disabled={disabled}
                value={value}
                checked={selectedValue === value}
                onChange={(event) => {
                  onChange(event.target.value, event);
                }}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppRadioGroup;
