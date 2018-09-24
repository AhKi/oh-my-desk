import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import i18n from 'constants/i18n';
import EditTab from '../EditTab';
import './MakeNotice.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  title: PropTypes.string,
};
const defaultProps = {
  currentUrl: '',
  title: '',
};

class MakeNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenTab: true,
      // isOpenTab: false,
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
    const { currentUrl, title } = this.props;
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
        title={title}
        onCloseTab={this.handleToggleTab}
      />,
    ];
  }
}

MakeNotice.propTypes = propTypes;
MakeNotice.defaultProps = defaultProps;

export default MakeNotice;
