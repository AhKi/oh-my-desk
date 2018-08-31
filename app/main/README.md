# main

This directory is code of main process about [Electron](https://electronjs.org/https://electronjs.org/).

Our App run using Electron. Electron manage several `Renderer Process` using `Main Process`.

`Main Process` can handle other `Renderer Process`.(Basically)
And, `Renderer Process` can handle `Main Process` using `Controller`.


## dependency

- Mandatory
    - [Electron](https://electronjs.org/)
- Optional
    - [jest](https://jestjs.io/en/)

## Description about composite

### controllers

It is tool that `Renderer Process` handle `Main Process` logic.

`Electron` has some code that specially only can use in `Main Process`.

Nomarlly, most app may be use `IPC communication` to communicate each other(renderer to main or renderer to renderer).

But Our app use `Unified Store`. So, We can use `Redux Action` to communicate each other.

[Show more information about Unified Store]()

`Controller` is part of `Unified Store`.
It subscribe action that dispatched action(show [categorizeActionInMain.js]()) in Main Process using controller of `controller/index.js`.
Each controller are separated by used location.(like preference, widget etc.)

Show sampeController code.

```
const someController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.OPEN_PREFERENCE: {
      openPreference(); // main process run this function to open preference window.
      break;
    }
    case TYPES.TOGGLE_AUTO_LAUNCH: {
      autoLaunch();
      break;
    }
    ...
  }
};

```
- Controller receive action and use `action.type`.
- Switch Code branch each case.
- Example
    1. Renderer Process dispatch action that OPEN_PREFERENCE.
    2. Action is transported in Main Process.
    3. Main Process dispatch action that OPEN_PREFERENCE.
    4. **Then, Controller subscribed in middleware of Main Process get action.**
    5. Switch of controller check that if matched action type.
    6. If match, run `openPreference` or If not, skip switch logic.

### utils

It has module using Main Process to use manage Electron.

They are separated by folder with the appropriate name.
That name don't have strict rules.

## Contact us

If you don't understand or need more information, contact us!
You can mailing me(mos_dev@naver.com) or make [Issues](https://github.com/ahki/oh-my-desk/issues)!
