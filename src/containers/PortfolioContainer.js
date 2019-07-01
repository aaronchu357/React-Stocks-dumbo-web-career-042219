import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {
  
  render() {
    // debugger
    const allStocksInPortfolio = this.props.stockInPortfolio.map(stock => {
      return <Stock stockData={stock.stockData} handleStockOnClick={this.props.handleStockOnClick} key={`stock_${stock.stockData.id}`}/>
    })
    return (
      <div id={"portfolio-container"}>
        <h2>My Portfolio</h2>
          {
            allStocksInPortfolio
          }
      </div>
    );
  }

}

export default PortfolioContainer;
