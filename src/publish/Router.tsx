import React, { useState } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  House,
  Laptop,
  Files,
  ListChecks,
  UsersRound,
  Mail,
  FileChartLine,
  ClipboardList,
  Database,
  Network,
} from 'lucide-react';

// page 컴포넌트
import RootLayout from '@/publish/pages/RootLayout';
import DashboardMain from '@/publish/pages/dashboardMain';
import Notice from '@/publish/pages/notice';
import NoticeMgmt from '@/publish/pages/notice/NoticeMgmt';

import LanguageInfo from '@/publish/pages/edition/languageInfo';
import SurveyInfo from '@/publish/pages/edition/surveyInfo';

import CommonInfo from '@/publish/pages/question/commonInfo';
import QuestionInfo from '@/publish/pages/question/questionInfo';

import TargetInfo from '@/publish/pages/target/TargetInfo';
import OrganizInfo from '@/publish/pages/target/OrganizInfo';
import OrganizerInfo from '@/publish/pages/target/OrganizerInfo';

import TransferInfo from '@/publish/pages/email/TransferInfo';
import MailTemplate from '@/publish/pages/email/MailTemplate';
import MailContentTemplate from '@/publish/pages/email/MailContentTemplate';
import QuestionTemplate from '@/publish/pages/email/QuestionTemplate';

import Response from '@/publish/pages/checkResult/Response';
import Report from '@/publish/pages/checkResult/Report';
import AnswerResult from '@/publish/pages/checkResult/AnswerResult';
import ChoiceResult from '@/publish/pages/checkResult/ChoiceResult';
import AnalysisResult from '@/publish/pages/checkResult/AnalysisResult';
import PastOrganization from '@/publish/pages/checkResult/PastOrganization';
import OrgNotReports from '@/publish/pages/checkResult/OrgNotReports';
import ComparisonTable from '@/publish/pages/checkResult/ComparisonTable';

import ManageResults from '@/publish/pages/results/ManageResults';
import ManageTemplate from '@/publish/pages/results/ManageTemplate';
import ManageContent from '@/publish/pages/results/ManageContent';
import ManageQuestion from '@/publish/pages/results/ManageQuestion';

import Rawdata from '@/publish/pages/rawdata/Rawdata';

import CodeGroup from '@/publish/pages/system/CodeGroup';
import CodeManage from '@/publish/pages/system/CodeManage';
import FactorManage from '@/publish/pages/system/FactorManage';

// 1. 커스텀 handle 타입 정의
export interface RouteHandle {
  breadcrumbName?: string;
  label?: string;
  icon?: React.ReactNode;
  key?: string;
}

