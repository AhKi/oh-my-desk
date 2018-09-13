import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { filterSelector } from 'store/reducers/personal/search/selectors';
import { searchSetFilter } from 'actions/search';
import { preferenceOpen } from 'actions/preference';
import SearchMenu from '../components/SearchMenu';

const mapStateToProps = state => ({
  filter: filterSelector(state),
});

const mapDispatchToProps = {
  onSetFilter: searchSetFilter,
  onOpenPreference: preferenceOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchMenu));
