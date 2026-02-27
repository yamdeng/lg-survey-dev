import AppRangeDatePicker from '@/components/common/AppRangeDatePicker';
import { DATE_PICKER_TYPE_MONTH } from '@/config/CommonConstant';
import Config from '@/config/Config';
import _ from 'lodash';

import AppButton from '@/components/common/AppButton';
import { useState } from 'react';

/*

  <AppRangeDatePicker> 예시
   1.min, max
   2.disabled : input 자체를 disabled 하는 방법
   3.지정한 날짜 disabled 시키기
    -토,일 선택 못하게
    -비활성할 날짜를 배열로 전달

*/
function GuideAppRangeDatePicker2() {
  // input disabled
  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  // 'YYYY-MM-DD' format 유형 사용 방법
  const [datePickerTypeValue, setDatePickerTypeValue] = useState(['2024-08-05', '2024-08-10']);
  const [dateTypeMinDate] = useState('2024-08-01');
  const [dateTypeMaxDate] = useState('2025-01-16');

  // 'YYYY-MM' format 유형 사용 방법
  const [monthPickerTypeValue, setMonthPickerTypeValue] = useState(['2024-08', '2025-12']);
  const [monthTypeMinDate] = useState('2024-08');
  const [monthTypeMaxDate] = useState('2025-10');

  // date picker 예시
  const changeDatePickerTypeValue = (valueString, valueDate) => {
    console.log(`changeDatePickerTypeValue valueString : ${valueString}`);
    console.log(`changeDatePickerTypeValue valueDate : ${valueDate}`);
    setDatePickerTypeValue(valueString);
  };

  // month picker 예시
  const changeMonthPickerTypeValue = (valueString, valueDate) => {
    console.log(`changeMonthPickerTypeValue valueString : ${valueString}`);
    console.log(`changeMonthPickerTypeValue valueDate : ${valueDate}`);
    setMonthPickerTypeValue(valueString);
  };

  // 수동으로 disabledDate 전달
  const disabledDates = ['2024-08-06', '2024-08-07'];

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AppRangeDatePicker case2 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/GuideAppRangeDatePicker2.tsx`}
              >
                GuideAppRangeDatePicker2
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton onClick={toggleDisabled} value="disabled toggle" />
            <h3>max, min (date 유형) : {_.toString(datePickerTypeValue)} </h3>
            <div>
              <AppRangeDatePicker
                onChange={changeDatePickerTypeValue}
                value={datePickerTypeValue}
                pickerType="date"
                minDate={dateTypeMinDate}
                maxDate={dateTypeMaxDate}
                disabled={disabled}
              />
            </div>
            <h3>max, min (month 유형) : {_.toString(monthPickerTypeValue)}</h3>
            <div>
              <AppRangeDatePicker
                onChange={changeMonthPickerTypeValue}
                value={monthPickerTypeValue}
                pickerType={DATE_PICKER_TYPE_MONTH}
                minDate={monthTypeMinDate}
                maxDate={monthTypeMaxDate}
                disabled={disabled}
              />
            </div>
            <h3>holiday 제거 : {datePickerTypeValue} </h3>
            <div>
              <AppRangeDatePicker
                onChange={changeDatePickerTypeValue}
                value={datePickerTypeValue}
                pickerType="date"
                disabledHoiloday
              />
            </div>
            <h3>disabledDates 전달하기 : {datePickerTypeValue} </h3>
            <div>
              <AppRangeDatePicker
                onChange={changeDatePickerTypeValue}
                value={datePickerTypeValue}
                pickerType="date"
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideAppRangeDatePicker2;
