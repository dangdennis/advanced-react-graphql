import Reset from '../components/Reset';

const Sell = props => (
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default Sell;
