import rootController from './rootController';

function print(prev, next) {
  console.log(prev, next);
}

const controller = (prevState, nextState, action) => rootController(prevState, nextState, action, {
  print,
});

export default controller;
