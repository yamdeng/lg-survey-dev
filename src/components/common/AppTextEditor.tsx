import CommonInputError from '@/components/common/CommonInputError';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'], // 이미지 버튼 포함
    ['clean'],
  ],
};

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
];

function AppTextEditor(props) {
  const {
    isViewMode = false,
    height = 400,
    value,
    errorMessage,
    onChange,
    placeholder = '내용을 입력해주세요...',
  } = props;

  return (
    <>
      <div className="app-editor-wrapper" style={{ height: height }}>
        <ReactQuill
          style={{ height: '100%' }}
          theme={isViewMode ? 'bubble' : 'snow'}
          modules={isViewMode ? { toolbar: false } : modules}
          formats={formats}
          value={value}
          readOnly={isViewMode ? true : false}
          onChange={onChange}
          placeholder={isViewMode ? '' : placeholder}
        />
        <style>{`
          .app-editor-wrapper .ql-container.ql-snow {
            height: ${height - 44}px;
          }
        `}</style>
      </div>
      <CommonInputError errorMessage={errorMessage} />
    </>
  );
}

export default AppTextEditor;
