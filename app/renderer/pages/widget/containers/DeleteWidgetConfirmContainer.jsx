import { connect } from 'react-redux';
import { myselfSelector } from 'store/reducers/personal/identification/selectors';
import { widgetDelete } from 'actions/widget';
import DeleteWidgetConfirm from 'renderer/components/DeleteWidgetConfirm';

const mapStateToProps = state => ({
  id: myselfSelector(state),
});

const mapDispatchToProps = {
  onDelete: widgetDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWidgetConfirm);
