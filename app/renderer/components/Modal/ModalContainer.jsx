import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import Modal from 'renderer/components/Modal';
import { languageSelector } from 'store/reducers/share/config/selectors';
import {
  modalClose,
} from 'actions/modal';
import {
  contentSelector,
  propsSelector,
} from 'store/reducers/personal/modal/selectors';

const mapStateToProps = state => ({
  Component: contentSelector(state),
  language: languageSelector(state),
  modalProps: propsSelector(state),
});

const mapDispatchToProps = {
  onModalClose: modalClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Modal));
