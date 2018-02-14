import { connect } from 'react-redux';
import { modalClose } from 'store/modal/actions';
import DeleteConfirmWidget from './DeleteConfirmWidget';

const mapDispatchToProps = {
  onClose: modalClose,
};

export default connect(null, mapDispatchToProps)(DeleteConfirmWidget);
