import { useAlertStore } from '@/stores/common/useAlertStore';
import { Button, Modal } from 'antd';
import React, { createContext, useMemo } from 'react';

export const AlertContext = createContext<any>({
  showAlert: () => {},
});

export const AlertProvider: React.FC<{ children: any }> = ({ children }) => {
  // Zustand에서 상태와 액션을 가져옵니다.
  const { isOpen, alertConfig, showAlert, closeAlert } = useAlertStore();

  const contextValue = useMemo(
    () => ({
      showAlert: (params) => showAlert(params),
    }),
    [showAlert],
  );

  // 확인 핸들러
  const handleOk = () => {
    if (alertConfig?.onOk) alertConfig.onOk();
    closeAlert();
  };

  // 취소/닫기 핸들러
  const handleCancel = () => {
    if (alertConfig?.onClose) alertConfig.onClose();
    closeAlert();
  };

  // 추가 버튼 핸들러
  const handleClickExtraBtn = () => {
    if (alertConfig?.onClickExtraBtn) alertConfig.onClickExtraBtn();
    closeAlert();
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {isOpen && alertConfig && (
        <Modal
          title={alertConfig.title}
          closable={true}
          open={isOpen}
          footer={(_, { OkBtn }) => (
            <>
              <OkBtn />
              {alertConfig?.extraBtnText && (
                <Button onClick={handleClickExtraBtn}>{alertConfig?.extraBtnText}</Button>
              )}
            </>
          )}
          okText={alertConfig.okText || '확인'}
          centered={true}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          // afterClose 시 상태 초기화는 필요한 경우 스토어에서 처리 가능합니다.
        >
          <p>{alertConfig.message}</p>
        </Modal>
      )}
      {children}
    </AlertContext.Provider>
  );
};
