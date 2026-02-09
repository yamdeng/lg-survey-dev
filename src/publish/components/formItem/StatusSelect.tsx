import { ReconciliationOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  iqStatus?: string;
};

const StatusSelect = () => {
  return (
    <div className="form-item-group">
      <ReconciliationOutlined />
      <Form.Item<FieldType> label="처리상태" name="iqStatus" rules={[{ required: true }]}>
        <Select
          // defaultValue="국내 사무직"
          placeholder="전체"
          options={[
            { label: '전체' },
            { label: '설문 생성', value: '00' },
            { label: '설문 작성 중', value: '10' },
            { label: '설문 종료', value: '40' },
          ]}
          style={{ minWidth: 140 }}
        />
      </Form.Item>
    </div>
  );
};

export default StatusSelect;
