import { connect } from 'react-redux';
import Preference from 'page/preference/components/Preference';
import toJS from 'utils/toJS';
import { langSelector } from 'store/share/status/selectors';
import {
  setLanguageEnglish,
  setLanguageKorean,
} from 'actions/status';

const mapStateToProps = state => ({
  lang: langSelector(state),
});
const mapDispatchToProps = {
  onSetLanguageEnglish: setLanguageEnglish,
  onSetLanguageKorean: setLanguageKorean,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Preference));
