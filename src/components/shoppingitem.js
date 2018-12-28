import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'
import './shoppingitem.css'
import bball from '../images/bball.jpeg'
import celticsjersey from '../images/celtics-jersey.jpg'
import macbook from '../images/macbook.jpg'

const imageArray = [celticsjersey, bball, macbook];

function ShoppingItems(props) {
    
    console.log("props of shopping item", props.shoppingItemsData);
    for (var i=0; i<props.shoppingItemsData.length; i++) {
        console.log("image array", imageArray[i]);
        props.shoppingItemsData[i].imgPath = imageArray[i];
    }
    const shoppingItemsCard = props.shoppingItemsData.map((item) =>
        <div className="col-lg-3 col-md-3 col-sm-12 shopping-item-card" key={item.title.toString()}>
            <Card>
                <CardImg top width="100%" src={item.imgPath} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    <CardSubtitle>Price: {item.price}</CardSubtitle>
                    {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
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