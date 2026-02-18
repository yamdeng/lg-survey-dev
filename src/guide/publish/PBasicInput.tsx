import AppCheckbox from '@/components/common/AppCheckbox';
import AppCheckboxGroup from '@/components/common/AppCheckboxGroup';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppTextArea from '@/components/common/AppTextArea';
import AppTextInput from '@/components/common/AppTextInput';
import AppSelect from '@/components/common/AppSelect';
import AppAutoComplete from '@/components/common/AppAutoComplete';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppRangeDatePicker from '@/components/common/AppRangeDatePicker';
import AppTimePicker from '@/components/common/AppTimePicker';

function PBasicInput() {
  const pStyle = { marginBottom: 20 };
  return (
    <>
      <div>PBasicInput</div>
      <p style={pStyle}>
        AppTextInput
        <AppTextInput errorMessage={'에러!!!'} />
      </p>
      <p style={pStyle}>
        AppSearchInput
        <AppSearchInput />
      </p>
      <p style={pStyle}>
        AppTextArea
        <AppTextArea />
      </p>
      <p style={pStyle}>
        AppCheckbox
        <AppCheckbox />
      </p>
      <p style={pStyle}>
        AppCheckboxGroup
        <AppCheckboxGroup
          label="체크그룹"
          options={[
            { value: '111', label: '111_LABEL' },
            { value: '222', label: '222_LABEL' },
            { value: '333', label: '333_LABEL' },
            { value: '444', label: '444_LABEL' },
            { value: '555', label: '555_LABEL' },
            { value: '666', label: '666_LABEL' },
          ]}
          value={['111', '555']}
          errorMessage="에러2!!!"
        />
      </p>
      <p style={pStyle}>
        AppRadioGroup
        <AppRadioGroup
          label="SPI여부"
          options={[
            { value: 'Y', label: 'YES' },
            { value: 'N', label: 'NO' },
          ]}
          value={'Y'}
          errorMessage="aaa"
        />
      </p>
      <p style={pStyle}>
        AppSelect
        <AppSelect />
      </p>
      <p style={pStyle}>
        AppAutoComplete
        <AppAutoComplete />
      </p>
      <p style={pStyle}>
        AppDatePicker
        <AppDatePicker />
      </p>
      <p style={pStyle}>
        AppRangeDatePicker
        <AppRangeDatePicker />
      </p>
      <p style={pStyle}>
        AppTimePicker
        <AppTimePicker />
      </p>
    </>
  );
}

export default PBasicInput;
