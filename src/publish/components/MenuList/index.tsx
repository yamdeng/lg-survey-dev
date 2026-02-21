import { useState, useMemo } from 'react';
import { Menu, type MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Router } from '@/publish/Router';

// 메뉴 리스트 - 퍼블 화면 확인용
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
  collapsed?: boolean;
}

// 1. 메뉴 계층 구조(Level)를 파악하는 함수
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

  // 2. 메뉴 생성 함수 (useMemo로 메모이제이션)
  const items = useMemo(() => {
    // 1. Router.routes[0]은 RootLayout입니다.
    // 2. 그 자식들(Notice, Edition, Question)부터 메뉴 리스트로 만듭니다.
    const rootChildren = Router.routes[0]?.children || [];
    // return getMenuItems(rootChildren, '/');
    return getMenuItems(rootChildren || [], '/');
  }, []);

  // 3. LevelKeys 계산 (items 생성 이후에 수행)
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

  // 3. 메뉴 생성 함수 (이 함수는 MenuList 컴포넌트 내부나 외부에 하나만 있으면 됩니다)
  function getMenuItems(routes: any[], parentPath = '') {
    return routes
      .filter((route) => route.handle?.label) // Router 설정에 'label' 속성이 있어야만 보입니다.
      .map((route) => {
        const { handle, path, index, element, children } = route;
        const currentPath = index ? '' : path || '';

        const fullPath = `${parentPath}/${currentPath}`.replace(/\/+/g, '/');
        const finalPath = fullPath.includes('undefined') ? parentPath : fullPath;

        // 2. element가 있는지 확인 (이동 가능 여부)
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

        // 자식 노드가 있고, 그 중 label이 있는 자식이 있을 경우에만 children 추가
        if (route.children && route.children.some((c: any) => c.handle?.label)) {
          item.children = route.children ? getMenuItems(route.children, finalPath) : undefined;
        }

        return item;
      });
  }

  return (
    <Menu
      mode="inline"
      // 현재 URL 경로를 기반으로 자동 선택되도록 설정
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
