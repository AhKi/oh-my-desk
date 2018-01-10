import * as IPC from 'constants/ipc';

function updateWidget(type, info) {
	window.ipcRenderer.send(IPC.WIDGET_MANAGE, {
		operation: 'UPDATE',
		widget: {
			id: info.id,
			type,
			name: info.name,
			url: info.url,
			position: {
				x: info.position && info.position.x,
				y: info.position && info.position.y,
			},
			size: {
				width: info.size && info.size.width,
				height: info.size && info.size.width,
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