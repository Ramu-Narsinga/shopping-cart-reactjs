import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './shoppingitem.css'
import img from '../images/celtics-jersey.jpg'

function ShoppingItems(props) {
    console.log("props of shopping item", props.shoppingItemsData);
    console.log("img const val", img);
    const shoppingItemsCard = props.shoppingItemsData.map((item) =>
        <div className="col-lg-3 col-md-3 col-sm-12 shopping-item-card" key={item.title.toString()}>
            <Card>
                <CardImg top width="100%" src={require(item.imgPath)} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                    <Button onClick={props.onClick(item)}>Add To Cart</Button>
                </CardBody>
            </Card>
        </div>
    )

    return (
        <div className="row">{shoppingItemsCard}</div>
    );
}

export default ShoppingItems;