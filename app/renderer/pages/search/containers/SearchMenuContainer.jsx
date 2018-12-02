import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { filterSelector } from 'store/reducers/personal/search/selectors';
import { preferenceOpen } from 'actions/preference';
import {
  searchAppQuit,
  searchSetFilter,
} from 'actions/search';
import { widgetMakeRequest } from 'actions/widget';
import SearchMenu from '../components/SearchMenu';

const mapStateToProps = state => ({
  filter: filterSelector(state),
});

const mapDispatchToProps = {
  onQuitApp: searchAppQuit,
  onMakeWidgetRequest: widgetMakeRequest,
  onOpenPreference: preferenceOpen,
  onSetFilter: searchSetFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchMenu));
