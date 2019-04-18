const { configure } = require('enzyme/build');
const Adapter = require('enzyme-adapter-react-16/build');

configure({ adapter: new Adapter() });
