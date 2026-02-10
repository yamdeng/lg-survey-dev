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
    style = {},
    hiddenClearButton = false,
    inputType = 'text',
    ...rest
  } = props;

  const applyClassName = classNames('app-form-input', {
    error: errorMessage,
    active: true,
  });

  return (
    <>
      <input
        {...rest}
        id={id}
        type={inputType}
        style={style}
        className={applyClassName}
        name={name}
        value={value ? value : ''}
        onChange={(event) => {
          onChange(event.target.value, event);
        }}
        placeholder={placeholder}
        disabled={disabled}
      />
      {disabled || inputType === 'number' || hiddenClearButton || !value ? null : (
        <button className="btnclear" onClick={() => onChange('')}></button>
      )}
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppTextInput;
