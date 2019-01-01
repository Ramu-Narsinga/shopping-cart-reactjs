import React from 'react'
// import PropTypes from 'prop-types'
import './sizes.css'

function Sizes(props) {
    console.log("sizesAvailable", props)

    const sizeItems = props.sizesAvailable.map((size) =>
        <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 size-element" 
             key={size.toString()} 
             onClick={() => props.onClick(size)}>
             {size}
        </div>
    )

    return (
            <div className="row">
               <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <p><b>Size Filters</b></p>
                </div>
                {sizeItems}
            </div>
    )
}

export default Sizes;