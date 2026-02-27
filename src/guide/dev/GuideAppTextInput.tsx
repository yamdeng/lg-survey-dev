import { useState } from 'react';
import Config from '@/config/Config';
import AppTextInput from '@/components/common/AppTextInput';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppTextArea from '@/components/common/AppTextArea';
import AppButton from '@/components/common/AppButton';

function GuideAppTextInput() {
  const [textValue, setTextValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [numberValue, setNumberValue] = useState(null);

  const save = () => {
    alert(`textValue: ${textValue}`);
    alert(`numberValue: ${numberValue}`);
    alert(`textAreaValue: ${textAreaValue}`);
  };

  const search = () => {
    alert('AppInputSearch search function call');
  };

  const clearHandler = () => {
    alert('커스텀 input clear 함수');
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AppTextInput, AppSearchInput :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideAppTextInput.tsx`}>
                GuideAppTextInput
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppTextInput
              maxLength={10}
              label="AppTextInput(text)"
              required
              value={textValue}
              onChange={(value) => setTextValue(value)}
              hiddenClearButton={false}
            />
            <hr className="line"></hr>
            <AppTextInput
              min={0}
              max={5}
              inputType="number"
              label="AppTextInput(number)"
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
            <hr className="line"></hr>
            <AppSearchInput
              label="AppSearchInput"
              value={textValue}
              onChange={(value) => setTextValue(value)}
              search={search}
              clearHandler={clearHandler}
            />
            <hr className="line"></hr>
            <AppTextArea
              label="AppTextArea"
              value={textAreaValue}
              onChange={(value) => setTextAreaValue(value)}
            />
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
export default GuideAppTextInput;
