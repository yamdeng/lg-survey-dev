import { GlobalOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  language?: string;
};

const LanguageSelect = () => {
  return (
    <div className="form-item">
      <GlobalOutlined />
      <Form.Item<FieldType>
        label="언어"
        name="language"
        rules={[{ required: false, message: '선택' }]}
      >
        <Select
          // defaultValue="전체"
          placeholder="언어"
          options={[
            { label: '한국어', value: 'ko' },
            { label: '영어', value: 'en' },
            { label: '중국어', value: 'ch' },
            { label: '일본', value: 'jp' },
          ]}
          style={{ minWidth: 100 }}
        />
      </Form.Item>
    </div>
  );
};

export default LanguageSelect;
