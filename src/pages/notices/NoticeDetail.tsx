import { useEffect } from 'react';

import AppButton from '@/components/common/AppButton';
import AppTextEditor from '@/components/common/AppTextEditor';
import Code from '@/config/Code';
import CodeService from '@/services/CodeService';
import { Check, FilePenLine, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CommonUtil from '@/utils/CommonUtil';
import { useNoticeFormStore } from './useNoticeFormStore';

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { detailId } = useParams();

  /* formStore state input 변수 */
  const { getDetail, detailInfo, clear, goEditPage, fileList } = useNoticeFormStore();

  const {
    boardKey,
    boardType,
    boardTitle,
    boardContent,
    useYn,
    mainYn,
    boardAuthType,
    securityLevel,
  } = detailInfo;

  const cancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, [detailId]);

  return (
    <main className="content-main">
      <div className="content-inner">
        <div className="content-title">
          <FilePenLine size={18} />
          <h3 className="title-text">공지사항 상세</h3>
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
                    <label htmlFor="title">게시글키</label>
                  </th>
                  <td colSpan={3}>{boardKey}</td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="title">제목</label>
                  </th>
                  <td colSpan={3}>{boardTitle}</td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="writer">게시판유형</label>
                  </th>
                  <td colSpan={3}>{Code.getCodeLabelByValue('boardType', boardType)}</td>
                </tr>

                <tr>
                  <td colSpan={4}>
                    <div className="textEdit">
                      <AppTextEditor isViewMode value={boardContent} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="range">사용여부</label>
                  </th>
                  <td>{Code.getCodeLabelByValue('useYn', useYn)}</td>
                  <th>
                    <label htmlFor="exposure">메인노출 여부</label>
                  </th>
                  <td>{CodeService.getCodeLabelByValue('MAIN_DISPLAY_YN', mainYn)}</td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="range">게시판권한유형</label>
                  </th>
                  <td>{CodeService.getCodeLabelByValue('BOARD_AUTH_TYPE', boardAuthType)}</td>
                  <th>
                    <label htmlFor="exposure">보안레벨</label>
                  </th>
                  <td>{CodeService.getCodeLabelByValue('USER_LEVEL', securityLevel)}</td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="fileupload">첨부파일</label>
                  </th>
                  <td colSpan={3}>
                    {/* 첨부파일 블럭 - 컴포넌트화 필요 */}
                    <div className="fileupload-block">
                      <table className="table-basic">
                        <colgroup>
                          <col width="10%" />
                          <col width="90%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td align="center"></td>
                            <td>파일명</td>
                          </tr>
                        </thead>
                        <tbody>
                          {fileList.map((fileInfo, index) => {
                            const { oriFilename, fileKey } = fileInfo;
                            return (
                              <tr>
                                <td align="center">{index + 1}</td>
                                <td
                                  onClick={() =>
                                    CommonUtil.downloadFile(
                                      `/api/v1/common-file/${fileKey}/download`,
                                    )
                                  }
                                >
                                  {oriFilename}
                                </td>
                              </tr>
                            );
                          })}
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
            <AppButton icon={<Check size={18} />} value="수정" onClick={goEditPage} />
            <AppButton icon={<X size={18} />} value="취소" theme="secondary" onClick={cancel} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NoticeDetail;
