import moment from 'moment';

function createWidget(id, info) {
  return {
    id,
    name: info.name,
    url: info.url,
    position: {
      x: (info.position && info.position.x) || 600,
      y: (info.position && info.position.y) || 100,
    },
    size: {
      width: (info.size && info.size.width) || 300,
      height: (info.size && info.size.height) || 400,
    },
    isOnTop: info.isOnTop || false,
    isOpen: true,
    favorites: false,
    createTime: moment().toISOString(),
    resentOpenTime: moment().toISOString(),
  };
}

export default createWidget;
