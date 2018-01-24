import * as IPC from 'constants/ipc';

function createWidget(type, info) {
	window.ipcRenderer.send(IPC.WIDGET_MANAGE, {
		operation: 'CREATE',
		widget: {
			id: '',
			type,
			name: info.name,
			url: info.url,
			position: info.position && {
				x: info.position.x || 600,
				y: info.position.y || 100,
			},
			size: info.size && {
				width: info.size.width || 300,
				height: info.size.height || 400,
			},
			transparency: info.transparency || 0.7,
			isActive: info.isActive || true,
			isIcon: info.isIcon || false,
			isOnTop: info.isOnTop || false,
			favicon: info.favicon || null,
		},
	});
	window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
}

export default createWidget;
