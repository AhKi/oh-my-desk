# oh-my-desk

The oh-my-desk is a desktop widget to use web content.
It is desktop application made by [electron](https://github.com/electron/electron).
Use every web content though widget in computer wallpaper.

## OverView



## Installation

**Download and Use**
```
// if you use yarn

yarn build // No matter which OS you use
yarn build:window // use window OS
yarn build:mac // use macOS
yarn build:linux // use linux

// else
npm run build // No matter which OS you use
npm run build:window // use window OS
npm run build:mac // use macOS
npm run build:linux // use linux

then open dist directory and install oh-my-desk.exe (or .dmg)
```

**Using Develop environment**
```
// if you use yarn
yarn
yarn start

// else
npm install
npm run start
```


## Using Technique

### Main Process

[electron](https://github.com/electron/electron)

[electron-builder](https://github.com/electron-userland/electron-builder)


### Setting View

[react](https://github.com/facebook/react)

[redux](https://github.com/reactjs/redux)

[react-router](https://github.com/ReactTraining/react-router)

[webpack](https://github.com/webpack/webpack)

[immutable-js](https://github.com/facebook/immutable-js)

## Path about Save and read data about widgets

we read/save setting data from 

window: `C:\Users\suyou\AppData\Roaming\oh-my-desk\widgets.json`

MacOS: `~/Library/Application Support/oh-my-desk/widgets.json`

Linux: `~/.config/oh-my-desk/widgets.json`

## Example of IPC communication

IPC communication between setting renderer process and main process in electron.


```js
// create widget 

ipcRenderer.send('WIDGET_MANAGE', {
  "operation": "CREATE",
  "widget": {
    "id": "",
    "type": "web",
    "name": "naver search",
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

// delete widget

ipcRenderer.send('WIDGET_MANAGE', {
  "operation": "DELETE",
  "widget": {
    "id": "52fc5318-24a4-4784-a352-695509427aea",
})


// regist the callback method gets data of widgets

ipcRenderer.on('WIDGET_INFO_RESULT', (event, arg) => {
  // some code...
})

// send event to main process

ipcRenderer.send('WIDGET_INFO_REQUEST')
```
when `ipcRenderer.send('WIDGET_INFO_REQUEST', '')` is called, the result will be handled in `WIDGET_INFO_RESULT`


### Contributing Guide

Everybody can contribute this project.

If you want to use new feature, Just make issue.

If you want to change code this project, Just make pull request.

### License
**GPL-3.0+**
