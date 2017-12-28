# oh-my-desk

## how to open react/redux devtools

Then execute the following from the Console tab of your running Electron app's developer tools:

```bash
require('electron-react-devtools').install()
require('electron-redux-devtools').install()
```

And than refresh or restart the renderer process, you can see a React tab added.
