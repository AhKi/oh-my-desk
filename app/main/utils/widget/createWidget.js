import moment from 'moment';

function createWidget(id, info = {}) {
  return {
    id,
    name: info.name,
    url: info.url,
    position: {
      x: (info.position && info.position.x) || 600,
      y: (info.position && info.position.y) || 100,
    },
    size: {
      width: (info.size && info.size.width) || 500,
      height: (info.size && info.size.height) || 600,
    },
    isMakeProgress: info.isMakeProgress,
    isOnTop: info.isOnTop || false,
    isOpen: true,
    favorites: false,
    createTime: moment().toISOString(),
    resentFocusTime: moment().toISOString(),
  };
}

export default createWidget;
