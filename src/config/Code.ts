import _ from 'lodash';

const Code: any = {};

/*
    사용여부
*/
Code.useYn = [
  {
    label: '예',
    value: 'Y',
  },
  {
    label: '아니오',
    value: 'N',
  },
];

// 코드명 가져오기 : value 기준
Code.getCodeLabelByValue = function (codeCategory, codeValue) {
  let codeLabel = null;
  const codeList = Code[codeCategory] || [];
  const searchIndex = _.findIndex(codeList, (codeInfo) => {
    if (codeValue === codeInfo.value) {
      return true;
    } else {
      return false;
    }
  });
  if (searchIndex !== -1) {
    const findCodeInfo = codeList[searchIndex];
    codeLabel = findCodeInfo.label;
  }
  return codeLabel;
};

export default Code;
