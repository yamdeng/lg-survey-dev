import { createBrowserRouter } from 'react-router-dom';
import { House } from 'lucide-react';

import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import MainLayout from '@/components/layout/MainLayout';

/* 페이지 모음 */
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';

import NoticeList from '@/pages/notices/NoticeList';
import NoticeForm from '@/pages/notices/NoticeForm';
import NoticeDetail from '@/pages/notices/NoticeDetail';
import CommonQuestionList from '@/pages/questions/CommonQuestionList';
import NormalQuestionList from '@/pages/questions/NormalQuestionList';

import CodeList from '@/pages/codes/CodeList';

// import UserList from '@/pages/users/UserList';
// import UserForm from '@/pages/users/UserForm';
// import UserDetail from '@/pages/users/UserDetail';

/* 에러*/
import NotFound from '@/pages/errors/NotFound';
import NotAccessError from '@/pages/errors/NotAccessError';

/* 가이드 라우터 : TODO AFTER : 최종 빌드시에 삭제시키면 됩니다. */
import { GuideRouter } from './GuideRouter';

export const Router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    handle: { breadcrumbName: 'Home', icon: <House />, isLink: true },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'not-access',
        element: <NotAccessError />,
      },
      {
        path: 'system',
        handle: { breadcrumbName: '시스템관리' },
        children: [
          {
            path: 'codes',
            handle: { breadcrumbName: '코드관리', isLink: true },
            children: [
              {
                index: true,
                element: <CodeList />,
                handle: { isLink: true },
              },
            ],
          },
        ],
      },
      {
        path: 'notices',
        handle: { breadcrumbName: '공지사항', isLink: true },
        children: [
          {
            index: true,
            element: <NoticeList />,
            handle: { isLink: true },
          },
          {
            path: 'add',
            element: <NoticeForm formMode={FORM_TYPE_ADD} />, // /notices/add (등록)
            handle: { breadcrumbName: '등록' },
          },
          {
            path: ':detailId',
            // 상세보기와 수정하기를 한 그룹으로 묶고 싶을 때 중첩 가능
            children: [
              {
                index: true,
                element: <NoticeDetail />, // /notices/1 (상세)
                handle: { breadcrumbName: '상세' },
              },
              {
                path: 'edit',
                element: <NoticeForm formMode={FORM_TYPE_UPDATE} />, // /notices/1/edit (수정)
                handle: { breadcrumbName: '수정' },
              },
            ],
          },
        ],
      },
      {
        path: 'questions',
        handle: { breadcrumbName: '문항관리', key: 'QUESTION_MANAGE' },
        children: [
          {
            path: 'common',
            element: <CommonQuestionList />,
          },
          {
            path: 'normal',
            element: <NormalQuestionList />,
          },
        ],
      },
      ...GuideRouter,
    ],
  },
]);

export const globalNavigate = (path: string, options?: any) => {
  // 컴포넌트 외부에서도 바로 사용 가능
  Router.navigate(path, options);
};
