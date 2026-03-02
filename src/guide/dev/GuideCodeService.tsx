import { useState } from 'react';
import CodeService from '@/services/CodeService';
import Config from '@/config/Config';
import AppRadioGroup from '@/components/common/AppRadioGroup';

function GuideCodeService() {
  const [radioGroupValue, setRadioGroupValue] = useState('N');

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              CodeService :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideCodeService.tsx`}>
                GuideCodeService
              </a>
            </h3>
          </div>
          <div className="content-body">
            <p>USER_LEVEL 10 : {CodeService.getCodeLabelByValue('USER_LEVEL', '10')}</p>
            <p>MAIN_DISPLAY_YN N : {CodeService.getCodeLabelByValue('MAIN_DISPLAY_YN', 'N')}</p>

            <p>
              <AppRadioGroup
                options={CodeService.getOptions('MAIN_DISPLAY_YN')}
                value={radioGroupValue}
                onChange={(value) => setRadioGroupValue(value)}
              />
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideCodeService;
