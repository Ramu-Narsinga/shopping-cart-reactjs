import React from 'react'

function CartItems(props) {

    console.log("in cartItems function props", props);

    return (props.cartItemsList.map((cartItem) =>
        <div key={cartItem.title}>title:{(cartItem.title) ? cartItem.title : 'N/A'} <br />
            price:{(cartItem.price) ? cartItem.price : 'N/A'}
        </div>
    )
    )
}

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in addtocart component", props);
    }

    render() {
        return (
            <div> <CartItems cartItemsList={[this.props.shoppingItemDetails]} /></div >
            // <ul>{cartItems}</ul>
            // <div>name:{props.shoppingItemDetails.item.title}</div>
        )
    }
}

export default AddToCart;