import { remote } from 'electron';
import preference from './preference';

const getMatchedText = () => { // eslint-disable-line consistent-return
  const store = JSON.parse(remote.getGlobal('getReduxState')());
  const { lang } = store.status;

  if (lang === 'English') {
    return {
      contextMenu: {
        back: 'Back',
        forward: 'Forward',
        reload: 'Reload',
        cut: 'Cut',
        copy: 'Copy',
        paste: 'Paste',
        selectAll: 'Select All',
        copyUrl: 'Copy Current URL',
        openBrowser: 'Open Browser',
      },
      preference: preference.en,
    };
  }

  if (lang === 'Korean') {
    return {
      contextMenu: {
        back: '뒤로',
        forward: '앞으로',
        reload: '새로고침',
        cut: '잘라내기',
        copy: '복사',
        paste: '붙여넣기',
        selectAll: '모두선택',
        copyUrl: '현재 주소 복사',
        openBrowser: '현재 주소로 브라우저 열기',
      },
      preference: preference.ko,
    };
  }
};

export default getMatchedText;
