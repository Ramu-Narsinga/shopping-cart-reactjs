import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sizes from './components/sizes.js'
import ShoppingItems from './components/shoppingitem.js'
import AddToCart from './components/addtocart.js'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { Popover, OverlayTrigger, Button, ButtonToolbar } from 'react-bootstrap';
import { createStore } from 'redux'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

const sizesAvailable = ["L", "M", "S", "XL", "XM", "XS", "XXL"]
const shoppingItemsData = [
  {
    imgPath: 'celticsjersey',
    title: 'Celtics Jersey',
    size: 'M',
    price: '$15',
    count: 1
  }, {
    imgPath: 'bball',
    title: 'Basketball',
    size: 'L',
    price: '$12',
    count: 1
  }, {
    imgPath: 'macbook',
    title: 'MacBook Pro',
    size: 'XL',
    price: '$2400',
    count: 1
  }
]

function isEmpty(obj) {
  if (obj.title == undefined) {
    return false;
  }
  return true;
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.handleShoppingItemCardClick = this.handleShoppingItemCardClick.bind(this);
    this.handleSizeClick = this.handleSizeClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

    this.state = {
      shoppingCartItem: [{
        item: {}
      }],
      isHovering: false,
      titleArray: [],
      searchValue: '',
      shoppingItemsData: shoppingItemsData,
      prevState: []
    }
  }

  handleSizeClick(size, state) {
    console.log("this is size:", size, "state:", state);
    // var FilteredList = React.createClass({
    //   filterList: function(event){
    //     var updatedList = this.state.initialItems;
    //     updatedList = updatedList.filter(function(item){
    //       return item.toLowerCase().search(
    //         event.target.value.toLowerCase()) !== -1;
    //     });
    //     this.setState({items: updatedList});
    //   },
    //   getInitialState: function(){
    //      return {
    //        initialItems: [
    //          "Apples",
    //          "Broccoli",
    //          "Chicken",
    //          "Bacon",
    //          "Eggs",
    //          "Salmon",
    //          "Granola",
    //          "Bananas",
    //          "Beer",
    //          "Wine",
    //          "Yogurt"
    //        ],
    //        items: []
    //      }
    //   },
    //   componentWillMount: function(){
    //     this.setState({items: this.state.initialItems})
    //   },
    //   render: function(){
    //     return (
    //       <div className="filter-list">
    //         <input type="text" placeholder="Search" onChange={this.filterList}/>
    //       <List items={this.state.items}/>
    //       </div>
    //     );
    //   }
    // });
    // console.log("this.state for size filter", this.state)
  }

  handleShoppingItemCardClick(item) {

    const prevState = this.state.shoppingCartItem;
    console.log("clicked item is:", item);
    console.log("prevState", prevState);
    const titleArray = this.state.titleArray;


    if (titleArray.indexOf(item.title) == -1 && this.state.shoppingCartItem.title == undefined) {

      this.setState({ shoppingCartItem: prevState.concat([{ item: item }]) }, () => {

        console.log("this.state callback success", this.state);

        //remove titleArray elements to make a new state elements title push
        if (titleArray.length > 0) {
          titleArray.splice(0, titleArray.length);
          this.setState({
            titleArray: titleArray
          })
        }

        //iterate over prevState array and repetitive clicked item should not get added
        for (var i = 0; i < this.state.shoppingCartItem.length; i++) {
          console.log("this.state.shoppingCartItem[i].item", this.state.shoppingCartItem[i].item)

          if (isEmpty(this.state.shoppingCartItem[i].item)) {
            titleArray.push(this.state.shoppingCartItem[i].item.title)
          }
        }
        if (titleArray.length > 0) {
          this.setState({
            titleArray: titleArray
          })
        }

        console.log("titleArray", titleArray);

      })
    } else {
      console.log("item already exists in cart element, please update counter for consecutive clicks-item::", item, "this.state", this.state);
      //todo--iterate over setstate shoppingCartItem and check for item prop match and setsstate for update counter
      for (var i = 0; i < prevState.length; i++) {
        if (prevState[i].item.title == item.title) {
          //update count and set
          console.log("this.state.shoppingCartItem[i].item.count", this.state.shoppingCartItem[i].item.count);
          this.state.shoppingCartItem[i].item.count = this.state.shoppingCartItem[i].item.count + 1;
          this.setState({
            shoppingCartItem: [
              ...this.state.shoppingCartItem.slice(0, i),
              Object.assign({}, this.state.shoppingCartItem[i], this.state.shoppingCartItem[i].item.count),
              ...this.state.shoppingCartItem.slice(i + 1)
            ]
          }, () => {
            console.log("clicked again count is successfully updated and state after update is::", this.state);
          })

        }
      }
    }
    console.log("this.state sent to addToCartElement", this.state);

  }

  handleMouseHover() {
    console.log("this.state in handleMouseHover", this.state);
    this.setState(this.toggleHoverState, () => {
      console.log("this.state in handleMouseHover", this.state);
    });
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  handleRemoveItem(cartItem, index) {
    const prevState = this.state.shoppingCartItem;
    const titleArray = this.state.titleArray;
    console.log("titleArray in handleRemoveItem", titleArray);

    for (var i = 0; i < titleArray.length; i++) {
      if (titleArray[i] == cartItem.title) {
        titleArray.splice(i, 1);
      }
    }
    console.log("handleRemoveItem::", cartItem, "index::", index, "prevState::", prevState, "titleArray::", titleArray);
    const toBeRemovedIndex = index;
    if (toBeRemovedIndex >= 1) {
      prevState.splice(toBeRemovedIndex, 1)
      this.setState({
        shoppingCartItem: prevState,
        titleArray: titleArray
      })
    }
  }

  handleSearchInputChange(event) {
    console.log("handleSearchInputChange", event.target.value, "this.state.shoppingItemsData in search change function", this.state.shoppingItemsData)
    this.setState({ searchValue: event.target.value });
    const indexArray = [];

    if (event.target.value.length == 0) {
      var allElements = this.state.shoppingItemsData;
    }

    var updatedList = this.state.shoppingItemsData;

    // apply the filter logic and update the shopping cart items
    if (event.target.value.length > 0) {
      // console.log("this.state.shoppingItemsData", this.state.shoppingItemsData);
      updatedList = updatedList.map((item, index) => {

        if (item.title.toLowerCase().search(event.target.value.toLowerCase()) > -1) {
          console.log("updatedList array for filter, MATCH FOUND", item, "props if class shoppingitems, INDEX::", index);
          return item;
        } else {
          indexArray.push(index)
          return index;
        }

      })

      console.log("final updated list based on map function", updatedList, "indexArray", indexArray);

      //iterate over indexArray and splice updatedList array with index from indexArray
      for (var i = 0; i < indexArray.length; i++) {
        console.log("updatedList in for splicing", updatedList)

        //after splice reduce array number by one to avoid inconsistency
        if (indexArray[i] > 0 && i != 0) {
          indexArray[i] = indexArray[i] - 1;
        }

        updatedList.splice(indexArray[i], 1);

      }

      console.log("after splice updatedList::", updatedList);

      this.setState({
        shoppingItemsData: updatedList
      }, () => {
        console.log("this.setstate after search filter call back", this.state.shoppingItemsData);
      })
    } else {
      console.log("seacrh is empty", shoppingItemsData);
      //if search is empty show all item cards
      const showAll = shoppingItemsData
      this.setState({
        shoppingItemsData: showAll
      }, () => {
        console.log("this.setstate after search filter call back is search empty case", this.state.shoppingItemsData);
      })
    }
  }

  render() {
    // You can use subscribe() to update the UI in response to state changes.
    // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
    // However it can also be handy to persist the current state in the localStorage.

    store.subscribe(() => console.log(store.getState()))

    // The only way to mutate the internal state is to dispatch an action.
    // The actions can be serialized, logged or stored and later replayed.
    store.dispatch({ type: 'INCREMENT' })
    // 1
    store.dispatch({ type: 'INCREMENT' })
    // 2
    store.dispatch({ type: 'DECREMENT' })
    // 1
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-3 col-sm-3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Search</InputGroupText>
              </InputGroupAddon>
              <Input value={this.state.searchValue} onChange={(event) => this.handleSearchInputChange(event)} />
            </InputGroup>
            {/* <Sizes
              sizesAvailable={sizesAvailable}
              onClick={(size) => this.handleSizeClick(size, this.state)}
            /> */}
          </div>
          <div className="col-md-9 col-sm-9 shopping-item-class">
            <ShoppingItems
              className="row"
              shoppingItemsData={this.state.shoppingItemsData}
              onClick={(item) => this.handleShoppingItemCardClick(item)}
            />
          </div>
        </div>

        <div className="cart-list">
          {(this.state.shoppingCartItem) ? <AddToCart
            shoppingItemDetails={this.state}
            onMouseEnter={() => this.handleMouseHover()}
            onMouseLeave={() => this.handleMouseHover()}
            onClick={(cartItem, index) => this.handleRemoveItem(cartItem, index)} /> : ''}
        </div>
      </div>
    );
  }
}

export default App;
