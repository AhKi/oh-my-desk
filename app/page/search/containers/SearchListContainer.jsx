import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { getWidgetArray } from 'store/share/widgets/selectors';
import SearchList from '../components/SearchList';

const mapStateToProps = state => ({
  list: getWidgetArray(state),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchList));
