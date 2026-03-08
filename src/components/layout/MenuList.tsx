import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 1. useLocation 추가
import { getMenuListByProfileInfo } from '@/data/menu';
import { useAppStore } from '@/stores/useAppStore';
import { useUIStore } from '@/stores/useUIStore';
import { globalNavigate } from '@/utils/navigation';
import { Menu } from 'antd';
import { useStore } from 'zustand';

const convertMenuList = (menuList) => {
  return menuList.map((menuInfo) => {
    const { menuTitle, children, icon, menuPath } = menuInfo;
    const itemKey = menuPath || menuTitle;

    const menuItem: any = {
      key: itemKey,
      label: menuTitle,
      icon: icon,
      data: menuInfo,
    };

    if (children && children.length > 0) {
      menuItem.children = convertMenuList(children);
    }
    return menuItem;
  });
};

const MenuList = () => {
  // 2. 핵심: useLocation()을 사용해야 URL 변경 시 리렌더링이 발생합니다.
  const location = useLocation();

  const profile = useStore(useAppStore, (state) => state.profile);
  const displayLeftMenu = useStore(useUIStore, (state) => state.displayLeftMenu);
  const selectedMenuKeys = useStore(useUIStore, (state) => state.selectedMenuKeys);
  const changeSelectedMenuKeys = useStore(useUIStore, (state) => state.changeSelectedMenuKeys);

  const menuList = getMenuListByProfileInfo(profile);
  const applyMenuList = useMemo(() => convertMenuList(menuList), [menuList]);

  const rootSubmenuKeys = useMemo(() => {
    return applyMenuList.map((menu) => menu.key);
  }, [applyMenuList]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => selectedMenuKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      changeSelectedMenuKeys([latestOpenKey]);
    } else {
      changeSelectedMenuKeys(keys);
    }
  };

  const handleMenuClick = (info: any) => {
    // Antd v5에서는 props 바로 아래 data가 위치함
    const { data } = info.item.props;
    if (data?.menuPath) {
      globalNavigate(data.menuPath);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname; // location 객체 사용

    const parentKeys: string[] = [];
    const findParentKeys = (items: any[], targetPath: string, parents: string[]): boolean => {
      for (const item of items) {
        if (item.key === targetPath) {
          parentKeys.push(...parents);
          return true;
        }
        if (item.children && findParentKeys(item.children, targetPath, [...parents, item.key])) {
          return true;
        }
      }
      return false;
    };

    findParentKeys(applyMenuList, currentPath, []);

    if (parentKeys.length > 0) {
      const nextKeys = Array.from(new Set([...selectedMenuKeys, ...parentKeys]));
      changeSelectedMenuKeys(nextKeys);
    }
  }, [location.pathname, applyMenuList]); // 경로가 바뀔 때마다 부모 찾기 실행

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      openKeys={selectedMenuKeys}
      onOpenChange={onOpenChange}
      onClick={handleMenuClick}
      inlineCollapsed={displayLeftMenu}
      items={applyMenuList}
    />
  );
};

export default MenuList;
