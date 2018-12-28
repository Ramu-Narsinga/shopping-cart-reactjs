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
      shoppingCartItem: [{
        item: {}
      }]
    }

    this.handleShoppingItemCardClick = this.handleShoppingItemCardClick.bind(this)
    this.handleSizeClick = this.handleSizeClick.bind(this);
    this.addToCartElement = null;
  }

  handleSizeClick(size) {
    console.log("this is size:", size);
  }

  handleShoppingItemCardClick(item) {
    const prevState = this.state.shoppingCartItem;
    const titleArray = [];
    console.log("clicked item is:", item);
    console.log("prevState", prevState);

    //allow this once on undefined title logic
    if (prevState[0].item.title == undefined && prevState.length == 1) {
      console.log("this shoudl appear only once");
      this.setState({ shoppingCartItem: prevState.concat([{ item: item }]) }, () => {
        console.log("this.state callback success", this.state);
        //iterate over prevState array and repetitive clicked item should not get added
        for (var i = 0; i < this.state.shoppingCartItem.length; i++) {
          if (this.state.shoppingCartItem[i].item != undefined) {
            titleArray.push(this.state.shoppingCartItem[i].item.title)
          }
        }

        console.log("titleArray", titleArray);
      })
    }

    for (var i = 1; i < prevState.length; i++) {
      if (prevState[i].item.title) {
        console.log("titleArray.indexOf(prevState[i].item.title)", titleArray.indexOf(prevState[i].item.title));
        if (titleArray.indexOf(prevState[i].item.title) > -1 || titleArray.indexOf(prevState[i].item.title) == "undefined") {
          this.setState({ shoppingCartItem: prevState.concat([{ item: item }]) }, () => {
            console.log("this.state callback success", this.state);
          })
        } else {
          console.log("item got clicked again");
        }
      }
    }
    this.addToCartElement = <AddToCart shoppingItemDetails={item} />
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 sizes-class">
            <Sizes
              sizesAvailable={sizesAvailable}
              onClick={(size) => this.handleSizeClick(size)}
            />
          </div>
          <div className="col-md-9 shopping-item-class">
            <ShoppingItems
              shoppingItemsData={shoppingItemsData}
              onClick={(item) => this.handleShoppingItemCardClick(item)}
            />
          </div>
        </div>
        <div className="cart-list">
          {(this.state.shoppingCartItem) ? this.addToCartElement : ''}
        </div>
      </div>
    );
  }
}

export default App;
