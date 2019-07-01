import React from 'react'

const Stock = (props) => {
  return (
    <div id={props.stockData.id} onClick={e => props.handleStockOnClick(e, props)} >

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{
            props.stockData.name
          }</h5>
          <p className="card-text">{
            props.stockData.price
          }</p>
        </div>
      </div>


    </div>
  )
};

export default Stock
