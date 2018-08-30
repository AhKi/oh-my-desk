import { connect } from 'react-redux';
import { mySelfIdSelector } from 'store/personal/selectors';
import { deleteTargetWidget } from 'actions/widget/index';
import DeleteWidgetConfirm from '../components/DeleteWidgetConfirm/index';

const mapStateToProps = state => ({
  id: mySelfIdSelector(state),
});

const mapDispatchToProps = {
  onDelete: deleteTargetWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWidgetConfirm);
