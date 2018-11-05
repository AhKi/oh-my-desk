import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import closeIcon from 'assets/icon/icon-widget-close.svg';
import './ReloadTimer.scss';

const propTypes = {
  id: PropTypes.string,
  reloadTimer: PropTypes.number,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUpdateInfo: PropTypes.func,
};
const defaultProps = {
  id: '',
  reloadTimer: 0,
  webView: null,
  onUpdateInfo() {},
};

class ReloadTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.reloadTimer,
      tick: null,
    };
    this.handleCancelTimer = this.handleCancelTimer.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.handleToggleTimer = this.handleToggleTimer.bind(this);
  }

  componentDidMount() {
    this.setState({
      tick: setInterval(this.handleTick, 1000),
    });
  }

  componentDidUpdate(prevProps) {
    const { reloadTimer } = this.props;

    if (prevProps.reloadTimer !== reloadTimer) {
      this.setState({ timer: reloadTimer }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  componentWillUnmount() {
    const { tick } = this.state;

    clearInterval(tick);
  }

  handleToggleTimer() {
    const { tick } = this.state;

    if (tick) {
      clearInterval(tick);
      this.setState({ tick: null });
    } else {
      this.setState({ tick: setInterval(this.handleTick, 1000) });
    }
  }

  handleTick() {
    const { reloadTimer, webView } = this.props;
    const { timer } = this.state;

    if (timer <= 0) {
      this.setState({ timer: reloadTimer });
      webView.reload();
    } else {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }));
    }
  }

  handleCancelTimer() {
    const { id, onUpdateInfo } = this.props;

    onUpdateInfo(id, {
      reloadInterval: 0,
    });
  }

  render() {
    const { timer, tick } = this.state;
    const minute = parseInt(timer / 60, 10);
    const second = timer % 60;
    const reloadTimerBtnClassName = cx('ReloadTimer', {
      ReloadTimer__stop: !tick,
    });

    return (
      <div className={reloadTimerBtnClassName}>
        <button
          className="ReloadTimer__button"
          type="button"
          onClick={this.handleCancelTimer}
        >
          <img src={closeIcon} alt="" />
        </button>
        <button
          className="ReloadTimer__button"
          type="button"
          onClick={this.handleToggleTimer}
        >
          {minute < 10 ? `0${minute}` : minute} : {second < 10 ? `0${second}` : second}
        </button>
      </div>
    );
  }
}

ReloadTimer.propTypes = propTypes;
ReloadTimer.defaultProps = defaultProps;

export default ReloadTimer;
