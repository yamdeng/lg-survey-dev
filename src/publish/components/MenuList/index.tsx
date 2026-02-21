import { useState, useMemo } from 'react';
import { Menu, type MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Router } from '@/publish/Router';

// 메뉴 리스트 - 퍼블 수정
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
  collapsed?: boolean;
}

// 1. 메뉴 계층 구조(Level)
const getLevelKeys = (items: any[]) => {
  const keyMap: Record<string, number> = {};
  const func = (nodes: any[], level = 1) => {
    nodes.forEach((node) => {
      if (node.key) {
        keyMap[node.key] = level;
      }
      if (node.children) {
        func(node.children, level + 1);
      }
    });
  };
  func(items);
  return keyMap;
};

function MenuList({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();

  // 2. 메뉴 생성 함수
  const items = useMemo(() => {
    const rootChildren = Router.routes[0]?.children || [];
    return getMenuItems(rootChildren || [], '/');
  }, []);

  // 3. LevelKeys
  const levelKeys = useMemo(() => getLevelKeys(items), [items]);

  // 4. 아코디언 상태 관리
  const [stateOpenKeys, setStateOpenKeys] = useState(['1']); // 초기값

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  // 3. 메뉴 생성 함수
  function getMenuItems(routes: any[], parentPath = '') {
    return routes
      .filter((route) => route.handle?.label)
      .map((route) => {
        const { handle, path, index, element } = route;
        const currentPath = index ? '' : path || '';

        const fullPath = `${parentPath}/${currentPath}`.replace(/\/+/g, '/');
        const finalPath = fullPath.includes('undefined') ? parentPath : fullPath;

        const hasElement = Boolean(element);

        const item: any = {
          key: finalPath,
          icon: handle.icon,
          label: hasElement ? (
            <Link to={finalPath}>{handle.label || handle.breadcrumbName}</Link>
          ) : (
            <span>{handle.label || handle.breadcrumbName}</span>
          ),
        };

        if (route.children && route.children.some((c: any) => c.handle?.label)) {
          item.children = route.children ? getMenuItems(route.children, finalPath) : undefined;
        }

        return item;
      });
  }

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultSelectedKeys={['1']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      inlineCollapsed={collapsed}
      items={items}
    />
  );
}

export default MenuList;
