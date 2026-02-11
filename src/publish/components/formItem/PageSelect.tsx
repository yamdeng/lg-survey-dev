import { FileTextOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  page?: string;
};

const PageSelect = () => {
  return (
    <div className="form-item">
      <FileTextOutlined />
      <Form.Item<FieldType>
        label="페이지"
        name="page"
        rules={[{ required: false, message: '선택' }]}
      >
        <Select
          // defaultValue="전체"
          placeholder="1"
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
          ]}
          style={{ minWidth: 60 }}
        />
      </Form.Item>
    </div>
  );
};

export default PageSelect;
