import { connect } from 'react-redux';
import { valueSelector } from 'store/counter/selectors';
import { counterIncrement, counterDecrement } from 'store/counter/actions';
import Counter from 'components/Counter';

const mapStateToProps = state => ({
  value: valueSelector(state),
});

const mapDispatchToProps = {
  onIncrement: counterIncrement,
  onDecrement: counterDecrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
