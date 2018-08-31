import { connect } from 'react-redux';
import { mySelfIdSelector } from 'store/personal/selectors';
import { deleteTargetWidget } from 'actions/widget';
import DeleteWidgetConfirm from '../components/DeleteWidgetConfirm';

const mapStateToProps = state => ({
  id: mySelfIdSelector(state),
});

const mapDispatchToProps = {
  onDelete: deleteTargetWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWidgetConfirm);
