import { useEffect } from 'react';

import AppButton from '@/components/common/AppButton';
import AppTextEditor from '@/components/common/AppTextEditor';
import Code from '@/config/Code';
import HeaderMenu from '@/publish/components/header/HeaderMenu';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import CodeService from '@/services/CodeService';
import { Check, FilePenLine, Home, Plus, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGuidePatternFormStore } from '@/guide/stores/useGuidePatternFormStore';

function GuidePatternDetail1() {
  const navigate = useNavigate();
  const { detailId } = useParams();

  /* formStore state input 변수 */
  const { getDetail, detailInfo, save, clear } = useGuidePatternFormStore();

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
            </dl>
          </div>
          <HeaderMenu />
        </FlexBox>
      </header>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">Notice Detail</h3>
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
                        <FlexBox justify="flex-end">
                          <AppButton
                            icon={<Plus size={17} />}
                            value="추가"
                            theme="basic"
                            size="large"
                          />
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
                                <AppButton
                                  icon={<X size={13} />}
                                  value="삭제"
                                  theme="basic"
                                  size="small"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td align="center">2</td>
                              <td>오늘의 첨부 엑셀 파일2.xls</td>
                              <td align="center">
                                <AppButton
                                  icon={<X size={13} />}
                                  value="삭제"
                                  theme="basic"
                                  size="small"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td align="center"></td>
                              <td></td>
                              <td align="center">
                                <AppButton
                                  icon={<X size={13} />}
                                  value="삭제"
                                  theme="basic"
                                  size="small"
                                />
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
              <AppButton icon={<Check size={18} />} value="저장" onClick={save} />
              <AppButton icon={<X size={18} />} value="취소" theme="secondary" onClick={cancel} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuidePatternDetail1;
