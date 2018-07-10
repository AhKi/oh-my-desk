import { connect } from 'react-redux';
import { modalClose } from 'actions/modal';

import ConfirmCheck from './ConfirmCheck';

const mapDispatchToProps = {
  onModalClose: modalClose,
};

export default connect(null, mapDispatchToProps)(ConfirmCheck);
