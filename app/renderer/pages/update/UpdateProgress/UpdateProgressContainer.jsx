import { connect } from 'react-redux';
import {
  currentProgressSelector,
  totalProgressSelector,
} from 'store/reducers/personal/update/selectors';
import { newVersionSelector } from 'store/reducers/share/config/selectors';
import { isDownloadFetchSelector } from 'store/reducers/share/status/selectors';
import { updateProgressCancel } from 'actions/update';
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
