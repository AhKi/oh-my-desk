import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import i18n from 'constants/i18n';
import closeIcon from 'assets/icon/icon-widget-close.svg';
import './EditTab.scss';

const propTypes = {
  title: PropTypes.string,
  currentUrl: PropTypes.string,
  hidden: PropTypes.bool,
  onCloseTab: PropTypes.func,
};
const defaultProps = {
  title: '',
  currentUrl: '',
  hidden: false,
  onCloseTab() {},
};

class EditTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.currentUrl,
      url: props.currentUrl,
      isUrlHighlight: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { currentUrl } = this.props;
    if (prevProps.currentUrl !== currentUrl) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        url: currentUrl,
        isUrlHighlight: true,
      });
      setTimeout(() => this.setState({
        isUrlHighlight: false,
      }), 1000);
    }
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeUrl(e) {
    this.setState({ url: e.target.value });
  }

  render() {
    const { hidden, title, onCloseTab } = this.props;
    const { name, url, isUrlHighlight } = this.state;
    const text = i18n().widget;
    const tabClassName = cx('EditTab', {
      EditTab__hidden: hidden,
    });
    const urlClassName = cx('InputSet__dividing-inputs-group', {
      EditTab__highlight: isUrlHighlight,
    });

    return (
      <div className={tabClassName}>
        <h1>{title}</h1>
        <button
          type="button"
          onClick={onCloseTab}
        >
          <img src={closeIcon} alt="" />
        </button>
        <div className="InputSet">
          <p className="InputSet__label">{text.name}</p>
          <input
            className="InputSet__dividing-inputs-group"
            type="text"
            value={name}
            onChange={this.handleChangeName}
          />
        </div>
        <div className="InputSet">
          <p className="InputSet__label">{text.url}</p>
          <input
            className={urlClassName}
            type="text"
            value={url}
            onChange={this.handleChangeUrl}
          />
        </div>
        <div>
          <button
            className="Btn Btn--gray"
            type="button"
            onClick={onCloseTab}
          >
            {text.cancel}
          </button>
          <button
            className="Btn Btn--primary"
            type="button"
          >
            {text.config}
          </button>
        </div>
      </div>
    );
  }
}

EditTab.propTypes = propTypes;
EditTab.defaultProps = defaultProps;

export default EditTab;
