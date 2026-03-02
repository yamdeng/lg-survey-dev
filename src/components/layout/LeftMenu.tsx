import AppButton from '@/components/common/AppButton';
import { TextAlignJustify } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { useStore } from 'zustand';
import { Link } from 'react-router-dom';
import MenuList from '@/components/layout/MenuList';

const LeftMenu = () => {
  const displayLeftMenu = useStore(useUIStore, (state) => state.displayLeftMenu);
  const toggleLeftMenu = useStore(useUIStore, (state) => state.toggleLeftMenu);
  return (
    <aside className={displayLeftMenu ? 'collapsed' : ''} style={{ width: 250 }}>
      <div className="side-fixed">
        <div className="side-top">
          <AppButton
            icon={<TextAlignJustify size={16} />}
            onClick={toggleLeftMenu}
            theme="secondary"
          />
          {/* 로고 */}
          <div className="survey-logo">
            <Link to="/">
              <h1 className="app-title">
                <span className="blind">LG</span>
              </h1>
            </Link>
          </div>
        </div>
        <MenuList />
      </div>
    </aside>
  );
};

export default LeftMenu;
