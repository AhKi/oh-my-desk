import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import Modal from 'renderer/components/Modal';
import { langSelector } from 'store/share/status/selectors';
import {
  modalClose,
} from 'actions/modal';
import {
  modalTypeSelector,
  modalPropsSelector,
} from 'store/personal/modal/selectors';

const mapStateToProps = state => ({
  Component: modalTypeSelector(state),
  lang: langSelector(state),
  modalProps: modalPropsSelector(state),
});

const mapDispatchToProps = {
  onModalClose: modalClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Modal));
