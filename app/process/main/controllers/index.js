import rootController from './rootController';

function print(prev, next) {
  console.log(prev, next);
}

const controller = (prevState, nextState) => rootController(prevState, nextState, {
  print,
});

export default controller;
