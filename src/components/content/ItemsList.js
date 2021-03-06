import React, { Component } from "react";

const API_URL = "https://xijx2gs4ng.execute-api.us-east-1.amazonaws.com/prod";
export default class ItemsList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      product: {},
      loadingProducts: true,
      showList: true,
      swowDetails: false,
      productIdToShow: 0
    };

    this.getDetails = this.getDetails.bind(this);
    this.getList = this.getList.bind(this);

    fetch(API_URL + "/products")
      .then(response => response.json())
      .then(data => {
        this.setState({
          products: JSON.parse(data.body),
          loadingProducts: false
        });
      });
  }

  getDetails(productId) {
    this.setState({
      showList: false,
      swowDetails: true
    });
    var product = this.state.products.find(p => p.ProductId === productId);
    this.setState({ product: product });
  }

  getList() {
    this.setState({
      showList: true,
      swowDetails: false
    });
  }

  renderProductsTable(products) {
    if (products.errorMessage) {
      return (
        <div className="errorMessage">
          <p>No data recived: Check your DB</p>
          {products.errorMessage}
        </div>
      );
    } else {
      return (
        <div className="productList">
          <table className="table table-sm table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Manufacturer</th>
                <th>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.productId + product.Name}>
                  <td>{product.Name}</td>
                  <td>{product.Manufacturer}</td>
                  <td>{product.Price}</td>
                  <td>
                    <button
                      className="btm-sm button is-light"
                      onClick={() => this.getDetails(product.ProductId)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  renderProductDetails() {
    return (
      <div className="productList">
        <button
          className="btm-sm button is-primary"
          onClick={() => {
            this.getList();
          }}
        >
          BACK TO LIST
        </button>
        <br />
        <div className="card">
          <img
            className="card-img-top center"
            src={this.state.product.PictureURL}
          ></img>
          <div className="card-body">
            <h2 className="card-title">{this.state.product.Name}</h2>
            <p className="card-text">
              Manufacturer: {this.state.product.Manufacturer}
            </p>
            <p className="card-text">Model: {this.state.product.Model}</p>
            <p className="card-text">
              Price: {this.state.product.Price} {" $"}
            </p>
            <p className="card-text">
              Description: {this.state.product.Description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // check if logged in if not return nothing
    if (this.props.auth.isAuth == true) {
      if (this.state.showList === true && this.state.swowDetails === false) {
        let content = this.state.loadingProducts ? (
          <p>...Loading</p>
        ) : (
          this.renderProductsTable(this.state.products)
        );
        return (
          <div className="center">
            <h1>List of products</h1>
            <br />
            {content}
          </div>
        );
      } else if (
        this.state.swowDetails === true &&
        this.state.showList === false
      )
        return (
          <div>
            <h1 className="center">Details</h1>
            {this.renderProductDetails(this.state.product)}
          </div>
        );
    } else return "";
  }
}
