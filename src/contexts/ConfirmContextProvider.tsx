import { useConfirmStore } from '@/stores/common/useConfirmStore';
import { Modal } from 'antd';
import React, { createContext, useMemo } from 'react';

export const ConfirmContext = createContext<any>({
  showConfirm: () => {},
});

export const ConfirmProvider: React.FC<{ children: any }> = ({ children }) => {
  // Zustand 상태 구독
  const { isOpen, confirmConfig, showConfirm, closeConfirm } = useConfirmStore();

  const contextValue = useMemo(
    () => ({
      showConfirm: (params) => showConfirm(params),
    }),
    [showConfirm],
  );

  const handleOk = () => {
    if (confirmConfig?.onOk) confirmConfig.onOk();
    closeConfirm();
  };

  const handleCancel = () => {
    if (confirmConfig?.onCancel) confirmConfig.onCancel();
    closeConfirm();
  };

  return (
    <ConfirmContext.Provider value={contextValue}>
      {confirmConfig && (
        <Modal
          title={confirmConfig.title}
          closable={true}
          open={isOpen}
          okText={confirmConfig.okText || '확인'}
          cancelText={confirmConfig.cancelText || '취소'}
          centered={true}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          // 모달이 완전히 닫힌 후 데이터 초기화는 Zustand가 관리하므로
          // 필요한 경우에만 추가적인 로직을 넣으시면 됩니다.
        >
          <p>{confirmConfig.message}</p>
        </Modal>
      )}
      {children}
    </ConfirmContext.Provider>
  );
};
