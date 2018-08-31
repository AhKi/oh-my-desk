import { connect } from 'react-redux';
import {
  updateSkipThisVersion,
  updateDownloadRequest,
  updateSetAutoUpdate,
} from 'actions/update';
import {
  isAutoUpdateSelector,
  isDownloadFetchSelector,
  newVersionSelector,
  releaseNotesSelector,
} from 'store/share/update/selectors';
import UpdateWindow from './UpdateWindow';

const mapStateToProps = state => ({
  isDownloadFetch: isDownloadFetchSelector(state),
  isAutoUpdate: isAutoUpdateSelector(state),
  newVersion: newVersionSelector(state),
  releaseNotes: releaseNotesSelector(state),
});

const mapDispatchToProps = {
  onSetAutoUpdate: updateSetAutoUpdate,
  onSkipThisVersion: updateSkipThisVersion,
  onInstallRequest: updateDownloadRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWindow);
