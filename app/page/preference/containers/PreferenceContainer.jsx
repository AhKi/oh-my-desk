import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preference from 'page/preference/components/Preference/index';
import toJS from 'utils/toJS';
import { langSelector } from 'store/share/status/selectors';
import {
  setLanguageEnglish,
  setLanguageKorean,
} from 'actions/status/index';

const mapStateToProps = state => ({
  lang: langSelector(state),
});
const mapDispatchToProps = {
  onSetLanguageEnglish: setLanguageEnglish,
  onSetLanguageKorean: setLanguageKorean,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(Preference)));