// 2. 라우터 구성 - 퍼블 브래드스크럼 추가
export const Router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // 레이아웃
    handle: {
      breadcrumbName: 'Main', // breadcrumb: () => 'Main',
      icon: <House />,
      // key: '0',
    },
    children: [
      {
        index: true, // 경로가 '/' 일 때 기본으로 보여줄 페이지
        element: <DashboardMain />, // 메인에 띄울 컴포넌트
      },
      {
        path: 'notice',
        handle: {
          breadcrumbName: '공지사항',
          label: '공지사항', // 1. 공지사항
          icon: <Laptop />,
          key: '1',
        },
        children: [
          {
            path: 'notice',
            element: <Notice />, // 1-1 공지사항
            handle: {
              breadcrumbName: '공지사항',
              label: '공지사항',
              key: '11',
            },
          },
          {
            path: 'modify',
            element: <NoticeMgmt />, // 1-2 공지사항 상세 테스트 Write/Modify
            handle: {
              breadcrumbName: '작성/수정',
              label: '작성/수정 - 상세테스트',
              key: '12',
            },
          },
        ],
      },
      {
        path: 'edition',
        handle: {
          breadcrumbName: '판본 관리',
          label: '판본 관리', // 2. 판본 관리
          icon: <Files />,
          key: '2',
        },
        children: [
          {
            path: 'surveyInfo',
            element: <SurveyInfo />, // 2-1 설문 관리
            handle: {
              breadcrumbName: '설문 관리',
              label: '설문 관리',
              key: '21',
            },
          },
          {
            path: 'languageInfo',
            element: <LanguageInfo />, // 2-2 언어 관리
            handle: {
              breadcrumbName: '언어 관리',
              label: '언어 관리',
              key: '22',
            },
          },
        ],
      },
      {
        path: 'question',
        handle: {
          breadcrumbName: '문항관리',
          label: '문항관리', // 3. 문항 관리
          icon: <ListChecks />,
          key: '3',
        },
        children: [
          {
            path: 'commonInfo',
            element: <CommonInfo />, // 3-1 일반 관리
            handle: {
              breadcrumbName: '공통 문항관리',
              label: '공통 문항관리',
              key: '31',
            },
          },
          {
            path: 'questionInfo',
            element: <QuestionInfo />, // 3-2 문항 관리
            handle: {
              breadcrumbName: '문항관리',
              label: '문항관리',
              key: '32',
            },
          },
        ],
      },
      {
        path: 'target',
        handle: {
          breadcrumbName: '대상자 관리',
          label: '대상자 관리', // 4. Target Management
          icon: <UsersRound />,
          key: '4',
        },
        children: [
          {
            path: 'targetInfo',
            element: <TargetInfo />, // 4-1 Target info
            handle: {
              breadcrumbName: '대상자 관리',
              label: '대상자 관리',
              key: '41',
            },
          },
          {
            path: 'organizInfo',
            element: <OrganizInfo />, // 4-2 Organiz info
            handle: {
              breadcrumbName: '조직 관리',
              label: '조직 관리',
              key: '42',
            },
          },
          {
            path: 'organizerInfo',
            element: <OrganizerInfo />, // 4-3 Organizer info
            handle: {
              breadcrumbName: '조직자 관리',
              label: '조직자 관리',
              key: '43',
            },
          },
        ],
      },
      {
        path: 'mail',
        handle: {
          breadcrumbName: '설문 메일 발송',
          label: '설문 메일 발송', // 5. Send survey mail
          icon: <Mail />,
          key: '5',
        },
        children: [
          {
            path: 'transferInfo',
            element: <TransferInfo />, // 5-1 Netpion Transfer
            handle: {
              breadcrumbName: '넷피온 전송작업 관리',
              label: '넷피온 전송작업 관리',
              key: '51',
            },
          },
          {
            path: 'mailTemplate',
            element: <MailTemplate />, // 5-2 Mail template
            handle: {
              breadcrumbName: '메일 템플릿 관리',
              label: '메일 템플릿 관리',
              key: '52',
            },
          },
          {
            path: 'mailContentTemplate',
            element: <MailContentTemplate />, // 5-3 Mail template content
            handle: {
              breadcrumbName: '메일 템플릿 내용 관리',
              label: '메일 템플릿 내용 관리',
              key: '53',
            },
          },
          {
            path: 'questionTemplate',
            element: <QuestionTemplate />, // 5-4 Question template
            handle: {
              breadcrumbName: '설문 템플릿 관리',
              label: '설문 템플릿 관리',
              key: '54',
            },
          },
        ],
      },
      {
        path: 'checkResult',
        handle: {
          breadcrumbName: '결과 조회',
          label: '결과 조회', // 5. Results Report
          icon: <FileChartLine />,
          key: '6',
        },
        children: [
          {
            path: 'response',
            element: <Response />, // 6-1 Response status
            handle: {
              breadcrumbName: '응답현황',
              label: '응답현황',
              key: '61',
            },
          },
          {
            path: 'report',
            element: <Report />, // 6-2 Report
            handle: {
              breadcrumbName: 'Report',
              label: 'Report',
              key: '62',
            },
          },
          {
            path: 'answerResult',
            element: <AnswerResult />, // 6-3 short answer result
            handle: {
              breadcrumbName: '주관식 결과',
              label: '주관식 결과',
              key: '63',
            },
          },
          {
            path: 'choiceResult',
            element: <ChoiceResult />, // 6-4 Choice Result
            handle: {
              breadcrumbName: '객관식(선택문항) 결과',
              label: '객관식(선택문항) 결과',
              key: '64',
            },
          },
          {
            path: 'analysisResult',
            element: <AnalysisResult />, // 6-5 Analysis result
            handle: {
              breadcrumbName: '결과분석',
              label: '결과분석',
              key: '65',
            },
          },
          {
            path: 'pastOrganization',
            element: <PastOrganization />, // 6-6 Past Organization
            handle: {
              breadcrumbName: '과거조직 관리',
              label: '과거조직 관리',
              key: '66',
            },
          },
          {
            path: 'orgNotReports',
            element: <OrgNotReports />, // 6-7 Organization not reports
            handle: {
              breadcrumbName: 'Report 미발행 조직',
              label: 'Report 미발행 조직',
              key: '67',
            },
          },
          {
            path: 'comparisonTable',
            element: <ComparisonTable />, // 6-8 Comparison table
            handle: {
              breadcrumbName: '연도별 비교표',
              label: '연도별 비교표',
              key: '68',
            },
          },
        ],
      },
      {
        path: 'results',
        handle: {
          breadcrumbName: '결과 관리',
          label: '결과 관리', // 7. Results Manage
          icon: <ClipboardList />,
          key: '7',
        },
        children: [
          {
            path: 'manageResults',
            element: <ManageResults />, // 7-1 Results Manage
            handle: {
              breadcrumbName: '결과작업 관리',
              label: '결과작업 관리',
              key: '71',
            },
          },
          {
            path: 'mailTemplate',
            element: <ManageTemplate />, // 7-2 Results Templates Manage
            handle: {
              breadcrumbName: '결과 템플릿 관리',
              label: '결과 템플릿 관리',
              key: '72',
            },
          },
          {
            path: 'mailContentTemplate',
            element: <ManageContent />, // 7-3 Results Templates content Manage
            handle: {
              breadcrumbName: '결과 템플릿 내용관리',
              label: '결과 템플릿 내용관리',
              key: '73',
            },
          },
          {
            path: 'questionTemplate',
            element: <ManageQuestion />, // 7-4 Question template
            handle: {
              breadcrumbName: '결과 문항 관리',
              label: '결과 문항 관리',
              key: '74',
            },
          },
        ],
      },
      {
        path: 'rawdata',
        element: <Rawdata />,
        handle: {
          breadcrumbName: 'Rawdata 관리',
          label: 'Rawdata 관리', // 8. Rawdata
          icon: <Database />,
          key: '8',
        },
      },
      {
        path: 'system',
        handle: {
          breadcrumbName: '시스템 관리',
          label: '시스템 관리', // 9. System Manage
          icon: <Network />,
          key: '9',
        },
        children: [
          {
            path: 'codeGroup',
            element: <CodeGroup />, // 9-1 Managing Code Groups
            handle: {
              breadcrumbName: '코드그룹 관리',
              label: '코드그룹 관리',
              key: '91',
            },
          },
          {
            path: 'codeManage',
            element: <CodeManage />, // 9-2 Code Management
            handle: {
              breadcrumbName: '코드 관리',
              label: '코드 관리',
              key: '92',
            },
          },
          {
            path: 'factorManage',
            element: <FactorManage />, // 9-3 Factor Management
            handle: {
              breadcrumbName: '팩터 관리',
              label: '팩터 관리',
              key: '93',
            },
          },
        ],
      },
    ],
  },
]);
