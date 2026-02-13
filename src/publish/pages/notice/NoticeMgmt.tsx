import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HeaderMenu from '@/publish/components/headerMenu';
import { Form, Button } from 'antd';

import { Home, Search, FilePenLine, Plus, X, Check } from 'lucide-react';

import FlexBox from '@/publish/components/wrapperItem/FlexBox';
// Form Components
import AppSelect from '@/publish/components/common/AppSelect';
import AppTextInput from '@/publish/components/common/AppTextInput';

const NoticeMgmt = () => {
  return (
    <>
      <header className="content-header">
        <FlexBox className="content-inner" justify={'space-between'}>
          <div className="bread-crumb">
            <dl className="bread-crumb-list">
              <dt>
                <a href="/">
                  <Home size={16} />
                </a>
              </dt>
              <dd>
                <a href="#">Notice</a>
              </dd>
              <dd>
                <a href="#">Write/Modify</a>
              </dd>
            </dl>
          </div>
          <HeaderMenu />
        </FlexBox>
      </header>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">Notice Write/Modify</h3>
          </div>

          <div className="content-body">
            <div className="content-block-modify">
              <table className="modify-table">
                <colgroup>
                  <col width="12%" />
                  <col width="30%" />
                  <col width="12%" />
                  <col width="46%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="title">제목</label>
                    </th>
                    <td colSpan={3}>
                      <AppTextInput name="title" width={'100%'} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="writer">작성자</label>
                    </th>
                    <td colSpan={3}>
                      <AppTextInput name="writer" value="LG CNS" width={'100%'} readOnly />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4}>
                      <div className="textEdit">
                        <br />
                        <br />
                        -- 텍스트 에디터 --
                        <p>최대 3000자 까지 쓸 수 있습니다.</p>
                        <br />
                        <br />
                        <br />
                        <br />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="range">공유범위</label>
                    </th>
                    <td>
                      <AppTextInput
                        id="range"
                        name="range"
                        placeholder="공유범위 입력"
                        width={300}
                      />
                    </td>
                    <th>
                      <label htmlFor="exposure">메인노출 여부</label>
                    </th>
                    <td>
                      <AppSelect
                        id="exposure"
                        width={274}
                        value="미사용"
                        options={[
                          { label: '사용', value: 'ep01' },
                          { label: '미사용', value: 'ep02' },
                        ]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="fileupload">첨부파일</label>
                    </th>
                    <td colSpan={3}>
                      {/* 첨부파일 블럭 - 컴포넌트화 필요 */}
                      <div className="fileupload-block">
                        <FlexBox justify="flex-end">
                          <button className="add">추가</button>
                        </FlexBox>
                        <table className="table-basic">
                          <colgroup>
                            <col width="5%" />
                            <col width="80%" />
                            <col width="15%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <td align="center"></td>
                              <td>파일명</td>
                              <td>삭제</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td align="center">1</td>
                              <td>오늘의 첨부 엑셀 파일.xls</td>
                              <td align="center">
                                <button className="del">삭제</button>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">2</td>
                              <td>오늘의 첨부 엑셀 파일2.xls</td>
                              <td align="center">
                                <button className="del">삭제</button>
                              </td>
                            </tr>
                            <tr>
                              <td align="center"></td>
                              <td></td>
                              <td align="center">
                                <button className="del">삭제</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* // 첨부파일 */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btn-group-end">
              <Button type="primary" icon={<Check size={18} />} size="large">
                저장
              </Button>
              <Button type="default" icon={<X size={18} />} size="large">
                취소
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NoticeMgmt;
