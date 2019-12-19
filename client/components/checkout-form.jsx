import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      isDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    const name = this.state.name;
    const creditCard = this.state.creditCard;
    const shippingAddress = this.state.shippingAddress;
    this.setDisabled(name, creditCard, shippingAddress);
  }

  setDisabled(name, creditCard, shippingAddress) {
    if (name !== '' && creditCard !== '' && shippingAddress !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const creditCard = this.state.creditCard;
    const shippingAddress = this.state.shippingAddress;
    this.props.checkout({ name, creditCard, shippingAddress });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.setDisabled(this.state.name, this.state.creditCard, this.state.shippingAddress);
    } else if (this.state.creditCard !== prevState.creditCard) {
      this.setDisabled(this.state.name, this.state.creditCard, this.state.shippingAddress);
    } else if (this.state.shippingAddress !== prevState.shippingAddress) {
      this.setDisabled(this.state.name, this.state.creditCard, this.state.shippingAddress);
    }
  }

  render() {
    const viewCatalog = this.props.viewData;
    const cart = this.props.priceInfo;
    let totalPrice = 0;
    cart.map(product => {
      totalPrice = totalPrice + product.price;
    });
    const total = '$' + ((totalPrice / 100).toFixed(2));
    return (
      <div className="container col-xl-11 mt-5">
        <h2 className="container ml-4">My Cart</h2>
        <h5 className="container back text-muted ml-4">Order Total: {total}</h5>
        <div className="container d-flex flex-wrap m-3">
          <form className="col-xl-10 ml-5" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={this.state.name} name='name' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Credit Card</label>
              <input type="text" className="form-control" value={this.state.creditCard} name='creditCard' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea className="form-control" rows="5" value={this.state.shippingAddress} name='shippingAddress' onChange={this.handleChange}></textarea>
            </div>
            <div className="container mt-3 mb-5 d-flex justify-content-between">
              <div className="back text-muted mt-4" onClick={() => viewCatalog('catalog', {})}>
                {'< Continue Shopping'}
              </div>
              <button disabled={this.state.isDisabled} type="submit" className="btn btn-primary mt-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
