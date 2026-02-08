import type { TableColumnsType } from 'antd';
import { Breadcrumb, Table } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useState } from 'react';

import CompanyNameSelect from '@/publish/components/formItem/CompanyNameSelect';
import HeaderMenu from '@/publish/components/headerMenu';
import { Checkbox, Form, Input, Radio, Select } from 'antd';
import { Home, Search, FilePenLine, ClipboardList } from 'lucide-react';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';

interface DataType {
  key: React.Key;
  name: string;
  title: string;
  content: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'key',
    key: 'key',
    render: (text) => <a>{text}</a>,
    width: 60,
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
    width: 200,
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    render: (text) => <a>{text}</a>,
    width: 300,
  },
  { title: 'test', dataIndex: 'test', key: 'test', ellipsis: true },
];

const data = [
  {
    key: '1',
    name: 'test1',
    title: '테스트1',
    content: '공지사항 테스트1',
    tags: ['check', 'new'],
  },
  {
    key: '2',
    name: 'test2',
    title: '테스트2',
    content: '공지사항 테스트2',
    tags: ['01', 'new'],
  },
  {
    key: '3',
    name: 'test3',
    title: '테스트3',
    content: '공지사항 테스트3',
    tags: ['02', 'new'],
  },
  {
    key: '4',
    name: 'test4',
    title: '테스트4',
    content: '공지사항 테스트4',
    tags: ['03', 'new'],
  },
  {
    key: '5',
    name: 'test5',
    title: '테스트5',
    content: '공지사항 테스트5',
    tags: ['2025', 'new'],
  },
  {
    key: '6',
    name: 'test6',
    title: '테스트6',
    content: '공지사항 테스트6',
    tags: ['11', 'new'],
  },
  {
    key: '7',
    name: 'test7',
    title: '테스트7',
    content: '공지사항 테스트7',
    tags: ['14', 'new'],
  },
  {
    key: '8',
    name: 'test8',
    title: '테스트8',
    content: '공지사항 테스트8',
    tags: ['17', 'new'],
  },
];

const CommonInfo = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <>
      <header className="content-header">
        <FlexBox className="content-inner" justify={'space-between'}>
          <div className="bread-crumb">
            <dl className="bread-crumb-list">
              <dt>
                <a href="/">
                  <Home size={16} />
                </a>
              </dt>
              <dd>
                <a href="#">Question</a>
              </dd>
              <dd>
                <a href="#">Common Info</a>
              </dd>
            </dl>
          </div>
          <HeaderMenu />
        </FlexBox>
      </header>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">Menu02-sub02 Title : Languge Info</h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              {/* 검색폼 영역 */}
              <div className="page-form-box">
                <Form>
                  <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                  >
                    Form disabled
                  </Checkbox>

                  <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                    <Checkbox>Checkbox</Checkbox>
                  </Form.Item>
                  <Form.Item label="Radio">
                    <Radio value="apple">Apple</Radio>
                    <Radio value="pear">pear</Radio>
                  </Form.Item>
                  <Form.Item label="Input">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Select">
                    <Select options={[{ label: 's01_Select', value: 10 }]} />
                  </Form.Item>

                  <CompanyNameSelect />
                </Form>
              </div>

              {/* 테이블 또는 ag grid 영역 */}
              <div className="page-grid-table">
                <Table<DataType> columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommonInfo;
