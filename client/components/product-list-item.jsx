import React from 'react';

function ProductListItem(props) {
  const product = props.productData;
  let price = product.price;
  price = '$' + ((price / 100).toFixed(2));
  const viewProduct = props.viewData;
  return (
    <div className="col-md-6 col-lg-4 mt-5">
      <div className="product prod-detail card" onClick={() => viewProduct('details', { productId: product.productId })}>
        <img src={product.image} className="card-img-top" alt={product.name}></img>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
