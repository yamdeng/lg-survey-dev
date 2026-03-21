import _ from 'lodash';

export const testColumnKeyList = [
  'id',
  'sabun',
  'position',
  'name',
  'nameEn',
  'deptName',
  'sex',
  'createdDate',
  'updatedDate',
  'email',
  'age',
  'jobArea',
  'phone',
  'address1',
  'address2',
  'startDate',
  'endDate',
  'addressInfo',
  'airlineInfo',
  'userList',
];

export const testSimpleColumnKeyList = ['id', 'sabun', 'position', 'name', 'nameEn', 'deptName'];

export const userSimpleColumnKeyList = [
  'id',
  'name',
  'nameEn',
  'createDate',
  'updateDate',
  'positionTitle',
  'positionTitleEn',
];

export const userColumnKeyList = [
  'id',
  'createUserId',
  'updateUserId',
  'createDate',
  'updateDate',
  'isDelete',
  'name',
  'nameEn',
  'sabun',
  'deptId',
  'positionTitle',
  'positionTitleEn',
  'phoneNumber',
  'companyTel',
  'email',
  'address',
  'addressDetail',
  'zipCode',
  'joinDate',
  'status',
];

export const testColumnInfos: any = testColumnKeyList.map((keyName) => {
  return {
    field: keyName,
    headerName: _.capitalize(keyName),
  } as any;
});

export const testSimpleColumnInfos: any[] = testSimpleColumnKeyList.map((keyName) => {
  return {
    field: keyName,
    headerName: _.capitalize(keyName),
  };
});

export const usersSimpleColumnInfos: any = userSimpleColumnKeyList.map((keyName) => {
  return {
    field: keyName,
    headerName: _.capitalize(keyName),
  };
});

export const userColumnInfos: any = userColumnKeyList.map((keyName) => {
  return {
    field: keyName,
    headerName: _.capitalize(keyName),
  };
});

export const noticeBaseColumns = [
  {
    field: 'boardKey',
    headerName: '게시판 키',
    width: 100,
  },
  {
    field: 'boardType',
    headerName: '게시판 유형',
    width: 120,
  },
  {
    field: 'boardTitle',
    headerName: '게시판 제목',
    minWidth: 200,
    flex: 1, // 남은 공간을 모두 차지하도록 설정
    cellStyle: { fontWeight: 'bold' },
  },
  {
    field: 'boardContent',
    headerName: '내용',
    hide: true, // 목록에서는 숨김 처리 (상세 페이지용 데이터)
  },
  {
    field: 'useYn',
    headerName: '사용 여부',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'mainYn',
    headerName: '메인 노출',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'boardAuthType',
    headerName: '권한 유형',
    width: 120,
  },
  {
    field: 'securityLevel',
    headerName: '보안 레벨',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
];
