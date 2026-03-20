import AppButton from '@/components/common/AppButton';
import { Modal } from 'antd';
import Config from '@/config/Config';
import { useState } from 'react';
import Code from '@/config/Code';
import AppTextInput from '@/components/common/AppTextInput';
import AppSelect from '@/components/common/AppSelect';
import AppTextEditor from '@/components/common/AppTextEditor';
import AppCodeSelect from '@/components/common/AppCodeSelect';

function GuideListSearchModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              FormModal 단순 퍼블리싱 적용 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/modal/GuideFormModal.tsx`}
              >
                GuideFormModal
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton onClick={openModal} value="formModal" />
          </div>
        </div>
        <Modal
          width={800} // 직접 props로 전달 (숫자는 px 단위)
          centered // 양이 많으므로 화면 중앙에 배치 추천
          closable={true}
          title={'form modal'}
          open={isModalOpen}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <div>
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
                        <AppTextInput
                          id="boardTitle"
                          name="queryJavaName"
                          style={{ width: 500 }}
                          value={'aaa'}
                          errorMessage={'aaa'}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="writer">게시판유형</label>
                      </th>
                      <td colSpan={3}>
                        <AppSelect
                          id="boardType"
                          options={Code.boardType}
                          style={{ width: 250 }}
                          value={''}
                          errorMessage={'sss'}
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={4}>
                        <div className="textEdit">
                          <AppTextEditor id="boardContent" value={'sss'} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="range">사용여부</label>
                      </th>
                      <td>
                        <AppSelect
                          id="useYn"
                          options={Code.useYn}
                          style={{ width: 100 }}
                          value={'Y'}
                          errorMessage={'error'}
                          required
                        />
                      </td>
                      <th>
                        <label htmlFor="exposure">메인노출 여부</label>
                      </th>
                      <td>
                        <AppCodeSelect
                          id="mainYn"
                          codeGrpId="MAIN_DISPLAY_YN"
                          style={{ width: 100 }}
                          value={'Y'}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="range">게시판권한유형</label>
                      </th>
                      <td>
                        <AppCodeSelect
                          id="boardAuthType"
                          codeGrpId="BOARD_AUTH_TYPE"
                          style={{ width: 150 }}
                          required
                        />
                      </td>
                      <th>
                        <label htmlFor="exposure">보안레벨</label>
                      </th>
                      <td>
                        <AppCodeSelect
                          id="securityLevel"
                          codeGrpId="USER_LEVEL"
                          options={Code.securityLevel}
                          style={{ width: 150 }}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </>
  );
}
export default GuideListSearchModal;
