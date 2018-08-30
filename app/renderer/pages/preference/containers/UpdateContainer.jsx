import { connect } from 'react-redux';
import { updateCheckRequestOnManual } from 'actions/update';
import { isCheckFetchSelector } from 'store/share/update/selectors';
import Update from '../components/Update';

const mapStateToProps = state => ({
  isCheckFetch: isCheckFetchSelector(state),
});

const mapDispatchToProps = {
  onUpdateCheckOnManual: updateCheckRequestOnManual,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
