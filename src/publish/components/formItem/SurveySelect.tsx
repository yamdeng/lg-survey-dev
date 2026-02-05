import { FormOutlined } from '@ant-design/icons';
import { Form, Select, Space } from 'antd';

type FieldType = {
  survey?: string;
};

const SurveySelect = () => {
  return (
    <Space.Compact block>
      <FormOutlined />
      <Form.Item<FieldType>
        label="설문"
        name="survey"
        rules={[{ required: true, message: '필수선택' }]}
      >
        <Select
          // defaultValue="2025 국내 사무직 설문조사"
          placeholder="구분"
          options={[
            { label: '2025 국내 사무직 설문조사', value: 'native' },
            { label: '2025 국외 사무직 설문조사', value: 'foreign' },
          ]}
          style={{ minWidth: 340 }}
        />
      </Form.Item>
    </Space.Compact>
  );
};

export default SurveySelect;
