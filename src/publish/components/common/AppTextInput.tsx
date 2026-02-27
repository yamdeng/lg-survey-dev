import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
// import CommonInputError from './CommonInputError';

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
    // errorMessage,
    error = false,
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
    error: error,
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
            readOnly={readOnly} // 퍼블 : readonly 속성 추가
          />
          {disabled || inputType === 'number' || hiddenClearButton || !value ? null : (
            <button className="btnclear" onClick={() => onChange('')}></button>
          )}
        </div>
        {/* 에러시 className .error 추가로 변경 */}
        {/* <CommonInputError errorMessage={errorMessage} error={error} /> */}
      </div>
    </>
  );
}

export default AppTextInput;
