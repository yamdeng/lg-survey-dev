import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

const HeaderMenu = () => {
  return (
    <Flex wrap>
      <Button type="link">
        <UserOutlined />
        My Page
      </Button>
      <Button type="link">
        <LockOutlined />
        Log Out
      </Button>
    </Flex>
  );
};

export default HeaderMenu;
