import { FormOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  survey?: string;
};

const SurveySelect = () => {
  return (
    <div className="form-item">
      <FormOutlined />
      <Form.Item<FieldType> label="설문" name="survey" rules={[{ required: true }]}>
        <Select
          // defaultValue="2025 국내 사무직 설문조사"
          placeholder="설문"
          options={[
            { label: '2025 국내 사무직 설문조사', value: 'native' },
            { label: '2025 국외 사무직 설문조사', value: 'foreign' },
          ]}
          style={{ minWidth: 340 }}
        />
      </Form.Item>
    </div>
  );
};

export default SurveySelect;
