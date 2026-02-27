import Config from '@/config/Config';
import AppTextEditor from '@/components/common/AppTextEditor';
import { useState } from 'react';

function GuideAppTextEditor() {
  const [value, setValue] = useState('');

  const changeValue = (value) => {
    setValue(value);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              Editor :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideAppTextEditor.tsx`}>
                GuideAppTextEditor
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div style={{ marginBottom: 10 }}>
              <AppTextEditor value={value} onChange={changeValue} placeholder="비어있어요." />
            </div>
            <div style={{ marginBottom: 10 }}>
              <AppTextEditor isViewMode value={value} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideAppTextEditor;
