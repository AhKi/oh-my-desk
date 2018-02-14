import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from 'containers/ModalContainer';
import './style.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
};

function App(props) {
  return (
    <div className="App__container">
      <ModalContainer />
      {props.children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
