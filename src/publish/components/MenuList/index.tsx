import { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import {
  CarryOutOutlined,
  CopyOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  MailOutlined,
  PartitionOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';

// 메뉴 리스트 - 퍼블 화면 확인용 임시
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <DesktopOutlined />,
    label: <Link to="/notice">Notice</Link>,
  },
  {
    key: '2',
    icon: <CopyOutlined />,
    label: 'Edition',
    children: [
      { key: '21', label: <Link to="/edition/surveyInfo">Survey info</Link> },
      { key: '22', label: <Link to="/edition/langugeInfo">Languge info</Link> },
    ],
  },
  {
    key: '3',
    icon: <UnorderedListOutlined />,
    label: 'Question',
    children: [
      { key: '31', label: <Link to="/question/commonInfo">Common info</Link> },
      { key: '32', label: <Link to="/question/questionInfo">Question info</Link> },
    ],
  },
  {
    key: '4',
    icon: <UsergroupAddOutlined />,
    label: 'Target',
    children: [
      { key: '41', label: <Link to="/targetInfo">Target info</Link> },
      { key: '42', label: <Link to="/organizInfo">Organiz info</Link> },
      { key: '43', label: <Link to="/organizerInfo">Organizer info</Link> },
    ],
  },
  {
    key: '5',
    icon: <MailOutlined />,
    label: 'Send Mail',
    children: [
      { key: '51', label: <Link to="/transferInfo">Transfer info</Link> },
      { key: '52', label: <Link to="/mailTemplate">Mail template</Link> },
      { key: '53', label: <Link to="/mailContentTemplate">Mail template content</Link> },
      { key: '54', label: <Link to="/questionTemplate">Question template</Link> },
    ],
  },
  {
    key: '6',
    icon: <FileDoneOutlined />,
    label: 'Results Report',
    children: [
      { key: '61', label: <Link to="/response">Response status</Link> },
      { key: '62', label: <Link to="/report">Report</Link> },
      { key: '63', label: <Link to="/answerResult">Answer result</Link> },
      { key: '64', label: <Link to="/choiceResult">Choice result</Link> },
      { key: '65', label: <Link to="/analysisResult">Analysis result</Link> },
      { key: '66', label: <Link to="/pastOrganization">Past organization</Link> },
      { key: '67', label: <Link to="/orgNotReports">Organization not reports</Link> },
      { key: '68', label: <Link to="/comparisonTable">Comparison table</Link> },
    ],
  },
  {
    key: '7',
    icon: <CarryOutOutlined />,
    label: 'Reaults',
    children: [
      { key: '71', label: <Link to="/manageResults">Manage Results</Link> },
      { key: '72', label: <Link to="/resultsTemplates">Result Templates</Link> },
      { key: '73', label: <Link to="/resultsTemplatesContent">Result Template Contents</Link> },
      { key: '74', label: <Link to="/resultsQuestions">Results questions</Link> },
    ],
  },
  {
    key: '8',
    icon: <PartitionOutlined />,
    label: <Link to="/rawdata">Rawdata</Link>,
  },
  {
    key: '9',
    icon: <DeploymentUnitOutlined />,
    label: 'System Manage',
    children: [
      { key: '91', label: <Link to="/codeGroup">Code Group</Link> },
      { key: '92', label: <Link to="/CodeManage">Code manage</Link> },
      { key: '93', label: <Link to="/factorManage">Factor manage</Link> },
    ],
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

function MenuList() {
  const [stateOpenKeys, setStateOpenKeys] = useState(['1', '11']);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        // style={{ width: 256 }}
        items={items}
      />
    </>
  );
}

export default MenuList;
