# store

This directory is code of store in Oh-My-Desk.

Store mean like store of [redux](https://redux.js.org/)

But Our Store have something difference another store like `Redux Store` used in Web Application.
Please Show following **Purpose of Unified Store** paragraph.

## dependency
- Mandatory
    - [Redux](https://redux.js.org/)
- Optional
    - [jest](https://jestjs.io/en/)

## Purpose of **Unified Store**

We use sentence of `Unified Store`.
What is the `Unified Store`?

To understand `Unified Store`, You know environment of Electron.

Electron have two kind of process, Main Process and Renderer Process.
Each process is independent of stored data. So data is managed serveral place.

We need to Unified data of main process and renderer process. There can even be multiple renderer processes!

First, We use a way of Redux to manage data. Because Redux structure is good for this project.

Second, `Main process` and `Renderer Processes` must have same data at the same time.
It is not possible for each process to share data because there are separated process!
So when one process change data, other process simultaneously change data to match it.

Thrid, The method to synchronize data is **Action**. Action is like Redux's action.
Action can change data(reducer) like Redux's action. In addition, It can also be used for communication between processes.

```
// configureStore.js
const configureStore = (scope) => {

  if (scope === MAIN) {
    const categorizeActionInMain = ...
    ... some code for store of main process.

  }

  ... some code for store of renderer process.
```
Show above code.
`configureStore` can create store branched scope(main or renderer).
In main process use code like `const store = configureStore('MAIN')`.
In renderer process use code like `const store = configureStore()`.

It can apply different middleware for main or renderer.

Main process use `categorizeActionInMain` in `store/middleware/categorizeActionInMain.js`
Renderer process use `categorizeActionInRenderer` in `store/middleware/categorizeActionInRenderer.js`
It is branched dispatch about action category. Categorizing can communicate between processes.

Show action/README.md to know categorizing about action.

> Of course, `Unified Store` is not famous rule. It just was make by me when I was planned `Oh-My-Desk`.
If you know bad things of this idea or you know other idea to substitue this idea, Please teach me! Thank you.

## Description about composite

### middleware

It has middleware to use store.
Currently, It has middleware to categorize action for process type.

### reducers

It is data stored in store.

- personal
    - It is reducer that don't need to share with another process.
    For example, identification/myself is id of window. It don't need to know another process.
    - identification/
        - This has identify data like id.
    - modal
        - about modal data.
    - search
        - about data about search page.
    - update
        - about data about update pages.

- share
    - It is reducer that need to share with another process. Data is used globally.
    - config
        - shared data about app setting
    - identification
        - need to share data that is separated id.
    - status
        - need to know globally(all process) used.
        - It has only **Boolean** data.


### utils

It has util function to catch action from another process.

- subscribeActionMain.js
    - use in `main/utils/init.js` to subscribe action in main process.
- subscribeActionRenderer.js
    - use in `renderer/pages/index.jsx(all of each page)`  to subscribe action in renderer process.

## Contact us

If you don't understand or need more information, contact us!
You can mailing me(mos_dev@naver.com) or make [Issues](https://github.com/ahki/oh-my-desk/issues)!
