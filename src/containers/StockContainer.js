import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    const allStocks = this.props.stocks.map(stock => {
      return <Stock stockData={stock} handleStockOnClick={this.props.handleStockOnClick} key={`stock_${stock.id}`} />
    })

    return (
      <div id={"stocks-container"} >
        <h2>Stocks</h2>
        {
          allStocks
        }
      </div>
    );
  }

}

export default StockContainer;
