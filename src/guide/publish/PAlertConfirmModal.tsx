import { useState } from 'react';
import { Button, Modal } from 'antd';

function PAlertConfirmModal() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [modalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const showModal2 = () => {
    setOpen2(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleOk2 = () => {
    setOpen2(false);
  };

  const handleCancel = () => {
    setOpen2(false);
  };

  return (
    <>
      <div style={{ marginBottom: 20 }} onClick={showModal}>
        AlertModal open
      </div>

      <div style={{ marginBottom: 20 }} onClick={showModal2}>
        ConfirmModal open
      </div>

      <Modal
        title="Alert Modal Title"
        open={open}
        onOk={handleOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        <p>{modalText}</p>
      </Modal>

      <Modal title="Confirm Modal Title" open={open2} onOk={handleOk2} onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default PAlertConfirmModal;
