import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

/*

   #.<AppButton /> 전용 속성
    -size : 'small', 'middle', 'large'
    -theme : 'primary', 'secondary'...
    -disabled : boolean
    -icon : 아이콘 이미지
    -onClick : () => {}
    -customClassName : 커스텀 클래스 전체 override
    -value : 버튼 텍스트

*/

function AppButton(props) {
  const {
    id = CommonUtil.getUUID(),
    theme = 'primary', // 'primary' | 'secondary'...;
    icon = '',
    size = 'middle',
    disabled = false,
    onClick,
    customClassName = '',
    value = '',
    ...rest
  } = props;

  const baseClassName = classNames('app-btn', {
    small: size === 'small' ? true : false,
    middle: size === 'middle' ? true : false,
    large: size === 'large' ? true : false,
  });

  const variantClassName = theme;

  const applyClassName = customClassName ? customClassName : baseClassName + ' ' + variantClassName;
  return (
    <>
      <button
        type="button"
        name="button"
        id={id}
        className={applyClassName}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {icon}
        {value}
      </button>
    </>
  );
}

export default AppButton;
