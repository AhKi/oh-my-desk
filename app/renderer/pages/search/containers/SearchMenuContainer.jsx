import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { filterSelector } from 'store/reducers/personal/search/selectors';
import { preferenceOpen } from 'actions/preference';
import { searchSetFilter } from 'actions/search';
import { widgetMakeRequest } from 'actions/widget';
import SearchMenu from '../components/SearchMenu';

const mapStateToProps = state => ({
  filter: filterSelector(state),
});

const mapDispatchToProps = {
  onMakeWidgetRequest: widgetMakeRequest,
  onOpenPreference: preferenceOpen,
  onSetFilter: searchSetFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchMenu));
