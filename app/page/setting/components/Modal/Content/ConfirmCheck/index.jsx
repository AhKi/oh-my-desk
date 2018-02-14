import { connect } from 'react-redux';
import { modalClose } from 'setting/store/modal/actions';

import ConfirmCheck from './ConfirmCheck';

const mapDispatchToProps = {
  onModalClose: modalClose,
};

export default connect(null, mapDispatchToProps)(ConfirmCheck);
