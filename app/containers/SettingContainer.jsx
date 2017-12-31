import { connect } from 'react-redux';
import Setting from 'components/Setting';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';

const mapStateToProps = state => ({ // eslint-disable-line

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(Setting));