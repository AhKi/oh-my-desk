import React from 'react';

export default {
  en: {
    cancel: 'Cancel',
    deleteCheck: 'This widget will be deleted. Would you like to go on?',
    deleteWidget: 'Delete this widget',
    editWidget: 'Edit widget',
    everySecond: 'Refresh every',
    never: 'Never',
    newWindow: 'New',
    openBrowser: 'Open with browser',
    ok: 'Ok',
    reloadEvery: component => <p>Reload Every {component}</p>,
  },
  ko: {
    cancel: '취소',
    deleteCheck: '이 위젯이 삭제됩니다. 계속하시겠습니까?',
    deleteWidget: '이 위젯 삭제하기',
    editWidget: '설정 변경하기',
    everySecond: '특정 시간마다 새로고침',
    never: '하지 않음',
    newWindow: '새로 만들기',
    openBrowser: '브라우저로 열기',
    ok: '확인',
    reloadEvery: component => <p>{component}마다 새로고침</p>,
  },
};
