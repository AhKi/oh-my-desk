import { connect } from 'react-redux';
import { widgetDelete } from 'actions/widget';
import DeleteWidgetConfirm from 'renderer/components/DeleteWidgetConfirm';

const mapDispatchToProps = {
  onDelete: widgetDelete,
};

export default connect(null, mapDispatchToProps)(DeleteWidgetConfirm);
