import { useUIStore } from '@/stores/useUIStore';
import Config from '@/config/Config';
import dayjs from 'dayjs';

const Logger = {
  debug: function (message) {
    console.debug(message);
  },
  info: function (message) {
    console.info(message);
  },
  warn: function (message) {
    console.warn(message);
  },
  error: async (message, consoleByPass = false) => {
    if (message) {
      if (!consoleByPass) {
        console.error(message);
      }
      try {
        let applyMessage = message.toString();
        if (message instanceof Error) {
          if (message.message) {
            applyMessage = message.message;
          }
        }
        const { beforePath, currentPath } = useUIStore.getState();
        const errorDoc: any = {};
        errorDoc.version = Config.appVersion;
        errorDoc.created = dayjs().format('YYYY-MM-DD HH:mm:ss');
        errorDoc.currentRouteUrl = currentPath || '';
        errorDoc.beforeRouteUrl = beforePath || '';
        errorDoc.userAgent = navigator.userAgent || '';
        errorDoc.message = applyMessage.substr(0, 2500);
      } catch (e) {
        console.error(`Logger error : ${e}`);
      }
    }
  },
  log: function (message) {
    console.log(message);
  },
};

export default Logger;
