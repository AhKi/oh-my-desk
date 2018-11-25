import { connect } from 'react-redux';
import { setHotKeySearchWindow } from 'actions/setting';
import { hotKeySearchWindowSelector } from 'store/reducers/share/config/selectors';
import ConfigureHotKey from '../components/ConfigureHotKey';

const mapStateToProps = state => ({
  hotKey: hotKeySearchWindowSelector(state),
});

const mapDispatchToProps = {
  onUpdateHotKey: setHotKeySearchWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureHotKey);
