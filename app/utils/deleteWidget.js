import * as IPC from 'constants/ipc';

function deleteWidget(id) {
  window.ipcRenderer.send(IPC.WIDGET_MANAGE, {
    operation: 'DELETE',
    widget: {
      id,
    },
  });
  window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
}

export default deleteWidget;
