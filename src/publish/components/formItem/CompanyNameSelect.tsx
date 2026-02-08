import { InsertRowLeftOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  companyname?: string;
};

const CompanyNameSelect = () => {
  return (
    <div className="form-item-group">
      <InsertRowLeftOutlined />
      <Form.Item<FieldType>
        label="회사명"
        name="companyname"
        rules={[{ required: true, message: '회사명 필수선택' }]}
      >
        <Select
          // defaultValue="opt-1"
          placeholder="회사명 선택"
          options={[
            { label: '네이버', value: 'opt-1' },
            { label: '구글', value: 'opt-2' },
            { label: '아마존', value: 'opt-3' },
          ]}
          style={{ minWidth: 240 }}
        />
      </Form.Item>
    </div>
  );
};

export default CompanyNameSelect;
