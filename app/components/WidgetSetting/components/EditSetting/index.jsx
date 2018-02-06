import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'components/Button/ToggleButton';

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
      <div className="EditSetting">
        <h4 className="EditSetting__header">Edit setting</h4>
        <div>
          <label htmlFor="name-input">
            Name
            <input
              id="name-input"
              type="text"
              value={item.name}
              onChange={this.handleChangeName}
            />
          </label>
          <label htmlFor="url-input">
            Url
            <input
              id="url-input"
              type="text"
              value={item.url}
              onChange={this.handleChangeUrl}
            />
          </label>
          <div>
            Activated
            <ToggleButton
              checkedValue={null}
              unCheckedValue={null}
              isCheck={item.isActive}
              onToggle={this.handleToggleIsActive}
            />
            Runs the Web widget.
          </div>
          <div>
            Always top
            <ToggleButton
              checkedValue={null}
              unCheckedValue={null}
              isCheck={item.isOnTop}
              onToggle={this.handleToggleIsOnTop}
            />
            Always pin the Web widget up.
          </div>
        </div>
      </div>
    );
  }
}

EditSetting.propTypes = propTypes;
EditSetting.defaultProps = defaultProps;

export default EditSetting;
