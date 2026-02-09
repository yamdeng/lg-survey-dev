import _ from 'lodash';

// 개행 분자를 <br/> 태그로 변환
const convertEnterStringToBrTag = function (value) {
  if (value) {
    return value.replace(/\\r\\n|\r\n|\n|\\n/g, '<br/>');
  }
  return '';
};

// 검색키워드로 하이라이트 반영
const replaceHighlightMarkup = function (text, highlightText, className = '') {
  let resultMarkup = text;
  if (text && highlightText) {
    highlightText = _.escapeRegExp(highlightText);
    const highlightRegExp = new RegExp(highlightText, 'g');
    let applyClassName = 'highlight';
    if (className) {
      applyClassName = `$${className} highlight`;
    }
    resultMarkup = text.replace(
      highlightRegExp,
      `<span style="display:inline" class="${applyClassName}">${highlightText}</span>`,
    );
  }
  return resultMarkup;
};

export default {
  convertEnterStringToBrTag,
  replaceHighlightMarkup,
};
