const { remote } = require('electron');
const { ipcRenderer } = require('electron');

let g_widget = null;

(function main() {
	function init() {
		document.getElementById('min-btn').addEventListener('click', () => {
			const window = remote.getCurrentWindow();
			window.minimize();
		});

		document.getElementById('max-btn').addEventListener('click', () => {
			const window = remote.getCurrentWindow();
			if (!window.isMaximized()) {
				window.maximize();
			} else {
				window.unmaximize();
			}
		});

		document.getElementById('close-btn').addEventListener('click', () => {
			const window = remote.getCurrentWindow();
			window.close();
		});
	}

	document.onreadystatechange = function change() {
		if (document.readyState === 'complete') {
			init();
		}
	};

	ipcRenderer.on('widget-info', (event, widget) => {
		const webview = document.getElementById('webview');
		document.getElementById('title').textContent = widget.name;
		g_widget = widget;

		// prevent from refreshing page
		if (!webview.getURL()) {
			webview.loadURL(widget.url, {
				userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36',
			});
		}

		const isOnTop = document.querySelector('#thumbtack');
		const isOnTopIcon = isOnTop.querySelector('svg');

		if (widget.isOnTop) {
			isOnTopIcon.dataset.faTransform = '';
		} else {
			isOnTopIcon.dataset.faTransform = 'rotate-90';
		}
	});
}());

document.querySelector('#thumbtack').addEventListener('click', () => {
	if (!g_widget) return;
	const paramWidget = g_widget;
	paramWidget.isOnTop = !paramWidget.isOnTop;
	ipcRenderer.send('WIDGET_MANAGE', {
		operation: 'UPDATE',
		widget: paramWidget,
	});
});