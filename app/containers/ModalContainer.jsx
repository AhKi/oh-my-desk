import { connect } from 'react-redux';
import {
  modalPropsSelector,
  modalTypeSelector,
} from 'store/modal/selectors';
import Modal from 'components/Modal';

const mapStateToProps = state => ({
  modalType: modalTypeSelector(state),
  modalProps: modalPropsSelector(state),
});

export default connect(mapStateToProps)(Modal);
