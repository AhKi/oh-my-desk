import { connect } from 'react-redux';
import { modalClose } from 'actions/modal';
import { registerNewWidget } from 'actions/widget';
import MakeWebWidget from './MakeWebWidget';

const mapDispatchToProps = {
  onModalClose: modalClose,
  onRegisterNew: registerNewWidget,
};

export default connect(null, mapDispatchToProps)(MakeWebWidget);
