import type { FormProps, TableColumnsType, TableProps } from 'antd';
import { Breadcrumb, Button, Flex, Form, Space, Table } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useState } from 'react';

import ClassifySelect from '@/publish/components/formItem/ClassifySelect';
import CompanyNameSelect from '@/publish/components/formItem/CompanyNameSelect';
import LanguageSelect from '@/publish/components/formItem/LanguageSelect';
import PageSelect from '@/publish/components/formItem/PageSelect';
import SurveySelect from '@/publish/components/formItem/SurveySelect';
import YearSelect from '@/publish/components/formItem/YearSelect';
import HeaderMenu from '@/publish/components/headerMenu';

import {
  DownloadOutlined,
  ExportOutlined,
  HomeOutlined,
  ProfileOutlined,
  SearchOutlined,
} from '@ant-design/icons';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  page: number;
  order: number;
  questionkey: string;
  question: string;
  languge: string;
  title: string;
  content: string;
  view: string;
  viewcontent: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '페이지',
    dataIndex: 'page',
    width: 90,
    align: 'center',
    sorter: (a, b) => a.page - b.page,
  },
  {
    title: '순서',
    dataIndex: 'order',
    width: 90,
    align: 'center',
    sorter: (a, b) => a.order - b.order,
  },
  {
    title: '문항키',
    dataIndex: 'questionkey',
    width: 80,
    align: 'center',
    sorter: (a, b) => a.questionkey.length - b.questionkey.length,
    sortDirections: ['descend'],
  },
  { title: '문항유형', dataIndex: 'question' },
  { title: '언어', dataIndex: 'languge', width: 100, align: 'center' },
  { title: '문항제목', dataIndex: 'title' },
  { title: '문항내용', dataIndex: 'content' },
  { title: '보기', dataIndex: 'view', width: 100, align: 'center' },
  { title: '보기내용', dataIndex: 'viewcontent' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  page: i,
  order: i,
  questionkey: `AA00000${i}`,
  question: `설명 ${i}`,
  languge: `영어 ${i}`,
  title: `리더의 비젼 ${i}`,
  content: `비전 달성을 위한 전략방향이 명확하게 정립되어 있디 ${i}`,
  view: `선택 ${i}`,
  viewcontent: `1. 그렇다 2. 보통이다 3. 아니다 ${i}`,
}));

const QuestionInfo = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // form 초기값
  const initialValues = {
    year: '2026', // 년도
    companyname: 'opt-1', // 회사명
    classify: '국내 사무직', // 구분
    // 설문
    // 페이지
    // 언어
  };

  return (
    <div className="ant-layout-page">
      <Header>
        <Breadcrumb
          separator=">"
          items={[
            { href: '/', title: <HomeOutlined /> },
            { title: 'Question' },
            { title: 'Question Info' },
          ]}
        />
        <HeaderMenu />
      </Header>
      <Content>
        <div className="content-inner">
          <div className="page-title">
            <ProfileOutlined />
            <h3>Dashboard Menu03-sub02 : Title - Question Info</h3>
          </div>

          <div className="page-content">
            <div className="page-form-wrap">
              {/* 검색폼 영역 */}
              <div className="page-form-block">
                <Form
                  initialValues={initialValues}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  {/* 커스텀 form 컴포넌트 */}
                  <Space className="form-group">
                    <YearSelect />
                    <CompanyNameSelect />
                    <ClassifySelect />
                    <SurveySelect />
                    <PageSelect />
                    <LanguageSelect />
                  </Space>

                  <Button type="primary" icon={<SearchOutlined />} iconPlacement="end">
                    검색
                  </Button>
                </Form>
              </div>

              {/* ag-grid 그리드 테이블 영역 */}
              <div className="page-grid-block">
                <Flex style={{ marginBottom: 10 }} justify="flex-end" align="center">
                  <Button type="primary" icon={<DownloadOutlined />} size="middle" />
                </Flex>

                <Table<DataType>
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={{ pageSize: 10, simple: true }}
                />
              </div>
              <Flex justify="flex-end" align="center">
                <Button type="primary" icon={<ExportOutlined />} iconPlacement="end" size="large">
                  미리보기
                </Button>
              </Flex>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default QuestionInfo;
