import { useEffect, useRef } from 'react';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSelect from '@/components/common/AppSelect';
import AppTextEditor from '@/components/common/AppTextEditor';
import AppButton from '@/components/common/AppButton';
import AppTextInput from '@/components/common/AppTextInput';
import Code from '@/config/Code';
import { FORM_TYPE_ADD } from '@/config/CommonConstant';
import FlexBox from '@/components/common/ui/FlexBox';
import { Check, FilePenLine, Plus, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNoticeFormStore } from './useNoticeFormStore';
import ToastService from '@/services/ToastService';
import ApiService from '@/services/ApiService';
import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';

const NoticeForm = (props) => {
  const { formMode } = props;

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { detailId } = useParams();

  /* formStore state input 변수 */
  const { errors, changeInput, formValue, save, getDetail, fileList, addFileList, deleteFile } =
    useNoticeFormStore();

  const {
    boardType,
    boardTitle,
    boardContent,
    useYn,
    mainYn,
    boardAuthType,
    securityLevel,
    clear,
  } = formValue;

  const cancel = () => {
    navigate(-1);
  };

  // 파일 선택 버튼 클릭 핸들러
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 핸들러
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files && !files.length) return;

    for (let fileListIndex = 0; fileListIndex < files.length; fileListIndex++) {
      const fileInfo = files[fileListIndex];
      if (fileInfo.size / 1024 / 1024 > Config.fileUploadMaxSizeMb) {
        ToastService.warn(`file max size :${Config.fileUploadMaxSizeMb} MB`);
        return;
      }
    }

    const formData = new FormData();

    Array.from(files).forEach((file: any) => {
      formData.append('files', file);
    });

    try {
      const apiParam: any = {};
      const apiResult = await ApiService.fileUpload(formData, apiParam);

      const { fileList } = apiResult;
      addFileList(fileList);
      event.target.value = '';
    } catch {
      ToastService.error('file upload error');
      event.target.value = '';
    }
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
          <h3 className="title-text">공지사항 {formMode === FORM_TYPE_ADD ? '등록' : '수정'}</h3>
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
                    <AppTextInput
                      id="boardTitle"
                      name="queryJavaName"
                      style={{ width: 500 }}
                      value={boardTitle}
                      onChange={(value) => changeInput('boardTitle', value)}
                      errorMessage={errors.boardTitle}
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
                      value={boardType}
                      onChange={(value) => changeInput('boardType', value)}
                      errorMessage={errors.boardType}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={4}>
                    <div className="textEdit">
                      <AppTextEditor
                        id="boardContent"
                        value={boardContent}
                        onChange={(value) => changeInput('boardContent', value)}
                        errorMessage={errors.boardContent}
                      />
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
                      value={useYn}
                      onChange={(value) => changeInput('useYn', value)}
                      errorMessage={errors.useYn}
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
                      value={mainYn}
                      onChange={(value) => changeInput('mainYn', value)}
                      errorMessage={errors.mainYn}
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
                      value={boardAuthType}
                      onChange={(value) => changeInput('boardAuthType', value)}
                      errorMessage={errors.boardAuthType}
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
                      value={securityLevel}
                      onChange={(value) => changeInput('securityLevel', value)}
                      errorMessage={errors.securityLevel}
                      required
                    />
                  </td>
                </tr>
                {/* 첨부파일 start */}
                <tr>
                  <th>
                    <label htmlFor="fileupload">첨부파일</label>
                  </th>
                  <td colSpan={3}>
                    {/* 첨부파일 블럭 - 컴포넌트화 필요 */}
                    <div className="fileupload-block">
                      <FlexBox justify="flex-end">
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          multiple
                        />
                        <AppButton
                          icon={<Plus size={17} />}
                          value="추가"
                          theme="basic"
                          size="large"
                          onClick={openFileDialog}
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
                                <td align="center">
                                  <AppButton
                                    icon={<X size={13} />}
                                    value="삭제"
                                    theme="basic"
                                    size="small"
                                    onClick={() => deleteFile(fileKey)}
                                  />
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
                {/* 첨부파일 end */}
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
  );
};

export default NoticeForm;
