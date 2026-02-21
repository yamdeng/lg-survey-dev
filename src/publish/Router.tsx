import React, { useState } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { House, Laptop, Files, FileText } from 'lucide-react';

// page 컴포넌트
import RootLayout from '@/publish/pages/RootLayout';
import DashboardMain from '@/publish/pages/dashboardMain';
import Notice from '@/publish/pages/notice';
import NoticeMgmt from '@/publish/pages/notice/NoticeMgmt';

import LanguageInfo from '@/publish/pages/edition/languageInfo';
import SurveyInfo from '@/publish/pages/edition/surveyInfo';

import CommonInfo from '@/publish/pages/question/commonInfo';
import QuestionInfo from '@/publish/pages/question/questionInfo';

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
          breadcrumbName: 'Notice',
          label: 'Notice', // 1. 공지사항
          icon: <Laptop />,
          key: '1',
        },
        children: [
          {
            path: 'notice',
            element: <Notice />, // 1-1 공지사항
            handle: {
              breadcrumbName: 'Notice',
              label: 'Notice',
              key: '11',
            },
          },
          {
            path: 'modify',
            element: <NoticeMgmt />, // 1-2 공지사항 상세 테스트
            handle: {
              breadcrumbName: 'Write/Modify',
              label: 'Write/Modify',
              key: '12',
            },
          },
        ],
      },
      {
        path: 'edition',
        handle: {
          breadcrumbName: 'Edition',
          label: 'Edition', // 2. 판본 관리
          icon: <Files />,
          key: '2',
        },
        children: [
          {
            path: 'surveyInfo',
            element: <SurveyInfo />, // 2-1 설문 관리
            handle: {
              breadcrumbName: 'Survey info',
              label: 'Survey info',
              key: '21',
            },
          },
          {
            path: 'languageInfo',
            element: <LanguageInfo />, // 2-2 언어 관리
            handle: {
              breadcrumbName: 'Language info',
              label: 'Language info',
              key: '22',
            },
          },
        ],
      },
      {
        path: 'question',
        handle: {
          breadcrumbName: 'Question',
          label: 'Question', // 3. 문항 관리
          icon: <FileText />,
          key: '3',
        },
        children: [
          {
            path: 'commonInfo',
            element: <CommonInfo />, // 3-1 일반 관리
            handle: {
              breadcrumbName: 'Common info',
              label: 'Common info',
              key: '31',
            },
          },
          {
            path: 'questioninfo',
            element: <QuestionInfo />, // 3-2 문항 관리
            handle: {
              breadcrumbName: 'Question info',
              label: 'Question info',
              key: '32',
            },
          },
        ],
      },
    ],
  },
]);
