import React from 'react';
import AppButton from '@/publish/components/common/AppButton';
import Logo from '@/publish/components/Logo';

import { TextAlignJustify } from 'lucide-react';

interface ChildProps {
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  // toggleCollapsed?: () => void;
  toggleCollapsed: () => void;
}

const SiderTop = ({ collapsed, setCollapsed, toggleCollapsed }: ChildProps) => {
  return (
    <div className="side-top">
      <AppButton
        icon={<TextAlignJustify size={16} />}
        onClick={toggleCollapsed}
        theme="secondary"
      />
      <Logo />
    </div>
  );
};

export default SiderTop;
