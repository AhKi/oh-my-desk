import React from 'react';
import PropTypes from 'prop-types';
import ValidationInput from 'components/ValidationInput';
import OutsideClickHandler from 'components/OutsideClickHandler';
import * as IPC from 'constants/ipc';
import validateName from 'utils/validation/widgetName';
import validateUrl from 'utils/validation/widgetUrl';
import updateWidget from 'utils/updateWidget';
import './WebWidgetSetting.scss';

const propTypes = {
  name: PropTypes.string,
  widget: PropTypes.object, // eslint-disable-line
  url: PropTypes.string,
  onToggleSetting: PropTypes.func,
};
const defaultProps = {
  name: '',
  widget: {},
  url: '',
  onToggleSetting() {},
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
    this.openManageView = this.openManageView.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      url: nextProps.url,
    });
  }

  openManageView() { // eslint-disable-line
    window.ipcRenderer.send(IPC.WIDGET_MANAGER_OPEN);
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

    if (name && url && (!nameError && !urlError)) {
      this.props.onToggleSetting(false);
      updateWidget(
        'web',
        Object.assign({}, this.props.widget, {
          name: this.state.name,
          url: this.state.url,
        }),
      );
    }
  }

  render() {
    const {
      name,
      nameError,
      url,
      urlError,
    } = this.state;
    const { onToggleSetting } = this.props;

    return (
      <div className="WebWidgetSetting">
        <OutsideClickHandler onOutSideClick={onToggleSetting}>
          <form>
            <h3>Edit setting</h3>
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
            <button
              type="button"
              onClick={this.openManageView}
            >
              Go to manage view
            </button>
            <input
              type="submit"
              value="Save"
              onClick={this.handleSubmit}
            />
          </form>
        </OutsideClickHandler>
      </div>
    );
  }
}

WebWidgetSetting.propTypes = propTypes;
WebWidgetSetting.defaultProps = defaultProps;

export default WebWidgetSetting;
