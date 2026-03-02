import { useMemo, useEffect } from 'react';
import { getMenuListByProfileInfo } from '@/data/menu';
import { useAppStore } from '@/stores/useAppStore';
import { useUIStore } from '@/stores/useUIStore';
import { globalNavigate } from '@/utils/navigation';
import { Menu } from 'antd';
import { useStore } from 'zustand';

const convertMenuList = (menuList) => {
  return menuList.map((menuInfo) => {
    const { menuTitle, children, icon, menuPath } = menuInfo;
    const menuItem = {
      key: menuPath ? `${menuTitle}-${menuPath}` : menuTitle,
      label: (
        <span
          onClick={() => {
            if (menuPath) {
              globalNavigate(menuPath);
            }
          }}
        >
          {menuTitle}
        </span>
      ),
      icon: icon,
      children: children,
    };

    if (children && children.length) {
      menuItem.children = convertMenuList(children);
    }

    return menuItem;
  });
};

const MenuList = () => {
  const profile = useStore(useAppStore, (state) => state.profile);
  const displayLeftMenu = useStore(useUIStore, (state) => state.displayLeftMenu);
  const selectedMenuKeys = useStore(useUIStore, (state) => state.selectedMenuKeys);
  const changeSelectedMenuKeys = useStore(useUIStore, (state) => state.changeSelectedMenuKeys);
  const menuList = getMenuListByProfileInfo(profile);
  const applyMenuList = convertMenuList(menuList);

  // 1. 최상위(1depth) 메뉴들의 키 리스트를 미리 추출합니다.
  const rootSubmenuKeys = useMemo(() => {
    return applyMenuList.map((menu) => menu.key);
  }, [menuList]);

  // 2. 핵심 아코디언 로직
  const onOpenChange = (keys: string[]) => {
    // keys: 현재 열려있는 모든 키 (사용자가 방금 누른 키 포함)
    // openKeys: 직전까지 열려있던 키 리스트

    const latestOpenKey = keys.find((key) => selectedMenuKeys.indexOf(key) === -1);

    // 최상위 메뉴를 클릭한 경우
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      // 방금 누른 최상위 키만 열고 나머지는 닫음
      changeSelectedMenuKeys([latestOpenKey]);
    } else {
      // 하위 메뉴(2, 3depth)를 클릭한 경우나 메뉴를 닫은 경우
      changeSelectedMenuKeys(keys);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;

    // 현재 이미 열려있는 키들(selectedMenuKeys) 중에
    // 현재 경로의 부모가 이미 포함되어 있다면 굳이 다시 계산하지 않음
    const isAlreadyOpen = selectedMenuKeys.some((key) => key.endsWith(currentPath));
    if (isAlreadyOpen) return;

    const parentKeys: string[] = [];
    const findParentKeys = (items: any[], targetPath: string, parents: string[]): boolean => {
      for (const item of items) {
        if (item.key.endsWith(targetPath) || item.key === targetPath) {
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
      // 기존에 열려있던 키들과 합치거나, 아코디언을 유지하려면 새로 세팅
      // 중복 제거를 위해 Set 사용 권장
      const nextKeys = Array.from(new Set([...selectedMenuKeys, ...parentKeys]));
      changeSelectedMenuKeys(nextKeys);
    }
  }, [location.pathname]);

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      openKeys={selectedMenuKeys}
      onOpenChange={onOpenChange}
      inlineCollapsed={displayLeftMenu ? true : false}
      items={applyMenuList}
    />
  );
};

export default MenuList;
