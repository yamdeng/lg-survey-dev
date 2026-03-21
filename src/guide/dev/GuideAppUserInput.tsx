import AppButton from '@/components/common/AppButton';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { userBaseColumns } from '@/data/grid/table-column';
import ApiService from '@/services/ApiService';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { create } from 'zustand';

/*

  #.상세 ID 기준으로 모달 검색해서 자동으로 input에 정보 셋팅하는 예시

*/

const initListData = {
  ...listBaseState,
  listApiPath: 'user',
};

const useListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  clear: () => {
    set({ ...listBaseState });
  },
}));

const UserSelectModal = (props) => {
  const { isOpen, isMultiple, closeModal, okModal } = props;
  const columns = userBaseColumns;
  // authorCd, deptKey, userName, userId, positionTitle

  const {
    search,
    list,
    selectedRowInfos,
    selectedRowKeys,
    changeSelectedRowInfos,
    changeSelectedRowKeys,
  } = useListStore();

  const handleRowSelect = (selectedData) => {
    // 멀티 선택 모드일 경우 배열로 들어옴
    changeSelectedRowInfos(selectedData);

    // 중요! : userKey로 정의(각 행의 id 키값 반영)
    const ids = Array.isArray(selectedData)
      ? selectedData.map((item) => item.userKey)
      : [selectedData?.userKey];

    changeSelectedRowKeys(ids);
  };

  const handleApply = () => {
    okModal(selectedRowInfos);
  };

  useEffect(() => {
    if (isOpen) {
      search();
    }
  }, [isOpen]);

  const okButtonEnable = isMultiple
    ? selectedRowInfos && selectedRowInfos.length
    : selectedRowInfos;

  return (
    <Modal
      width={800} // 직접 props로 전달 (숫자는 px 단위)
      centered // 양이 많으므로 화면 중앙에 배치 추천
      closable={true}
      title={'사용자 검색'}
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div>
        <div className="content-body">
          <div className="form-block border-none">
            <form>
              <div className="form-inline justify-end">
                <AppSearchInput value="입력해주세요" style={{ marginRight: 10 }} />
              </div>
            </form>
          </div>
          <div className="grid-block">
            <div className="grid-block-body">
              <div className="ag-grid">
                <AppTable
                  tableHeight={500}
                  pageSize={20}
                  rowData={list}
                  columns={columns}
                  rowSelectMode={isMultiple ? 'multiRow' : 'singleRow'}
                  handleRowSelect={handleRowSelect}
                  enableCheckBox
                  selectedRowIds={selectedRowKeys}
                  rowIdKey="userKey"
                />
              </div>
            </div>
          </div>
          <div className="btn-group-end">
            <AppButton value="취소" onClick={closeModal} />
            <AppButton value="적용" onClick={handleApply} disabled={!okButtonEnable} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

function AppUserSelectInput(props) {
  const { value, onChange, preventSearch = false, ...rest } = props;
  const [isUserSelectModalopen, setIsUserSelectModalopen] = useState(false);
  const [selectUserInfo, setSelectUserInfo] = useState(null);

  const clearHandler = () => {
    onChange(null);
    setSelectUserInfo(null);
  };

  const handleOrgSelectModal = (selectedValue) => {
    if (selectedValue) {
      setSelectUserInfo(selectedValue);
      onChange(selectedValue.userKey);
    }
    setIsUserSelectModalopen(false);
  };

  const searchInputValue =
    value && selectUserInfo
      ? `${selectUserInfo.userName}(${selectUserInfo.positionTitle || ''})`
      : '';

  const searchUser = useCallback(
    async (userKey) => {
      const apiResult = await ApiService.get(`user/${userKey}`);
      const data = apiResult;
      setSelectUserInfo(data);
    },
    [value],
  );

  useEffect(() => {
    if (value) {
      searchUser(value);
    }
  }, [value]);

  return (
    <>
      <AppSearchInput
        {...rest}
        disabled
        search={() => {
          if (!preventSearch) {
            setIsUserSelectModalopen(true);
          }
        }}
        clearHandler={clearHandler}
        value={searchInputValue}
      />
      <UserSelectModal
        isOpen={isUserSelectModalopen}
        closeModal={() => setIsUserSelectModalopen(false)}
        isMultiple={false}
        okModal={handleOrgSelectModal}
      />
    </>
  );
}

function GuideAppUserInput() {
  const [userKey, setUserKey] = useState('');

  const changeInput = (inputValue) => {
    setUserKey(inputValue);
  };

  const save = () => {
    alert(`userKey: ${userKey}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              GuideAppUserInput :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideAppUserInput.tsx`}>
                GuideAppUserInput
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppUserSelectInput
              name="chiefKey"
              label="사용자"
              value={userKey}
              onChange={(value) => {
                changeInput(value);
              }}
            />
            <hr className="line"></hr>
            <p>
              <AppButton value="확인" onClick={save} />
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideAppUserInput;
