import { connect } from 'react-redux';
import {
  currentProgressSelector,
  isDownloadFetchSelector,
  newVersionSelector,
  totalProgressSelector,
} from 'store/share/update/selectors';
import { updateProgressCancel } from 'actions/update/index';
import UpdateProgress from './UpdateProgress';

const mapStateToProps = state => ({
  currentProgress: currentProgressSelector(state),
  totalProgress: totalProgressSelector(state),
  newVersion: newVersionSelector(state),
  isDownload: isDownloadFetchSelector(state),
});

const mapDispatchToProps = {
  onCancelDownload: updateProgressCancel,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProgress);
