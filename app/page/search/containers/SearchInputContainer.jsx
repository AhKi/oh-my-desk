import { connect } from 'react-redux';
import { isTrayOpenSelector } from 'store/share/status/selectors';
import SearchInput from '../components/SearchInput';

const mapStateToProps = state => ({
  isTrayOpen: isTrayOpenSelector(state),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
