import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import CommonInputError from '@/components/common/CommonInputError';
import { Search } from 'lucide-react';
/*

  #.공통 속성
    -id(string) : 에러발생시 포커스 이동시키기 위한 id
    -name(string) : yup에 등록되는 키값과 동일시키는 것을 추천
    -label(string)  : 라벨(input 상단에 표시되는 라벨)
    -value : 각 컴포넌트 타입에 따라 value 타입이 달라질 수 있음 
    -onChange : 각 컴포넌트 타입에 따라 함수 spec이 달라질 수 있음
    -placeholder : label 속성외의 placeholder를 보여주고 싶을때 사용
    -required : 필수 여부(라벨에 '*' 표시)
    -errorMessage(string) : 에러메시지가 존재시 border가 red로 바뀌고 input 하단에 에러메시지가 표기됨. 메시지 키값을 전달시 해당 키값이 반영됨
    -disabled(boolean)
    -style({}) : react의 style object({}) 형식으로 전달

  #.<AppSearchInput /> 전용 속성
    -value(string)
    -onChange : (string, event)
    -inputType(string) : 'number' | 'text' (생략시 기본 'text')
    -clearHandler(function) : x 버튼 별도의 처리를 하고 싶을때 전달 (기본은 onChange('') 으로 초기화됨)
    -search(function) : 검색아이콘 클릭 및 엔터키 이벤트 발생시 실행되는 함수

*/

function AppSearchInput(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    // labelIcon,
    icon,
    value,
    defaultValue,
    onChange,
    placeholder = '',
    errorMessage,
    disabled = false,
    required = false,
    // labelText = '',
    // style = {},
    width = {},
    inputType = 'text',
    search = () => {},
    hiddenClearButton = false,
    hiddenSearchButton = true,
    ...rest
  } = props;

  const applyClassName = classNames('app-form-input', {
    error: errorMessage,
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
            value={!value ? defaultValue : value}
            onChange={(event) => {
              onChange(event.target.value, event);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && search) {
                search();
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            // labelText={labelText}
          />
          {hiddenClearButton || !value ? null : (
            <button
              className="sch-btnclear"
              onClick={(event) => {
                event.stopPropagation();
                onChange('');
              }}
            ></button>
          )}

          {hiddenSearchButton ? null : (
            // icon-sch
            <button type="button" className="icon-sch" onClick={search}>
              <Search />
            </button>
          )}
        </div>
        <CommonInputError errorMessage={errorMessage} label={label} />
      </div>
    </>
  );
}

export default AppSearchInput;
