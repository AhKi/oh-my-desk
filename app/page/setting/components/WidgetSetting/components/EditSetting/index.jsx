import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'setting/components/Button/ToggleButton';
import './EditSetting.scss';

const propTypes = {
  item: PropTypes.shape({
    favicon: PropTypes.string,
    id: PropTypes.string,
    isActive: PropTypes.bool,
    isIcon: PropTypes.bool,
    isOnTop: PropTypes.bool,
    name: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    size: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    transparency: PropTypes.number,
    type: PropTypes.string,
    url: PropTypes.string,
  }),
  onChangeInput: PropTypes.func,
  onStoreWidgetInfo: PropTypes.func,
};
const defaultProps = {
  item: {},
  onChangeInput() {},
  onStoreWidgetInfo() {},
};

class EditSetting extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleToggleIsActive = this.handleToggleIsActive.bind(this);
    this.handleToggleIsOnTop = this.handleToggleIsOnTop.bind(this);
  }

  handleChangeName(e) {
    this.props.onChangeInput('name', e.target.value);
  }

  handleChangeUrl(e) {
    this.props.onChangeInput('url', e.target.value);
  }

  handleToggleIsActive() {
    const { item, onStoreWidgetInfo } = this.props;
    onStoreWidgetInfo(
      item.id,
      Object.assign({}, item, { isActive: !item.isActive }),
    );
  }

  handleToggleIsOnTop() {
    const { item, onStoreWidgetInfo } = this.props;
    onStoreWidgetInfo(
      item.id,
      Object.assign({}, item, { isOnTop: !item.isOnTop }),
    );
  }

  render() {
    const { item } = this.props;

    return (
      <div className="EditSetting space-6x">
        <p className="space-2x"><strong>Edit setting</strong></p>
        <div className="EditSetting__content">
          <label htmlFor="name-input" className="InputSet__label">
            <span className="InputSet__label-text">Name</span>
            <input
              className="InputSet InputSet__text-input"
              id="name-input"
              type="text"
              value={item.name}
              onChange={this.handleChangeName}
            />
          </label>
          <label htmlFor="url-input" className="InputSet__label">
            <span className="InputSet__label-text">Url</span>
            <input
              className="InputSet InputSet__text-input"
              id="url-input"
              type="text"
              value={item.url}
              onChange={this.handleChangeUrl}
            />
          </label>
          <div className="WidgetEdit__toggle-label">
            <span className="InputSet__label-text">Activated</span>
            <div className="WidgetEdit__toggle-btn">
              <ToggleButton
                checkedValue={null}
                unCheckedValue={null}
                isCheck={item.isActive}
                onToggle={this.handleToggleIsActive}
              />
              <span className="InputSet__toggle-description">Runs the Web widget.</span>
            </div>
          </div>
          <div className="WidgetEdit__toggle-label">
            <span className="InputSet__label-text">Always Top</span>
            <div className="WidgetEdit__toggle-btn">
              <ToggleButton
                checkedValue={null}
                unCheckedValue={null}
                isCheck={item.isOnTop}
                onToggle={this.handleToggleIsOnTop}
              />
              <span className="InputSet__toggle-description">Always pin the Web widget up.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditSetting.propTypes = propTypes;
EditSetting.defaultProps = defaultProps;

export default EditSetting;
