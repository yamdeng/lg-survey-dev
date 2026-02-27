import CommonInputError from '@/components/common/CommonInputError';
import classNames from 'classnames';
import ImageResize from 'quill-image-resize-module-react';
import { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';

// Quill에 이미지 리사이즈 모듈 등록
Quill.register('modules/imageResize', ImageResize);

function AppTextEditor(props) {
  const {
    isViewMode = false,
    height = 400,
    value,
    errorMessage,
    onChange,
    placeholder = '내용을 입력해주세요...',
  } = props;

  // React 18 최적화: useMemo를 사용하여 모듈 재선언 방지
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'], // Toolbar가 정렬 아이콘을 담당
      },
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'float',
    'width',
    'style', // 정렬과 리사이즈 유지를 위해 추가
  ];

  const applyClassName = classNames('app-editor-wrapper', {
    'view-mode': isViewMode,
  });

  return (
    <>
      <div className={applyClassName} style={{ minHeight: isViewMode ? 'auto' : height }}>
        <ReactQuill
          style={{ height: isViewMode ? 'auto' : '100%' }}
          theme={isViewMode ? 'bubble' : 'snow'}
          modules={isViewMode ? { toolbar: false } : modules}
          formats={formats}
          value={value}
          readOnly={isViewMode}
          onChange={onChange}
          placeholder={isViewMode ? '' : placeholder}
        />
        <style>{`
          /* 1. 기본 에디터 높이 설정 */
          .app-editor-wrapper:not(.view-mode) .ql-container {
            height: ${height - 44}px;
          }

          /* 2. 뷰 모드 시 스크롤 및 테두리 제거 */
          .app-editor-wrapper.view-mode .ql-container {
            height: auto;
            border: none;
          }
          .app-editor-wrapper.view-mode .ql-editor {
            height: auto;
            overflow-y: visible;
            padding: 0;
          }

          /* 3. 이미지 리사이즈 툴바 아이콘 보정 (사라진 아이콘 강제 노출) */
          .ql-image-resizer-toolbar {
            display: flex !important;
            justify-content: center;
            align-items: center;
            gap: 5px;
            background: white !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            padding: 4px !important;
          }
          
          .ql-image-resizer-toolbar span {
            display: flex !important;
            align-items: center;
            justify-content: center;
            border: 1px solid #eee !important;
            border-radius: 4px;
            width: 28px !important;
            height: 28px !important;
            cursor: pointer;
          }

          .ql-image-resizer-toolbar svg {
            width: 18px !important;
            height: 18px !important;
            fill: #444;
          }

          /* 리사이즈 핸들이 영역 밖으로 나가지 않게 조절 */
          .ql-editor img {
            max-width: 100%;
            display: inline-block;
          }
        `}</style>
      </div>
      <CommonInputError errorMessage={errorMessage} />
    </>
  );
}

export default AppTextEditor;
