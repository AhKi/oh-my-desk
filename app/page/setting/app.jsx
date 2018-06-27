import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from 'setting/containers/ModalContainer';
import 'scss/index.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
};

function App(props) {
  const { children } = props;
  return (
    <div className="App__container">
      <ModalContainer />
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
