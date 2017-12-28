# oh-my-desk

## how to open react/redux devtools

Then execute the following from the Console tab of your running Electron app's developer tools:

```bash
require('electron-react-devtools').install()
require('electron-redux-devtools').install()
```

And than refresh or restart the renderer process, you can see a React tab added.

## read setting data about widgets

we read/save setting data from `C:\Users\suyou\AppData\Roaming\oh-my-desk\widgets.json`

## testing ipc communication 

type this code in renderer process

```js
const {ipcRenderer} = require('electron')

ipcRenderer.send('WIDGET_MANAGE', {
	"operation": "CREATE",
	"widget": {
		"id": "",
		"type": "web",
		"name": "네이버 검색",
		"url": "https://www.naver.com/",
		"position": {
			"x": 600,
			"y": 100
		},
		"size": {
			"width": 300,
			"height": 400
		},
		"transparency": 0.7,
		"isActive": true,
		"isIcon": false,
		"isOnTop": false,
		"favicon": null
	}
})

ipcRenderer.send('WIDGET_MANAGE', {
	"operation": "DELETE",
	"widget": {
		"id": "52fc5318-24a4-4784-a352-695509427aea",
		"type": "web",
		"name": "네이버 검색",
		"url": "https://www.naver.com/",
		"position": {
			"x": 600,
			"y": 100
		},
		"size": {
			"width": 300,
			"height": 400
		},
		"transparency": 0.7,
		"isActive": true,
		"isIcon": false,
		"isOnTop": false,
		"favicon": null
	}
})
```

## how to regist event which gets data of widgets

```js

// regist the callback method gets data of widgets
ipcRenderer.on('WIDGET_INFO_RESULT', (event, arg) => {
  console.log(arg)
})

// send event to main process
ipcRenderer.send('WIDGET_INFO_REQUEST', '')

```

when ```js ipcRenderer.send('WIDGET_INFO_REQUEST', '') ``` is called, the result will be handled in `WIDGET_INFO_RESULT`
