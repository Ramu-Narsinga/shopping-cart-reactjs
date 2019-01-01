import React from 'react'
import { Table } from 'reactstrap'

//to do logic to add remove button on hover

function CartItems(props) {

    console.log("in cartItems function props", props);

    return (props.cartItemsList.shoppingItemDetails.shoppingCartItem.map((cartItem, index) =>
    // props.cartItemsList.handleMouseHover
        <tbody>
            {(cartItem.item.title) ?
                <tr key={cartItem.item.title}
                    onMouseEnter={() => {
                            props.cartItemsList.onMouseEnter();
                            props.onMouseEnter();
                        }}
                    onMouseLeave={() => {
                        props.cartItemsList.onMouseLeave();
                        props.onMouseLeave();
                    }}>
                    <td>{(cartItem.item.title) ? cartItem.item.title : ''} </td>
                    <td>{(cartItem.item.price) ? cartItem.item.price : ''}</td>
                    <td>{(cartItem.item.count) ? cartItem.item.count : ''}</td>
                    <td style={ props.hidden } onClick={() => props.onClick(cartItem, index)}>X</td>
                </tr> : ''}
        </tbody>
    )
    )
}

class AddToCart extends React.Component {

    constructor(props) {
        super(props);
        
        console.log("props in addtocart component", props);

        this.handleRemoveRowEnterButton = this.handleRemoveRowEnterButton.bind(this);
        this.handleRemoveRowLeaveButton = this.handleRemoveRowLeaveButton.bind(this);

        this.state = {
            display: "none"
        }
    }
    
    handleRemoveRowEnterButton() {
        console.log("handleRemoveRowEnterButton")
        this.setState({
            display: "block",
            cursor: "pointer" 
        })
    }

    handleRemoveRowLeaveButton() {
        console.log("handleRemoveRowLeaveButton")
        this.setState({
            display: "none"
        })
    }

    render() {
        return (
            <div>
                {(this.props.shoppingItemDetails.shoppingCartItem.length > 1) ?
                    <div><p>Shopping Cart</p>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <CartItems cartItemsList={this.props} hidden={this.state} 
                                   onMouseEnter={() => this.handleRemoveRowEnterButton()}
                                   onMouseLeave={() => this.handleRemoveRowLeaveButton()}
                                   onClick={(cartItem, index) => this.props.onClick(cartItem, index)}/>
                    </Table></div>
                    : ''}
            </div>
        )
    }
}

export default AddToCart;