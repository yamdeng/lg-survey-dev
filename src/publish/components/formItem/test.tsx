import { ReconciliationOutlined } from '@ant-design/icons';
import { Form, Select, Space } from 'antd';

type FieldType = {
  name?: string;
  classify?: string;
};

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//   console.log('Success:', values);
// };

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

const ClassifySelect = () => {
  return (
    <Space.Compact block>
      <ReconciliationOutlined />
      <Form.Item<FieldType>
        label="구분"
        name="classify"
        rules={[{ required: true, message: '필수선택' }]}
      >
        <Select
          defaultValue="국내 사무직"
          placeholder="구분"
          options={[
            { label: '국내 사무직', value: 'native' },
            { label: '국외 사무직', value: 'foreign' },
          ]}
          style={{ minWidth: 200 }}
        />
      </Form.Item>
    </Space.Compact>
  );
};

export default ClassifySelect;
