import { useState } from 'react';
import Config from '@/config/Config';
import AppSelect from '@/components/common/AppSelect';
import AppButton from '@/components/common/AppButton';
import Code from '@/config/Code';

/*

  <AppSelect />
    -Code.ts 사용법
    -value
    -onChange
    -options
    -isMultiple
    -labelKey, valueKey
    -applyAllSelect, allValue, allLabel
     : single에서만 사용하세요
    -apiUrl
    -placeholder : 체크 기준은 ''이 아닌 null 입니다.

*/

const basicOptions = [
  { value: 'user1', label: '안용성1' },
  { value: 'user2', label: '안용성2' },
  { value: 'user3', label: '안용성3' },
  { value: 'user4', label: '안용성4' },
  { value: 'user5', label: '안용성5' },
  { value: 'user6', label: '안용성6' },
  { value: 'user7', label: '안용성7' },
  { value: 'user8', label: '안용성8' },
  { value: 'user9', label: '안용성9' },
  { value: 'user10', label: '안용성10' },
];

const customOptions = [
  { userId: 'user1', userName: '안용성1' },
  { userId: 'user2', userName: '안용성2' },
  { userId: 'user3', userName: '안용성3' },
  { userId: 'user4', userName: '안용성4' },
  { userId: 'user5', userName: '안용성5' },
  { userId: 'user6', userName: '안용성6' },
  { userId: 'user7', userName: '안용성7' },
  { userId: 'user8', userName: '안용성8' },
  { userId: 'user9', userName: '안용성9' },
  { userId: 'user10', userName: '안용성10' },
];

function GuideAppSelect() {
  const [singleSelectValue, setSingleSelectValue] = useState('');
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);
  const [labelTestSingleSelectValue, setLabelTestSingleSelectValue] = useState('');
  const [labelTestMultipleSelectValue, setLabelTestMultipleSelectValue] = useState([]);
  const [apiTestSingleSelectValue, setApiTestSingleSelectValue] = useState('');

  const save = () => {
    console.log(`singleSelectValue : ${singleSelectValue}`);
    console.log(`multipleSelectValue : ${multipleSelectValue}`);
    console.log(`labelTestSingleSelectValue : ${labelTestSingleSelectValue}`);
    console.log(`labelTestMultipleSelectValue : ${labelTestMultipleSelectValue}`);
    console.log(`labelTestSingleSelectValue : ${labelTestSingleSelectValue}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AppSelect, AppCodeSelect :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideAppCodeSelect.tsx`}>
                GuideAppCodeSelect
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div>
              <AppSelect
                label="AppSelect(single), Code.ts"
                value={singleSelectValue}
                options={Code.useYn}
                onChange={(value) => {
                  setSingleSelectValue(value);
                }}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppSelect
                label="AppSelect(multiple), Code.ts"
                isMultiple
                value={multipleSelectValue}
                options={basicOptions}
                onChange={(value) => {
                  setMultipleSelectValue(value);
                }}
              />
            </div>
            <div>
              <AppSelect
                label="AppSelect labelKey, valueKey"
                isMultiple
                value={labelTestMultipleSelectValue}
                options={basicOptions}
                onChange={(value) => {
                  setLabelTestMultipleSelectValue(value);
                }}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppSelect
                label="AppSelect applyAllSelect, allValue, allLabel"
                applyAllSelect
                allValue=""
                allLabel="전체"
                value={labelTestSingleSelectValue}
                options={customOptions}
                labelKey="userName"
                valueKey="userId"
                onChange={(value) => {
                  setLabelTestSingleSelectValue(value);
                }}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppSelect
                label="AppSelect apiUrl"
                applyAllSelect
                apiUrl={`common/code/USER_LEVEL`}
                allValue=""
                allLabel="전체"
                value={apiTestSingleSelectValue}
                labelKey="codeName"
                valueKey="code"
                onChange={(value) => {
                  setApiTestSingleSelectValue(value);
                }}
              />
            </div>
            <hr className="line"></hr>
            <p>
              <AppButton value="확인" onClick={save} />
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideAppSelect;
