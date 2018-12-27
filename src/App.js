import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sizes from './components/sizes.js'
import ShoppingItems from './components/shoppingitem.js'

const sizesAvailable = ["L", "M", "S", "XL", "XM", "XS", "XXL"]
const shoppingItemsData = [
  {
    imgPath: '../../images/celtics-jersey.jpg',
    title: 'Celtics Jersey',
    price: '$15'
  }, {
    imgPath: '../../images/bball.jpeg',
    title: 'Basketball',
    price: '$12'
  }, {
    imgPath: '../../images/macbook.jpg',
    title: 'MacBook Pro',
    price: '$2400'
  }
]

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSizeClick(size) {
    console.log("this is:", this);
  }

  handleShoppingItemCardClick(item) {
    console.log("clicked item is:", this);
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
              onClick={(item) => this.handleShoppingItemCardClick.bind(item)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
