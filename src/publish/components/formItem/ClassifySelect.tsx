import { ReconciliationOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  classify?: string;
};

const ClassifySelect = () => {
  return (
    <div className="form-item">
      <ReconciliationOutlined />
      <Form.Item<FieldType>
        label="구분"
        name="classify"
        rules={[{ required: true, message: '필수선택' }]}
      >
        <Select
          // defaultValue="국내 사무직"
          placeholder="구분"
          options={[
            { label: '국내 사무직', value: 'native' },
            { label: '국외 사무직', value: 'foreign' },
          ]}
          style={{ minWidth: 140 }}
        />
      </Form.Item>
    </div>
  );
};

export default ClassifySelect;
