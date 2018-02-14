import { connect } from 'react-redux';
import { modalClose } from 'setting/store/modal/actions';

import Confirm from './Confirm';

const mapDispatchToProps = {
  onModalClose: modalClose,
};

export default connect(null, mapDispatchToProps)(Confirm);
