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
      </div>
      <CommonInputError errorMessage={errorMessage} />
    </>
  );
}

export default AppTextEditor;
