import HeaderMenu from '@/publish/components/headerMenu';
import { HomeOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Input, Select, Table, Form, Button } from 'antd';

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
    title: <PaperClipOutlined />,
    dataIndex: 'file',
    key: 'file',
    render: (text) => <a>{text}</a>,
    width: 60,
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
    width: 400,
  },
  {
    title: '게시자',
    dataIndex: 'publisher',
    key: 'publisher',
    render: (text) => <a>{text}</a>,
    width: 120,
  },
  {
    title: '수정일',
    dataIndex: 'revision',
    key: 'revision',
    render: (text) => <a>{text}</a>,
    width: 100,
    align: 'center',
  },
  {
    title: '조회수',
    dataIndex: 'hits',
    key: 'hits',
    render: (number) => <a>{number}</a>,
    width: 100,
    align: 'center',
  },
];

const data = [
  {
    name: 'data-notice',
    key: '1',
    content: '',
    file: '0',
    title: 'Dashboard Menu01 - Notice : 공지사항 - 테스트1',
    publisher: '관리자',
    revision: '2025.01.22',
    hits: 0,
  },
  {
    name: 'data-notice',
    key: '2',
    content: '',
    file: '1',
    title: '테스트2',
    publisher: '팀장1',
    revision: '2025.01.22',
    hits: 10,
  },
  {
    name: 'data-notice',
    key: '3',
    content: '',
    file: '2',
    title: '테스트3',
    publisher: '사원1',
    revision: '2025.01.22',
    hits: 100,
  },
  {
    name: 'data-notice',
    key: '4',
    content: '',
    file: '22',
    title: '테스트4',
    publisher: '관리자',
    revision: '2025.01.22',
    hits: 123,
  },
  {
    name: 'data-notice',
    key: '5',
    content: '',
    file: '456',
    title: '테스트5',
    publisher: '팀장2',
    revision: '2025.01.22',
    hits: 8,
  },
  {
    name: 'data-notice',
    key: '6',
    content: '',
    file: '456',
    title: '테스트5',
    publisher: '팀장2',
    revision: '2025.01.22',
    hits: 8,
  },
  {
    name: 'data-notice',
    key: '7',
    content: '',
    file: '456',
    title: '테스트5',
    publisher: '팀장2',
    revision: '2025.01.22',
    hits: 8,
  },
  {
    name: 'data-notice',
    key: '8',
    content: '',
    file: '456',
    title: '테스트5',
    publisher: '팀장2',
    revision: '2025.01.22',
    hits: 8,
  },
];

const Notice = () => {
  const [form] = Form.useForm();
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
                <a href="#">Edition</a>
              </dd>
              <dd>
                <a href="#">Language Info</a>
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
              <Form form={form}>
                <div className="form-inline justify-end">
                  <div className="form-item-group">
                    <Select
                      defaultValue="opt-3"
                      placeholder="제목+내용"
                      options={[
                        { label: '제목', value: 'opt-1' },
                        { label: '내용', value: 'opt-2' },
                        { label: '제목 + 내용', value: 'opt-3' },
                      ]}
                      style={{ width: 200 }}
                    />
                  </div>
                  <div className="form-item-group">
                    <Input.Search
                      style={{ width: 400 }}
                      defaultValue="2345"
                      placeholder="검색하세요"
                    />
                  </div>
                </div>
              </Form>
            </div>

            <div className="grid-block">
              <div className="grid-block-header">
                <div className="content-title">
                  <ClipboardList size={18} />
                  <h3 className="title-text">Survey Info</h3>
                </div>
              </div>

              <div className="grid-block-body">
                {/* AntD- 기본 테이블 */}
                <Table<DataType>
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 8, simple: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Notice;
