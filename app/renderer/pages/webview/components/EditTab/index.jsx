import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import i18n from 'constants/i18n';
import closeIcon from 'assets/icon/icon-widget-close.svg';
import './EditTab.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  hidden: PropTypes.bool,
  onCheckUrlValidation: PropTypes.func,
  onCloseTab: PropTypes.func,
};
const defaultProps = {
  currentUrl: '',
  name: '',
  title: '',
  id: '',
  hidden: false,
  onCheckUrlValidation() {},
  onCloseTab() {},
};

class EditTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      url: props.currentUrl,
      isUrlHighlight: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleCheckUrlValidation = this.handleCheckUrlValidation.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { currentUrl, name } = this.props;
    if (prevProps.currentUrl !== currentUrl) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        url: currentUrl,
        isUrlHighlight: true,
      });
      setTimeout(() => this.setState({
        isUrlHighlight: false,
      }), 1000);
    }

    if (prevProps.name !== name) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        name,
      });
    }
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeUrl(e) {
    this.setState({ url: e.target.value });
  }

  handleCheckUrlValidation(e) {
    e.preventDefault();

    const { name, url } = this.state;
    const { id, onCheckUrlValidation } = this.props;
    const isUrlFormat = url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
    let nextUrl = url;
    if (!isUrlFormat) {
      nextUrl = `https://${url}`;
      this.setState({ url: nextUrl });
    }

    onCheckUrlValidation(id, name, nextUrl);
  }

  render() {
    const {
      hidden,
      title,
      onCloseTab,
    } = this.props;
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
        <form onSubmit={this.handleCheckUrlValidation}>
          <div className="InputSet">
            <p className="InputSet__label">{text.name}</p>
            <input
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
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
              type="submit"
            >
              {text.config}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditTab.propTypes = propTypes;
EditTab.defaultProps = defaultProps;

export default EditTab;
