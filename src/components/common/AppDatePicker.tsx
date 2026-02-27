import { DATE_PICKER_TYPE_QUARTER } from '@/config/CommonConstant';
import CommonUtil from '@/utils/CommonUtil';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import CommonInputError from './CommonInputError';

/*

  AppDatePicker
   -defaultValue(string)
   -value(string)
   -onChange : (valueString, valueDate)
   -pickerType(string) : date, month, quarter, year
   -valueFormat(string) : 'YYYY-MM-DD'
   -displayFormat(string) : valueFormat과 다르게 보여줄 경우에만 사용(현재는 필요없어 보임)
   -showNow(boolean) : 하단 NOW 버튼 보이게할지 여부
   -showTime(boolean) : time을 같이 보여줄지 여부
   -excludeSecondsTime(boolean) : 시간을 보여줄때 분까지만 보여줄지 여부
   -timeFormat(string) : 타임포맷
   -hourStep(number) : 시간 interval
   -minuteStep(number) : 분 interval
   -secondStep(number) : 초 interval
   -needConfirm(boolean) : [ok] 버튼을 통해서만 날짜를 선택할지 여부
   -minDate(string) : 최소날짜
   -maxDate(string) : 최대날짜
   -disabled(boolean) : input disable 적용
   -disabledHoiloday(boolean) : 주말은 선택하지 못하게
   -disabledDates(string[]) : 선택을 막을 날짜 목록

*/

const AppDatePicker = (props) => {
  const {
    id = CommonUtil.getUUID(),
    name,
    label,
    icon,
    required,
    errorMessage,
    defaultValue = null,
    value = null,
    onChange,
    placeholder = '',
    pickerType = 'date',
    valueFormat,
    displayFormat,
    showNow = false,
    showTime = false,
    excludeSecondsTime = false,
    timeFormat,
    hourStep = 1,
    minuteStep = 5,
    secondStep = 1,
    needConfirm = null,
    minDate,
    maxDate,
    disabled,
    disabledHoiloday,
    disabledDates,
    style = { width: '100%' },
    hidden = false,
    ...rest
  } = props;

  // const [open, setOpen] = useState(false);

  let applyDateValueFormat = CommonUtil.getDateFormatByPickerType(
    pickerType,
    showTime,
    excludeSecondsTime,
  );
  if (valueFormat) {
    applyDateValueFormat = valueFormat;
  }
  const applyMinDate = minDate ? dayjs(minDate, applyDateValueFormat) : null;
  const applyMaxDate = maxDate ? dayjs(maxDate, applyDateValueFormat) : null;

  const applyValue = value ? dayjs(value, applyDateValueFormat) : null;
  let applyTimeFormat = excludeSecondsTime ? 'HH:mm' : 'HH:mm:ss';
  if (timeFormat) {
    applyTimeFormat = timeFormat;
  }

  // 각 pickerType에 해당하는 기본 displayFormat 반영
  let applyDisplayFormat = CommonUtil.getDateFormatByPickerType(
    pickerType,
    showTime,
    excludeSecondsTime,
  );
  if (displayFormat) {
    applyDisplayFormat = displayFormat;
  }

  // 쿼터일 경우 displayFormat 수동으로 수정 : 분기는 displayFormat이 fix임
  if (pickerType === DATE_PICKER_TYPE_QUARTER) {
    applyDisplayFormat = displayFormat ? displayFormat : `YYYY-[Q]Q`;
  }

  const disabledDate = (current) => {
    if (current) {
      if (disabledHoiloday) {
        // Sunday - Saturday : 0 - 6
        const dayNumber = current.toDate().getDay();
        if (dayNumber === 0 || dayNumber === 6) {
          return true;
        }
      } else if (disabledDates && disabledDates.length) {
        if (disabledDates.find((info) => current.format(applyDateValueFormat) === info)) {
          return true;
        }
      }
    }
    return false;
  };

  // 서버 시간을 현재시간으로 반영하기 위한 [Now] 버튼 커스텀
  const renderFooter = () => (
    <button
      onClick={() => {
        const dateString = CommonUtil.getNowByServerTime(showTime ? 'dateTime' : 'date');
        onChange(dateString, dayjs(dateString));
      }}
    >
      Now
    </button>
  );

  const applyClassName = classNames('app-form-picker', {
    hidden: hidden,
  });

  return (
    <>
      <div className="form-item">
        {label && (
          <label htmlFor={id}>
            {icon ? icon : null} {label} {required && <strong>*</strong>}
          </label>
        )}

        <div className="form-input-outlined">
          <DatePicker
            className={applyClassName}
            status={errorMessage ? 'error' : ''}
            style={style}
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={(dayjsDate: any) => {
              let valueString = dayjsDate ? dayjsDate.format(applyDateValueFormat) : '';
              // quarter(분기) 타입일 경우에 각 월의 random값을 전달하고 있음
              if (pickerType === DATE_PICKER_TYPE_QUARTER) {
                valueString = dayjsDate.format('YYYY-MM') + '-01';
              }
              onChange(valueString, dayjsDate ? dayjsDate.toDate() : null);
            }}
            picker={pickerType}
            defaultValue={defaultValue}
            value={applyValue}
            format={applyDisplayFormat}
            showTime={
              showTime
                ? {
                    format: applyTimeFormat,
                    hourStep: hourStep,
                    minuteStep: minuteStep,
                    secondStep: secondStep,
                  }
                : false
            }
            showNow={false}
            needConfirm={needConfirm}
            minDate={applyMinDate}
            maxDate={applyMaxDate}
            disabled={disabled}
            disabledDate={disabledDate}
            renderExtraFooter={showNow ? renderFooter : null}
            {...rest}
          />
        </div>
        <CommonInputError errorMessage={errorMessage} />
      </div>
    </>
  );
};
export default AppDatePicker;
