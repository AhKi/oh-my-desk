import { connect } from 'react-redux';
import Setting from 'setting/components/Setting';
import GNBWrapper from 'setting/components/GlobalNavigationBar/GNBWrapper';

const mapStateToProps = state => ({ // eslint-disable-line

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(Setting));
