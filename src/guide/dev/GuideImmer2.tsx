import Config from '@/config/Config';
import { useState } from 'react';
import { produce } from 'immer';
import { immerTestList } from '@/data/grid/example-data-new';

function GuideImmer2() {
  const [testList, setTestList] = useState(immerTestList);

  const toggleSelected = (index) => {
    const newTestList = produce(testList, (draft) => {
      if (draft[index].isRowSelected) {
        draft[index].isRowSelected = false;
      } else {
        draft[index].isRowSelected = true;
      }
    });
    setTestList(newTestList);
  };

  const toggleSelectedAll = (index) => {
    const newTestList = produce(testList, (draft) => {
      draft.forEach((info, draftIndex) => {
        if (index === draftIndex) {
          if (draft[draftIndex].isRowSelected) {
            draft[draftIndex].isRowSelected = false;
          } else {
            draft[draftIndex].isRowSelected = true;
          }
        } else {
          draft[draftIndex].isRowSelected = false;
        }
      });
    });
    setTestList(newTestList);
  };

  const changeAddressZipCode = (index, newZipCode) => {
    const newTestList = produce(testList, (draft) => {
      draft[index].address.detail.zipCode = newZipCode;
    });
    setTestList(newTestList);
  };

  const deleteListByIndex = (index) => {
    const newTestList = produce(testList, (draft) => {
      draft.splice(index, 1);
    });
    setTestList(newTestList);
  };

  const addList = () => {
    // 일반적인 추가하는 예제
    // setTestList([
    //   ...testList,
    //   {
    //     id: 1,
    //     isRowSelected: false,
    //     name: 'name1',
    //     address: {
    //       si: '김포시',
    //       dong: '오정동',
    //       detail: {
    //         zipCode: '111',
    //         detailAddress: '김포상세1',
    //       },
    //     },
    //   },
    // ]);

    // immer을 이용한 예제
    const newTestList = produce(testList, (draft) => {
      draft.push({
        id: 1,
        isRowSelected: false,
        name: 'name1',
        address: {
          si: '김포시',
          dong: '오정동',
          detail: {
            zipCode: '111',
            detailAddress: '김포상세1',
          },
        },
      });
    });
    setTestList(newTestList);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              로딩바 :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideImmer1.tsx`}>
                GuideImmer1
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div>
              <p>
                <button className="button" onClick={addList}>
                  add
                </button>
              </p>
              <ul>
                {testList.map((info, index) => {
                  const { name, isRowSelected } = info;
                  return (
                    <li key={info.name}>
                      {name} / selected : {isRowSelected + ''}{' '}
                      <button className="button button-small" onClick={() => toggleSelected(index)}>
                        toggle selected
                      </button>{' '}
                      <button
                        className="button button-small"
                        onClick={() => toggleSelectedAll(index)}
                      >
                        하나만 반영 selected
                      </button>{' '}
                      <button
                        className="button button-small"
                        onClick={() => changeAddressZipCode(index, '000')}
                      >
                        zipCode 변경
                      </button>{' '}
                      <button
                        className="button button-small"
                        onClick={() => deleteListByIndex(index)}
                      >
                        삭제
                      </button>
                      <p>{JSON.stringify(info.address.detail)}</p>
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
export default GuideImmer2;
