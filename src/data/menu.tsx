import { guideMenuList } from '@/data/guide-menu';
import { Database } from 'lucide-react';

export const menuList = [
  {
    menuTitle: '공지사항',
    menuPath: '/notices',
    icon: <Database />,
  },
  {
    menuTitle: '게시판',
    icon: <Database />,
    children: [
      {
        menuTitle: '공지사항2',
        menuPath: '/notices',
      },
      {
        menuTitle: '일반 게시판',
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
  ...guideMenuList,
];

export const getMenuListByProfileInfo = (profile) => {
  if (profile) {
    return menuList;
  }
  return menuList;
};
