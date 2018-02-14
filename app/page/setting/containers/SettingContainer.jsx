import { connect } from 'react-redux';
import Setting from 'components/Setting/index';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper/index';

const mapStateToProps = state => ({ // eslint-disable-line

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(Setting));
