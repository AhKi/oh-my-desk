import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import i18n from 'constants/i18n';
import EditTab from '../EditTab';
import './MakeNotice.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  onCheckUrlValidation: PropTypes.func,
};
const defaultProps = {
  currentUrl: '',
  id: '',
  title: '',
  onCheckUrlValidation() {},
};

class MakeNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenTab: false,
    };
    this.handleToggleTab = this.handleToggleTab.bind(this);
  }

  handleToggleTab() {
    this.setState(prevState => ({
      isOpenTab: !prevState.isOpenTab,
    }));
  }


  render() {
    const { isOpenTab } = this.state;
    const {
      currentUrl,
      id,
      title,
      onCheckUrlValidation,
    } = this.props;
    const text = i18n().widget;
    const barClassName = cx('MakeNotice__bar', {
      'MakeNotice__bar--hidden': isOpenTab,
    });

    return [
      <div className={barClassName} key="bar">
        {text.makeBarContent}
        <button
          className="MakeNotice__bar-btn"
          type="button"
          onClick={this.handleToggleTab}
        >
          {text.makeWidget} {'>'}
        </button>
      </div>,
      <EditTab
        currentUrl={currentUrl}
        hidden={!isOpenTab}
        key="tab"
        id={id}
        title={title}
        onCheckUrlValidation={onCheckUrlValidation}
        onCloseTab={this.handleToggleTab}
      />,
    ];
  }
}

MakeNotice.propTypes = propTypes;
MakeNotice.defaultProps = defaultProps;

export default MakeNotice;
