import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { testColumnKeyList } from './table-column';

const defaultTableRows = 25;
const defaultTableManyRows = 150;

const getRandomValueByColumnKey = (columnKey) => {
  if (columnKey === 'id') {
    return faker.string.uuid();
  } else if (columnKey === 'sabun') {
    return faker.string.numeric({ length: { min: 5, max: 10 } }) + '';
  } else if (columnKey === 'position') {
    return faker.helpers.arrayElement(['대리', '과장', '차장']);
  } else if (columnKey === 'name') {
    return faker.person.middleName();
  } else if (columnKey === 'nameEn') {
    return faker.person.lastName();
  } else if (columnKey === 'deptName') {
    return faker.helpers.arrayElement(['대표이사', 'LG전략실', 'LG개발팀', 'LG인사팀', 'IT']);
  } else if (columnKey === 'sex') {
    return faker.person.sex();
  } else if (columnKey === 'email') {
    return faker.internet.email();
  } else if (columnKey === 'age') {
    return faker.number.int({ min: 10, max: 100 });
  } else if (columnKey === 'jobArea') {
    return faker.person.jobArea();
  } else if (columnKey === 'phone') {
    return faker.phone.number();
  } else if (columnKey === 'address1') {
    return faker.location.city();
  } else if (columnKey === 'address2') {
    return faker.location.city();
  } else if (columnKey === 'createdDate' || columnKey === 'updatedDate') {
    return new Date();
  } else if (columnKey === 'startDate') {
    return faker.date.between({
      from: '2024-01-01T00:00:00.000Z',
      to: '2024-04-01T00:00:00.000Z',
    });
  } else if (columnKey === 'endDate') {
    return faker.date.between({
      from: '2024-04-02T00:00:00.000Z',
      to: '2025-01-17T00:00:00.000Z',
    });
  } else if (columnKey === 'addressInfo') {
    return {
      name: faker.location.city(),
      zipCode: faker.location.zipCode(),
      streetAddress: faker.location.streetAddress(),
    };
  } else if (columnKey === 'airlineInfo') {
    return faker.airline.airline();
  } else if (columnKey === 'userList') {
    const userList = [];
    for (let index = 0; index < 5; index++) {
      userList.push({
        name: faker.person.middleName(),
        deptName: faker.helpers.arrayElement([
          '대표이사',
          'LG전략실',
          'LG개발팀',
          'LG인사팀',
          'IT',
        ]),
        positionTitle: faker.helpers.arrayElement(['대리', '과장', '차장']),
      });
    }
    return userList;
  }
  return '';
};

const getRowData = (): any => {
  const rowDataResult = {};
  for (let columnIndex = 0; columnIndex < testColumnKeyList.length; columnIndex++) {
    const columnKey = testColumnKeyList[columnIndex];
    rowDataResult[columnKey] = getRandomValueByColumnKey(columnKey);
  }
  return rowDataResult;
};

export const getAgGridColumnListByListIndex = (lastIndex) => {
  const sliceColumnKeyList = testColumnKeyList.slice(0, lastIndex);
  return sliceColumnKeyList.map((keyName) => {
    return {
      field: keyName,
      headerName: _.capitalize(keyName),
    };
  });
};

export const getAgGridColumnListByManulList = (manualList) => {
  return manualList.map((keyName) => {
    return {
      field: keyName,
      headerName: _.capitalize(keyName),
    };
  });
};

const simepleData = [];
for (let index = 0; index < defaultTableRows; index++) {
  const rowData = getRowData();
  rowData.index = index + 1;
  simepleData.push(rowData);
}

const allData = [];
for (let index = 0; index < defaultTableManyRows; index++) {
  const rowData = getRowData();
  rowData.index = index + 1;
  rowData.id = index + 1 + '';
  allData.push(rowData);
}

export const immerTestObject = {
  id: 1,
  isRowSelected: false,
  name: 'name1',
  address: {
    si: '김포시',
    dong: '오정동',
    detail: {
      zipCode: '111',
      detailAddress: '김포상세1',
    },
  },
  children: [
    {
      name: 'child1',
      description: 'description1',
    },
    {
      name: 'child2',
      description: 'description2',
    },
  ],
};

export const immerTestList = [
  {
    id: 1,
    isRowSelected: false,
    name: 'name1',
    address: {
      si: '김포시',
      dong: '오정동',
      detail: {
        zipCode: '111',
        detailAddress: '김포상세1',
      },
    },
  },
  {
    id: 2,
    isRowSelected: false,
    name: 'name2',
    address: {
      si: '김포시2',
      dong: '오정동2',
      detail: {
        zipCode: '222',
        detailAddress: '김포상세2',
      },
    },
  },
  {
    id: 2,
    isRowSelected: false,
    name: 'name3',
    address: {
      si: '김포시3',
      dong: '오정동3',
      detail: {
        zipCode: '333',
        detailAddress: '김포상세3',
      },
    },
  },
];

export const getSimpleData = () => {
  return simepleData;
};

export const getAllData = () => {
  return allData;
};

// data page 반영
export const getPageData = (page, pageSize) => {
  return allData.slice((page - 1) * pageSize, page * pageSize);
};

// data 추가
export const addData = (newData) => {
  newData.createdDate = new Date();
  allData.push(newData);
};

// data get
export const getDetailData = (id) => {
  const result = allData.find((info) => info.id === id);
  return result;
};

// data 삭제 : id 기준
export const deleteDataById = (id) => {
  _.remove(allData, (info) => {
    return info.id === id;
  });
};

// data 수정
export const updateDataById = (id, newData) => {
  const searchIndex = allData.findIndex((info) => info.id === id);
  newData.updatedDate = new Date();
  allData[searchIndex] = newData;
};

export const batchTestData = [
  {
    dataTestId: '1',
    name: 'test1',
    age: 10,
    desc: '',
    status: '대기',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '2',
    name: 'test2',
    age: 11,
    desc: '설명2',
    status: '진행중',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '3',
    name: 'test3',
    age: 30,
    desc: 'ㅁㅁㅁ',
    status: '대기',
    cityCode: 'ICN',
    active: false,
    userLevel: '7',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '4',
    name: 'test4',
    age: 40,
    desc: '',
    status: '대기',
    cityCode: 'ICN',
    active: false,
    userLevel: '6',
    mainDisplayYn: 'N',
    rowStatus: 'R',
  },
  {
    dataTestId: '5',
    name: 'test5',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '6',
    name: 'test6',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '7',
    name: 'test7',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '8',
    name: 'test8',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '9',
    name: 'test9',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '10',
    name: 'test10',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '11',
    name: 'test11',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '12',
    name: 'test12',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
];

export const batchTestData2 = [
  {
    dataTestId: '13',
    name: 'test13',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '14',
    name: 'test14',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '15',
    name: 'test15',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '16',
    name: 'test16',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '17',
    name: 'test17',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '18',
    name: 'test18',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '19',
    name: 'test19',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '20',
    name: 'test20',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '21',
    name: 'test21',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '22',
    name: 'test22',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '23',
    name: 'test23',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '24',
    name: 'test24',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '25',
    name: 'test25',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '26',
    name: 'test26',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '27',
    name: 'test27',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
];
