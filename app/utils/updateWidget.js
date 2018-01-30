import * as IPC from 'constants/ipc';

function updateWidget(type, info) {
  window.ipcRenderer.send(IPC.WIDGET_MANAGE, {
    operation: 'UPDATE',
    widget: {
      id: info.id,
      type,
      name: info.name,
      url: info.url,
      position: info.position && {
        x: info.position.x,
        y: info.position.y,
      },
      size: info.size && {
        width: info.size.width,
        height: info.size.height,
      },
      transparency: info.transparency,
      isActive: info.isActive,
      isIcon: info.isIcon,
      isOnTop: info.isOnTop,
      favicon: info.favicon,
    },
  });
  window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
}

export default updateWidget;
