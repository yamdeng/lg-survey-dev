import ApiUtil from '@/utils/ApiUtil';

/*

  ajax 서버 api 요청 공통 인터페이스

*/

// api prefix uri : /api/v1
const VITE_API_PREFIX = import.meta.env.VITE_API_PREFIX;

// backend api url
const VITE_API_URL = import.meta.env.VITE_API_URL;

const prefixUrl = `${VITE_API_URL}${VITE_API_PREFIX}/`;

class ApiService {
  // http get method 요청
  async get(apiPath, params?: any, config?: any) {
    config = config || {};
    config.params = params;
    // await ApiUtil.get(`${prefixUrl}common/health`, { byPassError: true } as any);
    return ApiUtil.get(prefixUrl + apiPath, config);
  }

  // http post method 요청
  async post(apiPath, body?: any, config?: any) {
    body = body || {};
    return ApiUtil.post(prefixUrl + apiPath, body, config);
  }

  // http put method 요청
  async put(apiPath, body?: any, config?: any) {
    body = body || {};
    return ApiUtil.put(prefixUrl + apiPath, body, config);
  }

  // http patch method 요청
  async patch(apiPath, body?: any, config?: any) {
    body = body || {};
    return ApiUtil.patch(prefixUrl + apiPath, body, config);
  }

  // http delete method 요청
  async delete(apiPath, config?: any) {
    return ApiUtil.delete(prefixUrl + apiPath, config);
  }

  // file upload
  async fileUpload(formData: any, params: any, onUploadProgress = null) {
    return ApiUtil.post(prefixUrl + `common-file/upload`, formData, {
      params: params,
      headers: { 'Content-Type': 'multipart/form-data' },
      disableLoadingBar: onUploadProgress ? true : false,
      onUploadProgress: onUploadProgress,
    } as any);
  }

  // file upload : uri을 받아서 처리
  async fileUploadByUrl(uploadUri: string, formData: any, params: any, onUploadProgress = null) {
    return ApiUtil.post(prefixUrl + uploadUri, formData, {
      params: params,
      headers: { 'Content-Type': 'multipart/form-data' },
      disableLoadingBar: onUploadProgress ? true : false,
      onUploadProgress: onUploadProgress,
      byPassError: true,
    } as any);
  }
}

export default new ApiService();
