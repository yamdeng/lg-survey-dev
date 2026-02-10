import CommonUtil from '@/utils/CommonUtil';
import { Input } from 'antd';
import CommonInputError from './CommonInputError';

const { TextArea } = Input;

function AppTextArea(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    errorMessage,
    style = { width: '100%', height: '200px' },
    disabled = false,
    ...rest
  } = props;

  return (
    <>
      <TextArea
        {...rest}
        id={id}
        name={name}
        value={value ?? ''} // nullish coalescing 사용으로 더 깔끔하게 처리
        onChange={(e) => {
          // antd의 onChange는 standard event 객체를 반환합니다.
          // 기존 인터페이스(value, event)를 유지하도록 작성했습니다.
          onChange?.(e.target.value, e);
        }}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        // status="error" 속성을 사용하면 antd 자체 에러 스타일이 적용됩니다.
        status={errorMessage ? 'error' : ''}
        // 기존 'app-form-input' 클래스가 필요하다면 추가
        className={errorMessage ? 'app-form-input error' : 'app-form-input'}
      />
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppTextArea;
