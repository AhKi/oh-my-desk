import { connect } from 'react-redux';
import { updateCheckRequestOnManual } from 'actions/update';
import { isUpdateCheckFetchSelector } from 'store/reducers/share/status/selectors';
import Update from '../components/Update';

const mapStateToProps = state => ({
  isUpdateCheckFetch: isUpdateCheckFetchSelector(state),
});

const mapDispatchToProps = {
  onUpdateCheckOnManual: updateCheckRequestOnManual,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
