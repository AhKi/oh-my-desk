import * as IPC from 'constants/ipc';

function createWidget(type, info) {
	console.log(info);
	window.ipcRenderer.send(IPC.WIDGET_MANAGE, {
		operation: 'CREATE',
		widget: {
			id: '',
			type,
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
