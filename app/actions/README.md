# action

This directory is code of action in Oh-My-Desk.

Action mean like store of [redux](https://redux.js.org/)

But Our Store have something difference another action like `Redux action` used in Web Application.
Please Show following **Play of actions** paragraph.

## dependency
- Mandatory
    - [Redux](https://redux.js.org/)
- Optional
    - [jest](https://jestjs.io/en/)

## Play of actions

Action can change data of store.

It looks like redux actions that is only method of change store.

But, Our project has several store. That make a difference from the redux action.

Action must manage communication between processes because our project has serveral process and each process has own store!

So, Action has category in meta attribute.
Category is `self`, `broadcast`, `target`.

- self
  - self action is dispatched itself. Not transmit another process
  ```
  const someAction = {
    type: 'SOME_ACTION',
    payload: // some payload like object.
    meta: {
      category: 'SELF'
    }
  }
  ```
- broadcast
  - broadcast action is dispatched All(main and all renderer) process
  ```
  const someAction = {
    type: 'SOME_ACTION'
    payload: // some payload like object.
    meta: {
      category: 'BROADCAST'
    }
  }
  ```
- target
  - target action is dispatched targeting process
  - targeted process is id of array in action.meta.target
  ```
  const someAction = {
    type: 'SOME_ACTION'
    payload: // some payload like object.
    meta: {
      category: 'TARGET',
      self: true or false, // if true, action is dispatched in source process.
      target: [(id)?] // action will be dispatched in id of array
      // id(String): identification of each window process. Maybe It is saved in myself of store.
      containMain: true || false // if true, action will be dispatched in main process.
    }
  }
  ```

Category is using in middleware of redux. Show code about store/middleware/categorizeActionIn*.js

#### Why does serveral store exist in this project?
[Show store/README.md]()

#### Why don't use `IPC communication` to communicate between processes?

We already use action to manage data of store.

If we use IPC communication like `ipcRenderer.on()` or `ipcMain.send()`, We must dispatch several action to change data in multiple store.
For example, You change value in `renderer 1` process and `main` process.
You may dispatch action to change in `renderer 1` process and inform to change value from `renderer 1` to `main`.
Then `main` receive inform from `ipcMain.on` and dispatch to change value.

`dispatch(renderer 1) -> ipc communicate(from renderer 1 to main) -> dispatch(main)`

What about there are more than two?
It is complecate!

Our method is simple. Just dispatch action that set broadcast category!

## Contact us

If you don't understand or need more information, contact us!
You can mailing me(mos_dev@naver.com) or make [Issues](https://github.com/ahki/oh-my-desk/issues)!
