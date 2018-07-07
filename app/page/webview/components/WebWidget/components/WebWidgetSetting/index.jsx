import React from 'react';
import PropTypes from 'prop-types';
import ValidationInput from 'components/ValidationInput';
import OutsideClickHandler from 'components/OutsideClickHandler';
import validateName from 'utils/validation/widgetName';
import validateUrl from 'utils/validation/widgetUrl';
import './WebWidgetSetting.scss';

const propTypes = {
  name: PropTypes.string,
  widget: PropTypes.object, // eslint-disable-line
  url: PropTypes.string,
  onOpenPreference: PropTypes.func,
  onToggleSetting: PropTypes.func,
  onUpdateInfo: PropTypes.func,
};
const defaultProps = {
  name: '',
  widget: {},
  url: '',
  onOpenPreference() {},
  onToggleSetting() {},
  onUpdateInfo() {},
};

class WebWidgetSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      nameError: '',
      url: props.url,
      urlError: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      url: nextProps.url,
    });
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value,
      nameError: validateName(e.target.value),
    });
  }

  handleChangeUrl(e) {
    this.setState({
      url: e.target.value,
      urlError: validateUrl(e.target.value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name,
      nameError,
      url,
      urlError,
    } = this.state;
    const {
      widget,
      onToggleSetting,
      onUpdateInfo,
    } = this.props;

    if (name && url && (!nameError && !urlError)) {
      onUpdateInfo(widget.id, { name, url });
      onToggleSetting(false);
    }
  }

  render() {
    const {
      name,
      nameError,
      url,
      urlError,
    } = this.state;
    const { onOpenPreference, onToggleSetting } = this.props;

    return (
      <div className="WebWidgetSetting">
        <OutsideClickHandler onOutSideClick={onToggleSetting}>
          <form>
            <h6 className="WebWidgetSetting__title space-3x">
              <strong>
                Edit setting
              </strong>
            </h6>
            <ValidationInput
              autoFocus
              name="Name"
              value={name}
              error={nameError}
              onChange={this.handleChangeName}
            />
            <ValidationInput
              name="Url"
              value={url}
              error={urlError}
              onChange={this.handleChangeUrl}
            />
            <div className="WebWidgetSetting__btn-box">
              <button
                className="TextBtn TextBtn--blue WebWidgetSetting__text-btn"
                type="button"
                onClick={onOpenPreference}
              >
                Go to manage view
              </button>
              <input
                className="Btn Btn--primary Btn--sm"
                type="submit"
                value="Save"
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </OutsideClickHandler>
      </div>
    );
  }
}

WebWidgetSetting.propTypes = propTypes;
WebWidgetSetting.defaultProps = defaultProps;

export default WebWidgetSetting;
