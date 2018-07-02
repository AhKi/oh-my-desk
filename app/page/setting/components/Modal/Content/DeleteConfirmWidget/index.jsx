import { connect } from 'react-redux';
import { modalClose } from 'setting/store/modal/actions';
import { deleteTargetWidget } from 'actions/widget';
import DeleteConfirmWidget from './DeleteConfirmWidget';

const mapDispatchToProps = {
  onClose: modalClose,
  onDeleteWidget: deleteTargetWidget,
};

export default connect(null, mapDispatchToProps)(DeleteConfirmWidget);
