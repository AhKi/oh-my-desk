import { connect } from 'react-redux';
import toJS from 'utils/toJS';
// import {} from 'store/widgets';
import WebWidget from './WebWidget';

const mapStateToProps = state => ({ // eslint-disable-line
  // widget:
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
