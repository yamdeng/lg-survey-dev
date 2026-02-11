// SpinnerProvider.tsx
import { Spin } from 'antd';
import React, { createContext, Suspense, useMemo } from 'react';
import { useSpinnerStore } from '@/stores/common/useSpinnerStore'; // Zustand 스토어

// 1. Context 정의 (기존과 동일)
export const SpinnerContext = createContext<any>(undefined);

export const SpinnerProvider: React.FC<{ children: any }> = ({ children }) => {
  // 2. 상태 관리는 Zustand에 맡깁니다.
  const isLoading = useSpinnerStore((state) => state.isLoading);
  const setIsLoading = useSpinnerStore((state) => state.setIsLoading);

  // 3. Context를 통해 노출할 액션을 정의합니다. (기존 인터페이스 유지)
  // useMemo를 사용하면 불필요한 리렌더링을 방지할 수 있습니다.
  const contextValue = useMemo(
    () => ({
      showSpinner: () => setIsLoading(true),
      hideSpinner: () => setIsLoading(false),
    }),
    [setIsLoading],
  );

  return (
    <Suspense>
      <SpinnerContext.Provider value={contextValue}>
        {/* Zustand 상태(isLoading)에 따라 스피너 렌더링 */}
        {isLoading && <Spin size="large" fullscreen />}
        {children}
      </SpinnerContext.Provider>
    </Suspense>
  );
};
