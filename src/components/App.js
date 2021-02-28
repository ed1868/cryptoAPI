import React, { Component } from 'react';
import chart from '../logos/chart.png';
import btc from '../logos/btc.png';
import eth from '../logos/eth.png';
import link from '../logos/link.png';
import ada from '../logos/ada.png';
import xmr from '../logos/xmr.png';
import yfi from '../logos/yfi.png';
import lend from '../logos/lend.png';
import comp from '../logos/comp.png';
import uni from '../logos/uni.png';
import gnt from '../logos/gnt.png';

import "./App.css"

const axios = require("axios");

class App extends Component {

  async componentWillMount() {
    await this.getData()
  }

  //getting&setting cryptocurrencies data
  getData = () => {


    //GET EXCHANGE DATA 

    let exchangesIds = ["binance","coinbase-pro","gemini"];
    axios({
      "method": "GET",
      "url": `https://coinpaprika1.p.rapidapi.com/exchanges/${exchangesIds[0]}/markets`,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
        "x-rapidapi-key": "69225c48e9msh6187f24c67061afp1b10f8jsnad7cfe59d33c",
        "useQueryString": true
      }
    }).then((payload) => {

      console.log('THE EXCHANGE DATA : ', payload)

    }).catch((err) => {
      if (err) {
        console.log('WE HAVE AN ERROR ', err);
      }
    })
    //getting ccurencies data
    axios({
      "method": "GET",
      "url": "https://coinpaprika1.p.rapidapi.com/tickers",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
        "x-rapidapi-key": "69225c48e9msh6187f24c67061afp1b10f8jsnad7cfe59d33c",
        "useQueryString": true
      }
    })
      .then((response) => {
        //assign all ccurencies data from API into variable
        const coins = response.data

        console.log('ALL THE COINS : ', coins)
        //declare ccurencies and their imgs
        const ccArray = [
          // { name: 'Bitcoin', img: btc },
          // { name: 'Ethereum', img: eth },
          // { name: 'Chainlink', img: link },
          // { name: 'Cardano', img: ada },
          // { name: 'Monero', img: xmr },
          // { name: 'yearn.finance', img: yfi },
          // { name: 'Aave', img: lend },
          // { name: 'Compound', img: comp },
          // { name: 'Uniswap', img: uni },
          // { name: 'Golem', img: gnt }
        ]

        /* search for chosen cryptocurrencies, then add them to the state */
        //get ccurency from ccArray 

        
        
          //get ccurrency from API
          for (let i = 0; i < coins.length; i++) {
            //if current ccurrency API == current ccurrency from ccArray
            // if (coins[i].name === ccArray[j].name) {
              //add img to the ccurrency API data
              // coins[i]['img'] = ccArray[j].img
              //set state with updated data
              // this.setState({
              //   ccData: [...this.state.ccData, coins[i]]
              this.state.ccData.push(coins[i])
              // })
            // }
          }
        
        //sort ccurrencies by rank
        this.setState({
          ccData: this.state.ccData.sort((a, b) => a.rank - b.rank)
        })
      })
      .catch((error) => {
        console.log(error)
      })

    //getting ccurrency market data
    axios({
      "method": "GET",
      "url": "https://coinpaprika1.p.rapidapi.com/exchanges",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
        "x-rapidapi-key": "69225c48e9msh6187f24c67061afp1b10f8jsnad7cfe59d33c",
        "useQueryString": true
      }
    })
      .then((response) => {
        const globalData = response.data
        console.log('THIS IS THE Exchanges DATA : ', globalData)
        this.setState({ loading: true })
        //set state with updated global ccurency market cap
        this.setState({ ccGlobalMcap: globalData.market_cap_usd })
        this.setState({ loading: false })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      ccData: [],
      ccGlobalMcap: '',
      loading: true
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap  shadow text-monospace text-white ">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0 pl-4"
            
            href="http://www.ai-nomads.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nomad Tracker

            
          </a>
          <img src={chart} width="30" height="30" className="d-inline-block align-top" alt="" />
          {this.state.loading ? <div id="loader" className="nav-item text-nowrap d-none d-sm-none d-sm-block">Loading...</div> :
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block pr-4">
              <small>GCM:</small>&nbsp;$
              <a
                className="text-white"
                href="https://coinpaprika.com/market-overview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* {(this.state.ccGlobalMcap).toLocaleString("fr-CH")} */}
              </a>&nbsp;
            </li>
          }
        </nav>
        &nbsp;
        <div className="container-fluid mt-5 pt-5">
          <h1 className="header">Nomad Crypto Tracker</h1>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <table className="table table-striped table-hover table-fixed table-bordered text-monospace">
                <caption>Data Source:
                      <a target="_blank" rel="noopener noreferrer" href="https://coinpaprika.com/">coinpaprika</a>
                </caption>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Symbol</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Market Cap</th>
                    <th scope="col">Percent Change(15m)</th>
                    <th scope="col">Percent Change(30m)</th>
                    <th scope="col">Percent Change(1h)</th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.ccData.map((data, key) => {

          
                    return (
                      <tr key={key}>
                        <td>{data.rank}</td>
                        <td>{data.symbol}</td>
                        <td><a target="_blank" rel="noopener noreferrer" href={"https://coinpaprika.com/coin/" + data.id}>{data.name}</a></td>
                        <td>${(data.quotes.USD.price).toFixed(2)}</td>
                        {/* ${(data.quotes.USD.market_cap).toLocaleString("fr-CH")} */}
                        <td>$</td>
                        <td>{data.quotes.USD.percent_change_15m}</td>
                        <td>{data.quotes.USD.percent_change_30m}</td>
                        <td>{data.quotes.USD.percent_change_1h}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
                }
              </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;