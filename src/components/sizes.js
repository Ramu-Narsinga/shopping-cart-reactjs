import React from 'react'
// import PropTypes from 'prop-types'
import './sizes.css'

function Sizes(props) {
    console.log("sizesAvailable", props.sizesAvailable)

    const sizeItems = props.sizesAvailable.map((size) =>
        <li key={size.toString()} onClick={props.onClick(size)}>{size}</li>
    )
    return (
        <ul>{sizeItems}</ul>
    )
}

export default Sizes;