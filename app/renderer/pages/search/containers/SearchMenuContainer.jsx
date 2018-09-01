import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { filterSelector } from 'store/reducers/personal/search/selectors';
import { searchSetFilter } from 'actions/search';
import { openPreference } from 'actions/status';
import SearchMenu from '../components/SearchMenu';

const mapStateToProps = state => ({
  filter: filterSelector(state),
});

const mapDispatchToProps = {
  onSetFilter: searchSetFilter,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchMenu));
