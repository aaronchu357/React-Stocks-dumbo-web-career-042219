import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const API = `http://localhost:3000/stocks`

class MainContainer extends Component {

  state = {
    allStocks: [],
    stockInPortfolio: [],
    filterAIsChecked: null,
    filterPIsChecked: null
  }

  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(stocks => {
        this.setState({ allStocks: stocks })
      })
  }

  handleStockOnClick = (e, stockInfo) => {
    let stateOfStockInPortfolio = this.state.stockInPortfolio
    if (e.currentTarget.parentElement.id === "stocks-container") {
      stateOfStockInPortfolio.find(stock => stock.stockData.id === parseInt(e.currentTarget.id, 10)) ?
        alert('Already Bought!')
        :
        this.setState({ stockInPortfolio: [...stateOfStockInPortfolio, stockInfo] })
    } else if (e.currentTarget.parentElement.id === "portfolio-container") {
      let removedStockInPortfolio = stateOfStockInPortfolio.filter(stock => {
        return stock.stockData.id !== parseInt(e.currentTarget.id, 10)
      })
      this.setState({ stockInPortfolio: removedStockInPortfolio })
    }
  }

  handleOnAlphaClick = () => {
    let sorted = this.state.allStocks.sort((a, b) => a.name.localeCompare(b.name))
    return this.state.filterAIsChecked ?
      null
      :
      this.setState({
        allStock: sorted,
        filterAIsChecked: true,
        filterPIsChecked: false
      })
  }


  handleOnPriceClick = () => {
    let sorted = this.state.allStocks.sort((a, b) => b.price - a.price)
    return this.state.filterPIsChecked ?
      null
      :
      this.setState({
        allStock: sorted,
        filterPIsChecked: true,
        filterAIsChecked: false
      })
  }

  handleOnFilterChange = (e) => {
    let typeFilter = e.target.value
    typeFilter === "All" ?
      fetch(API)
        .then(resp => resp.json())
        .then(stocks => {
          this.setState({ allStocks: stocks })
        })
      :
      fetch(API)
        .then(resp => resp.json())
        .then(stocks => {
          let filteredStocks = stocks.filter(stock => stock.type === typeFilter)
          this.setState({ allStocks: filteredStocks })
        })
  }

  render() {
    return (
      <div>
        <SearchBar handleOnAlphaClick={this.handleOnAlphaClick} handleOnPriceClick={this.handleOnPriceClick} filterAIsChecked={this.state.filterAIsChecked} filterPIsChecked={this.state.filterPIsChecked} handleOnFilterChange={this.handleOnFilterChange} />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={this.state.allStocks} handleStockOnClick={this.handleStockOnClick} />

          </div>
          <div className="col-4">

            <PortfolioContainer stockInPortfolio={this.state.stockInPortfolio} handleStockOnClick={this.handleStockOnClick} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
