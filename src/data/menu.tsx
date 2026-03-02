import { guideMenuList } from '@/data/guide-menu';
import { Database } from 'lucide-react';

export const menuList = [
  ...guideMenuList,
  {
    menuTitle: '게시판',
    icon: <Database />,
    children: [
      {
        menuTitle: '공지사항',
        menuPath: '/notices',
      },
    ],
  },
  {
    menuTitle: '문항관리',
    icon: <Database />,
    children: [
      {
        menuTitle: '공통 문항관리',
        menuPath: '/questions/common',
      },
      {
        menuTitle: '일반 문항관리',
        menuPath: '/questions/normal',
      },
    ],
  },
  {
    menuTitle: '시스템관리',
    icon: <Database />,
    children: [
      {
        menuTitle: '코드관리',
        menuPath: '/system/codes',
      },
      {
        menuTitle: '사용자관리',
        menuPath: '/system/users',
      },
    ],
  },
];

export const getMenuListByProfileInfo = (profile) => {
  if (profile) {
    return menuList;
  }
  return menuList;
};
