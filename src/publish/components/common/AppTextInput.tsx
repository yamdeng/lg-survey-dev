import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import CommonInputError from './CommonInputError';

/*
   #.<AppTextInput /> 전용 속성
    -value(string)
    -onChange : (string, event)
    -inputType(string) : 'number' | 'text' (생략시 기본 'text')
    -hiddenClearButton(boolean) : false
*/

function AppTextInput(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    value,
    onChange,
    placeholder = '',
    errorMessage,
    disabled = false,
    icon,
    required,
    width,
    hiddenClearButton = false,
    inputType = 'text',
    readOnly,
    ...rest
  } = props;

  const applyClassName = classNames('app-form-input', {
    error: errorMessage,
    active: true,
  });

  return (
    <>
      <div className="form-item">
        {label && (
          <label htmlFor={id}>
            {icon} {label} {required && <strong>*</strong>}
          </label>
        )}
        <div className="form-input-outlined">
          <input
            {...rest}
            id={id}
            type={inputType}
            style={{ width: width }}
            className={applyClassName}
            name={name}
            value={value ? value : ''}
            onChange={(event) => {
              onChange(event.target.value, event);
            }}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly} // 퍼블 : TextInput-인풋만 readonly 속성 추가 했습니다. - as is 속성 그대로 옮김
          />
          {disabled || inputType === 'number' || hiddenClearButton || !value ? null : (
            <button className="btnclear" onClick={() => onChange('')}></button>
          )}
        </div>
        <CommonInputError errorMessage={errorMessage} label={label} />
      </div>
    </>
  );
}

export default AppTextInput;
