import type { NavigateFunction } from 'react-router-dom';
import { Router } from '@/routes/MainRouter.tsx';

let navigator: NavigateFunction | null = null;

export function setNavigator(navigate: NavigateFunction) {
  navigator = navigate;
}

export function navigate(path: string, options?: any) {
  if (!navigator) return;
  navigator(path, options);
}

export const globalNavigate = (path: string, options?: any) => {
  // 컴포넌트 외부에서도 바로 사용 가능
  Router.navigate(path, options);
};
