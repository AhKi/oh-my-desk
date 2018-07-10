import { connect } from 'react-redux';
import { modalClose } from 'actions/modal';

import Confirm from './Confirm';

const mapDispatchToProps = {
  onModalClose: modalClose,
};

export default connect(null, mapDispatchToProps)(Confirm);
