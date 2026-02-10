import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import CommonInputError from './CommonInputError';

/*

   #.<AppCheckboxGroup /> 전용 속성
    -value([])
    -onChange([], event)
    -options([])
    -labelKey(string)
    -valueKey(string)

*/

function AppCheckboxGroup(props) {
  const {
    id = CommonUtil.getUUID(),
    label,
    value = [],
    onChange,
    errorMessage,
    disabled = false,
    options = [],
    labelKey = 'label',
    valueKey = 'value',
  } = props;
  const selectedValue = value;
  const applyClassName = classNames('app-form-input', { error: errorMessage });

  const changeCheckbox = (event, checkBoxValue) => {
    const checked = event.target.checked;
    const resultValue = [...value];
    if (checked) {
      resultValue.push(checkBoxValue);
    } else {
      const searchIndex = resultValue.findIndex((info) => info === checkBoxValue);
      resultValue.splice(searchIndex, 1);
    }
    onChange(resultValue);
  };

  return (
    <>
      <div id={id}>
        {options.map((info) => {
          const label = info[labelKey];
          const value = info[valueKey];
          const checked = selectedValue.find((info) => info === value);
          return (
            <label key={label}>
              <input
                type="checkbox"
                className={applyClassName}
                name={label}
                disabled={disabled}
                value={value}
                checked={checked ? true : false}
                onChange={(event) => {
                  changeCheckbox(event, value);
                }}
              />
              <span>{label}</span>
            </label>
          );
        })}
        <CommonInputError errorMessage={errorMessage} label={label} />
      </div>
    </>
  );
}

export default AppCheckboxGroup;
