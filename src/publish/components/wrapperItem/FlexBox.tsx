import React from 'react';

// 정렬 속성들에 대한 타입 정의
interface FlexBoxProps {
  children?: React.ReactNode;
  // CSSProperties에서 정확한 타입을 가져와 할당 오류를 방지합니다.
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  gap?: number | string;
  className?: string;
  // 추가로 필요한 스타일이 있을 경우를 대비해 style 객체도 합칠 수 있게 합니다.
  style?: React.CSSProperties;
}

const FlexBox = ({
  children,
  justify = 'space-between',
  align = 'center',
  gap = 0,
  className = '',
  style = {}, // 외부에서 넘겨주는 추가 스타일
}: FlexBoxProps) => {
  return (
    <div
      className={`flex-wrapper ${className}`}
      style={{
        display: 'flex',
        justifyContent: justify, // 여기서 'justify'가 정확한 타입을 가져야 할당됩니다.
        alignItems: align,
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        ...style, // 외부 스타일과 병합
      }}
    >
      {children}
    </div>
  );
};

export default FlexBox;
