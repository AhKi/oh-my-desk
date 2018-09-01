import { connect } from 'react-redux';
import {
  updateSkipThisVersion,
  updateDownloadRequest,
  updateSetAutoUpdate,
} from 'actions/update';
import {
  isDownloadFetchSelector,
  isDownloadUpdateWhenStartSelector,
} from 'store/reducers/share/status/selectors';
import {
  newVersionSelector,
  releaseNotesSelector,
} from 'store/reducers/share/config/selectors';
import UpdateWindow from './UpdateWindow';

const mapStateToProps = state => ({
  isDownloadFetch: isDownloadFetchSelector(state),
  isDownloadUpdateWhenStart: isDownloadUpdateWhenStartSelector(state),
  newVersion: newVersionSelector(state),
  releaseNotes: releaseNotesSelector(state),
});

const mapDispatchToProps = {
  onSetAutoUpdate: updateSetAutoUpdate,
  onSkipThisVersion: updateSkipThisVersion,
  onInstallRequest: updateDownloadRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWindow);
