import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Svg from 'react-svg-inline';
import i18n from 'constants/i18n';
import closeIcon from 'assets/page-view_icon/icon_xbtn.svg';
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

    const nextUrl = /^http(s)?:\/\//.test(url) ? url : `http://${url}`;
    this.setState({ url: nextUrl });

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
    const urlClassName = cx('InputSet__text-input', 'EditTab__input', {
      EditTab__highlight: isUrlHighlight,
    });

    return (
      <div className={tabClassName}>
        <div className="EditTab__Header">
          <p className="EditTab__title">{title}</p>
          <button
            className="EditTab__close-btn"
            type="button"
            onClick={onCloseTab}
          >
            <Svg className="EditTab__close-icon" svg={closeIcon} />
          </button>
        </div>
        <form className="EditTab__form" onSubmit={this.handleCheckUrlValidation}>
          <div className="InputSet EditTab__input-set">
            <p className="InputSet__label EditTab__label">{text.name}</p>
            <input
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              className="InputSet__text-input EditTab__input"
              type="text"
              value={name}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="InputSet EditTab__input-set">
            <p className="InputSet__label EditTab__label">{text.url}</p>
            <input
              className={urlClassName}
              type="text"
              value={url}
              onChange={this.handleChangeUrl}
            />
          </div>
          <div className="EditTab__btn-set">
            <button
              className="EditTab__btn Btn Btn--md Btn--gray"
              type="button"
              onClick={onCloseTab}
            >
              {text.cancel}
            </button>
            <button
              className="EditTab__btn Btn Btn--md Btn--primary"
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
