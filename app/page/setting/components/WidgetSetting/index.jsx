import React from 'react';
import PropTypes from 'prop-types';
import Header from 'setting/components/Header';
import * as MODAL from 'constants/modal';
import EditSetting from './components/EditSetting';
import EditSize from './components/EditSize';
import './WidgetSetting.scss';

const propTypes = {
  history: PropTypes.object, // eslint-disable-line
  item: PropTypes.object, // eslint-disable-line
  onStoreWidgetInfo: PropTypes.func,
  onModalOpen: PropTypes.func,
};
const defaultProps = {
  item: {},
  onStoreWidgetInfo: PropTypes.func,
  onModalOpen() {},
};

class WidgetSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: props.item,
      initialInfo: props.item,
    };
    this.setStateInfo = this.setStateInfo.bind(this);
    this.handleMoveWidgetList = this.handleMoveWidgetList.bind(this);
    this.handleChangeSizeHeight = this.handleChangeSizeHeight.bind(this);
    this.handleChangeSizeWidth = this.handleChangeSizeWidth.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (!this.props.item) {
      this.props.history.goBack();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ info: nextProps.item });
  }

  componentWillUnmount() {
    const { info, initialInfo } = this.state;

    // if state.info is not same state.initialInfo
    if (JSON.stringify(info) !== JSON.stringify(initialInfo)) {
      this.props.onStoreWidgetInfo(initialInfo.id, initialInfo);
    }
  }

  setStateInfo(key, value) {
    this.setState({
      info: Object.assign({}, this.state.info, {
        [key]: value,
      }),
    });
  }

  handleCancelEdit() {
    this.props.onModalOpen(MODAL.CONFIRM_CHECK, {
      onConfirm: () => {
        this.props.history.push('/widget-list');
      },
    });
  }

  handleChangeSizeWidth(e) {
    this.setState({
      info: Object.assign({}, this.state.info, {
        size: {
          width: Number(e.target.value),
          height: this.state.info.size.height,
        },
      }),
    });
  }

  handleChangeSizeHeight(e) {
    this.setState({
      info: Object.assign({}, this.state.info, {
        size: {
          width: this.state.info.size.width,
          height: Number(e.target.value),
        },
      }),
    });
  }

  handleMoveWidgetList() {
    this.props.history.push('/widget-list');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { info } = this.state;

    this.setState({ initialInfo: info });
    this.props.onStoreWidgetInfo(info.id, info);
    this.props.onModalOpen(MODAL.CONFIRM, {
      title: 'success',
      content: 'Widget Setting is Changed',
    });
    this.hideInput.focus();
  }

  render() {
    const { onStoreWidgetInfo } = this.props;

    return (
      <div>
        <input
          style={{ width: 0, height: 0 }}
          type="text"
          ref={(ref) => { this.hideInput = ref; }}
        />
        <Header>
          <button
            type="button"
            onClick={this.handleMoveWidgetList}
          >
            <i className="fas fa-arrow-left" />
          </button>
          Back to List
        </Header>
        <form
          className="WidgetSetting__content"
          onSubmit={this.handleSubmit}
        >
          <EditSetting
            item={this.state.info}
            onStoreWidgetInfo={onStoreWidgetInfo}
            onChangeInput={this.setStateInfo}
          />
          <EditSize
            item={this.state.info}
            onChangeHeight={this.handleChangeSizeHeight}
            onChangeWidth={this.handleChangeSizeWidth}
          />
          <button
            className=""
            type="button"
            onClick={this.handleCancelEdit}
          >
            {'<'} back
          </button>
          <input
            type="submit"
            value="Save"
          />
        </form>
      </div>
    );
  }
}

WidgetSetting.propTypes = propTypes;
WidgetSetting.defaultProps = defaultProps;

export default WidgetSetting;
