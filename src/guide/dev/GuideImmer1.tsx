import Config from '@/config/Config';
import { immerTestObject } from '@/data/grid/example-data-new';
import { produce } from 'immer';
import { useState } from 'react';

function GuideImmer1() {
  const [testObject, setTestObject] = useState(immerTestObject);

  const changeAddressZipCode = () => {
    const newTestObject = produce(testObject, (draft) => {
      draft.address.detail.zipCode = '000';
    });
    setTestObject(newTestObject);
  };

  const addChildren = () => {
    // 일반적인 추가하는 예제
    // setTestObject({
    //   ...testObject,
    //   children: [...testObject.children, { name: 'child3', description: 'description3' }],
    // });

    // immer을 사용하는 예제
    const newTestObject = produce(testObject, (draft) => {
      draft.children.push({
        name: 'child3',
        description: 'description3',
      });
    });
    setTestObject(newTestObject);
  };

  const changeChildrenNameAll = () => {
    const newTestObject = produce(testObject, (draft) => {
      draft.children.forEach((info) => {
        info.name = info.name + ' update';
      });
    });
    setTestObject(newTestObject);
  };

  const deleteChildrenByName = (name) => {
    const newTestObject = produce(testObject, (draft) => {
      const searchIndex = draft.children.findIndex((info) => info.name === name);
      if (searchIndex !== -1) {
        draft.children.splice(searchIndex, 1);
      }
    });
    setTestObject(newTestObject);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              immer 라이브러리 object case :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideImmer1.tsx`}>
                GuideImmer1
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="btn-group">
              <button className="app-btn primary small" onClick={changeAddressZipCode}>
                zipcode 변경
              </button>{' '}
              <button className="app-btn primary small" onClick={addChildren}>
                add children
              </button>{' '}
              <button className="app-btn primary small" onClick={changeChildrenNameAll}>
                자식이름 전체변경
              </button>
            </div>
            <div>
              <p>name : {testObject.name}</p>
              <p>address.si : {testObject.address.si}</p>
              <p>address.detail.zipCode : {testObject.address.detail.zipCode}</p>
            </div>
            <div>
              <ul>
                {testObject.children.map((info) => {
                  const { name, description } = info;
                  return (
                    <li key={name} style={{ marginBottom: 10 }}>
                      {name} : {description}{' '}
                      <button
                        style={{ display: 'inline' }}
                        className="app-btn primary small"
                        onClick={() => deleteChildrenByName(name)}
                      >
                        삭제
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideImmer1;
