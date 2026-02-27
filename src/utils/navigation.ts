import type { NavigateFunction } from 'react-router-dom';

let navigator: NavigateFunction | null = null;

export function setNavigator(navigate: NavigateFunction) {
  navigator = navigate;
}

export function navigate(path: string, options?: any) {
  if (!navigator) return;
  navigator(path, options);
}
