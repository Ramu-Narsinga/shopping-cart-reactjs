import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sizes from './components/sizes.js'
import ShoppingItems from './components/shoppingitem.js'
import AddToCart from './components/addtocart.js'

const sizesAvailable = ["L", "M", "S", "XL", "XM", "XS", "XXL"]
const shoppingItemsData = [
  {
    imgPath: 'celticsjersey',
    title: 'Celtics Jersey',
    price: '$15'
  }, {
    imgPath: 'bball',
    title: 'Basketball',
    price: '$12'
  }, {
    imgPath: 'macbook',
    title: 'MacBook Pro',
    price: '$2400'
  }
]

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      item:'abc'
    }
    // this.handleSizeClick = this.handleSizeClick.bind(this);
  }
  
  handleSizeClick() {
    console.log("this is size:", this);
  }

  handleShoppingItemCardClick() {
    console.log("clicked item is:", this);
    this.setState({item:'abc'})
    console.log("this.state", this.state);
  }

  _renderAddToCartComponent() {
    console.log("this.state", this.state);
    return <AddToCart />
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 sizes-class">
            <Sizes
              sizesAvailable={sizesAvailable}
              onClick={(size) => this.handleSizeClick.bind(size)}
            />
          </div>
          <div className="col-md-9 shopping-item-class">
            <ShoppingItems
              shoppingItemsData={shoppingItemsData}
              onClick={(item) => this.handleShoppingItemCardClick.bind(item, this)}
            />
          </div>
        </div>
        {this._renderAddToCartComponent()}
      </div>
    );
  }
}

export default App;
