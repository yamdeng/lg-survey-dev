import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import Config from '@/config/Config';
import { useState } from 'react';

function GuideAppCodeSelect() {
  const [singleSelectValue, setSingleSelectValue] = useState('');
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);

  const save = () => {
    console.log(`singleSelectValue : ${singleSelectValue}`);
    console.log(`multipleSelectValue : ${multipleSelectValue}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AppCodeSelect :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideAppCodeSelect.tsx`}>
                GuideAppCodeSelect
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div>
              <AppCodeSelect
                codeGrpId="USER_LEVEL"
                label="CodeService 이용"
                value={singleSelectValue}
                onChange={(value) => {
                  setSingleSelectValue(value);
                }}
              />
            </div>
            <hr className="line"></hr>
            <div>
              <AppCodeSelect
                codeGrpId="USER_LEVEL"
                label="사용자레벨(remote)"
                isRemote
                isMultiple
                value={multipleSelectValue}
                onChange={(value) => {
                  setMultipleSelectValue(value);
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
export default GuideAppCodeSelect;
