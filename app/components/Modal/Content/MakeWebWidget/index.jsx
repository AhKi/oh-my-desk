import { connect } from 'react-redux';
import { modalClose } from 'store/modal/actions';
import MakeWebWidget from './MakeWebWidget';

const mapDispatchToProps = {
	onModalClose: modalClose,
};

export default connect(null, mapDispatchToProps)(MakeWebWidget);