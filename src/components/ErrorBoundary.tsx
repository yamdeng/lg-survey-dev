import { ERROR_TYPE_REACT } from '@/config/CommonConstant';
import AppButton from '@/components/common/AppButton';
import { useUIStore } from '@/stores/useUIStore';
import React from 'react';
import Logger from '@/utils/Logger';

/*

    이름 : render 에러 handle 컴포넌트
    
    store
      -appStore
      
*/
class ErrorBoundary extends React.Component<any, any> {
  state = {
    hasError: false,
  };

  constructor(props) {
    super(props);

    // 페이지 재시작
    this.refreshPage = this.refreshPage.bind(this);

    // home 페이지로 이동
    this.goHome = this.goHome.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const errorObject: any = {};
    errorObject.errorType = ERROR_TYPE_REACT;
    if (error.message) {
      errorObject.message = error.message;
    }
    if (error.stack) {
      errorObject.stack = error.stack;
    }
    if (info && info.componentStack) {
      errorObject.componentStack = info.componentStack;
      error.componentStack = info.componentStack;
    }
    this.setState({
      errorObject: errorObject,
    });
    Logger.info(error);
  }

  refreshPage() {
    useUIStore.getState().reloadApp();
  }

  goHome() {
    // home 화면으로 이동
    const reloadUri = '/';
    location.href = reloadUri;
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <main className="content-main">
            <div className="content-inner">
              <div className="content-body">
                <div className="error-box">
                  <p>오류가 발생하였습니다.</p>
                  <p>다시 시도해 주세요.</p>
                  <div className="btn-group">
                    <AppButton onClick={this.goHome} value="Home" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
