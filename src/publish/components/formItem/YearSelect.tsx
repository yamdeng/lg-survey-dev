import { CalendarOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';

type FieldType = {
  year?: string;
};

const YearSelect = () => {
  return (
    <div className="form-item-group">
      <CalendarOutlined />
      <Form.Item<FieldType> label="년도" name="year" rules={[{ required: true }]}>
        <Select
          // defaultValue="2026"
          id="year"
          placeholder="년도"
          options={[
            { label: '2021', value: '2021' },
            { label: '2022', value: '2022' },
            { label: '2023', value: '2023' },
            { label: '2024', value: '2024' },
            { label: '2025', value: '2025' },
            { label: '2026', value: '2026' },
          ]}
          style={{ minWidth: 80 }}
        />
      </Form.Item>
    </div>
  );
};

export default YearSelect;
