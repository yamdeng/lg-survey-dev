import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import CommonInputError from './CommonInputError';

/*몃

   #.<AppCheckbox /> 전용 속성
    -value(boolean)
    -onChange : (boolean, event)
    -checkboxTitle(string) : 체크박스 좌측에 text(전달하지 않을 경우 label 값을 사용함)

*/

function AppCheckbox(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    value = false,
    onChange,
    errorMessage,
    disabled = false,
    checkboxTitle = '',
  } = props;
  const applyClassName = classNames('app-form-input', { error: errorMessage });

  return (
    <>
      <label key={label} id={id}>
        <input
          type="checkbox"
          className={applyClassName}
          name={name}
          disabled={disabled}
          checked={value}
          onChange={(event) => {
            onChange(event.target.checked, event);
          }}
        />
        <span>{checkboxTitle ? checkboxTitle : label}</span>
      </label>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppCheckbox;
