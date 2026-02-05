import HeaderMenu from '@/publish/components/headerMenu';
import { HomeOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Breadcrumb, Input, Select, Space, Table } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

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
  return (
    <div className="ant-layout-page">
      <Header>
        <Breadcrumb
          separator=">"
          items={[{ href: '/', title: <HomeOutlined /> }, { title: 'Main' }, { title: '공지사항' }]}
        />
        <HeaderMenu />
      </Header>
      <Content>
        <div className="content-inner">
          {/* title 컴포넌트 변경예정 */}
          <h3 className="page-title" style={{ textAlign: 'left' }}>
            Dashboard Menu01 - Notice : 공지사항
          </h3>

          <div className="page-content">
            <div className="page-form-wrap">
              {/* 검색폼 영역 */}
              <div className="page-form-box" style={{ justifyContent: 'flex-end' }}>
                <Space orientation="horizontal" style={{ justifyContent: 'end' }}>
                  <Space.Compact block>
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
                  </Space.Compact>
                  <Space.Compact block>
                    <Input.Search
                      style={{ width: 400 }}
                      defaultValue="2345"
                      placeholder="검색하세요"
                    />
                  </Space.Compact>
                </Space>
              </div>

              {/* 테이블 또는 ag grid 영역 */}
              <div className="page-grid-table">
                <Table<DataType>
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 3, simple: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Notice;
