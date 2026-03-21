import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppSelect from '@/components/common/AppSelect';
import AppTextEditor from '@/components/common/AppTextEditor';
import AppTextInput from '@/components/common/AppTextInput';
import Code from '@/config/Code';
import { useGuidePatternFormStore } from '@/guide/stores/useGuidePatternFormStore';
import { Check, FilePenLine } from 'lucide-react';
import { useEffect } from 'react';

const GuidePatternForm1 = () => {
  /* formStore state input 변수 */
  const { errors, changeInput, changeBoardType, formValue, save, clear } =
    useGuidePatternFormStore();

  const { boardType, boardTitle, boardContent, useYn, mainYn, boardAuthType, securityLevel } =
    formValue;

  useEffect(() => {
    return clear;
  }, []);

  return (
    <main className="content-main">
      <div className="content-inner">
        <div className="content-title">
          <FilePenLine size={18} />
          <h3 className="title-text">폼 예시(store)</h3>
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
                      onChange={(value) => changeBoardType(value)}
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
                      disabled={boardType === 'normal' ? true : false}
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
              </tbody>
            </table>
          </div>
          <div className="btn-group-end">
            <AppButton icon={<Check size={18} />} value="저장" onClick={save} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuidePatternForm1;
