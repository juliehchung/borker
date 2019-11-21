import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { name: 'catalog', params: {} }, cart: [] };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: { name, params }
    });
  }

  getCartItems() {
    const requestItems = new Request('/api/cart');
    fetch(requestItems)
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  addToCart(product) {
    const requestCart = new Request('/api/cart');
    const req = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(requestCart, req)
      .then(response => response.json())
      .then(product => this.setState({ cart: this.state.cart.concat(product) }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    let productElem;
    if (this.state.view.name === 'catalog') {
      productElem = <ProductList viewData={this.setView} />;
    } else if (this.state.view.name === 'details') {
      productElem = <ProductDetails productData={this.state.view.params} viewData={this.setView} addItem={this.addToCart} />;
    }
    const cartItemCount = this.state.cart.length;
    return (
      <>
        <Header cartItemCount={cartItemCount}/>
        <div className="container">
          {productElem}
        </div>
      </>
    );
  }
}
