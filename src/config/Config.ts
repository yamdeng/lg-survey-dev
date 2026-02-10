const baseFilePath = '/src/components/guide/';
const profileFolderPath = __PROJECT_FOLDER_PATH;
const hrefBasePath = `vscode://file/${profileFolderPath}${baseFilePath}`;

const Config = {
  appVersion: '0.1',
  reactFileExtension: '.tsx',
  hrefBasePath: hrefBasePath,
  defaultTablePagination: true,
  defaultGridHeight: 460,
  defaultGridNoDataMessage: '데이터가 존재하지 않습니다.',
  defaultGridPageSize: 10,
  defaultPageSizeList: [10, 20, 50, 100],
  defaultGridTotalCountTemplate: '{0}',
  refreshTokenKey: 'Refresh-Token',
  refreshTokenExpiredKey: 'Refresh-Token-Expired-At',
};

export default Config;
