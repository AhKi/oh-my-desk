import { connect } from 'react-redux';
import { myselfSelector } from 'store/reducers/personal/identification/selectors';
import { deleteTargetWidget } from 'actions/widget';
import DeleteWidgetConfirm from '../components/DeleteWidgetConfirm';

const mapStateToProps = state => ({
  id: myselfSelector(state),
});

const mapDispatchToProps = {
  onDelete: deleteTargetWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWidgetConfirm);
