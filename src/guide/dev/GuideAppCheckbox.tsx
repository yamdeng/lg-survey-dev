import AppButton from '@/components/common/AppButton';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppCheckboxGroup from '@/components/common/AppCheckboxGroup';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import Config from '@/config/Config';
import { useState } from 'react';

const basicCheckboxOptions = [
  {
    label: '홈',
    value: 'home',
  },
  {
    label: '설문1',
    value: 'survey1',
  },
  {
    label: '설문2',
    value: 'survey2',
  },
];

const customCheckboxOptions = [
  {
    name: '홈1',
    id: 'home1',
  },
  {
    name: '설문1',
    id: 'survey1',
  },
  {
    name: '설문2',
    id: 'survey2',
  },
];

function GuideAppCheckbox() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState([]);
  const [checkboxGroupValue2, setCheckboxGroupValue2] = useState([]);

  const [radioGroupValue, setRadioGroupValue] = useState('');
  const [radioGroupValue2, setRadioGroupValue2] = useState('');

  const save = () => {
    console.log(`checkboxValue : ${checkboxValue}`);
    console.log(`checkboxGroupValue : ${checkboxGroupValue}`);
    console.log(`checkboxGroupValue2 : ${checkboxGroupValue2}`);
    console.log(`radioGroupValue : ${radioGroupValue}`);
    console.log(`radioGroupValue2 : ${radioGroupValue2}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AppCheckbox, AppCheckboxGroup, AppRadioGroup :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideAppCheckbox.tsx`}>
                GuideAppCheckbox
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div>
              <AppCheckbox
                label="AppCheckbox"
                checkboxTitle="사용여부"
                value={checkboxValue}
                onChange={(value) => setCheckboxValue(value)}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppCheckboxGroup
                label="AppCheckboxGroup"
                options={basicCheckboxOptions}
                value={checkboxGroupValue}
                onChange={(value) => setCheckboxGroupValue(value)}
              />
            </div>
            <div>
              <AppCheckboxGroup
                label="AppCheckboxGroup(custom-options)"
                options={customCheckboxOptions}
                value={checkboxGroupValue2}
                labelKey="name"
                valueKey="id"
                onChange={(value) => setCheckboxGroupValue2(value)}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppRadioGroup
                label="AppRadioGroup"
                options={basicCheckboxOptions}
                value={radioGroupValue}
                onChange={(value) => setRadioGroupValue(value)}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppRadioGroup
                label="AppRadioGroup(custom-options)"
                options={customCheckboxOptions}
                value={radioGroupValue2}
                labelKey="name"
                valueKey="id"
                onChange={(value) => setRadioGroupValue2(value)}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppButton onClick={save} value="저장" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideAppCheckbox;
