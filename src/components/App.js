import React, { Component } from 'react';
import "react-bootstrap";
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
import axios from 'axios'
// import CoinData from '../Api/api';
import Chart from "chart.js";
import "./App.css"




class App extends Component {

  async componentWillMount() {
    await this.getData();

    

  }


   drawChart = (bitcoins, bitDates) => {
     
    // Chart
    const ctx = document.getElementById('myChart').getContext('2d');

 

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: bitDates,
        datasets: [{
          label: 'BitCoin Price Index',
          data: bitcoins,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          tension: 0,
          pointHoverRadius: 3,
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              min: 750,
            },
          }],
        },
      },
    });
  };

   paintValues = (arr) => {
    document.querySelector('#max').innerHTML = Math.max(...arr);
    document.querySelector('#min').innerHTML = Math.min(...arr);
  };
  //getting bitcoin chart data

   ajaxBitcoinRequest = () => {
    const bitCoinInfo = axios.create({
      baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
    });
  
    bitCoinInfo.get()
      .then((bitcoinData) => {
        console.log('THIS IS THE BITCOUN DATA: ', bitcoinData)
        const data = bitcoinData.data.bpi;
        this.drawChart(Object.values(data), Object.keys(data));
        this.paintValues(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      "url": "https://coinpaprika1.p.rapidapi.com/global",
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
      loading: true,
      filter: true
    }
  }

  filterBy = (event) => {
    console.log('ENTRO EN FILTER BY : ', event)

    switch(event) {
      case "rank":
        // code block
   
        this.filterByRank()
  
        break;
      case "symbol":
        // code block

        this.filterBySymbol()
        break;

        case "name":
          this.filterByName()
          break;

          case "price":
            this.filterByPrice()

            break;

            case "cap":
              this.filterByCap()
              break;

              
      default:
        this.setState({
          ccData: this.state.ccData.sort((a, b) => a.rank - b.rank)
        })
    }


  }
  filterByFifteen = () => {
    if(this.state.filter){
      this.setState({
        ccData: this.state.ccData.sort((a,b) =>   a.quotes.USD.percent_change_15m - b.quotes.USD.percent_change_15m)
      });

      this.setState({
        filter: false
      });

    }else{
      this.setState({
        ccData: this.state.ccData.sort((a,b) =>   b.quotes.USD.percent_change_15m - a.quotes.USD.percent_change_15m)
      });

      this.setState({
        filter: true
      });
    }


  }

  filterByThirty = () => {
    this.setState({
      ccData: this.state.ccData.sort((a,b) =>   b.quotes.USD.percent_change_30m - a.quotes.USD.percent_change_30m)
    });
  }

  filterByHour = () => {
    this.setState({
      ccData: this.state.ccData.sort((a,b) =>   b.quotes.USD.percent_change_1h - a.quotes.USD.percent_change_1h)
    });
  }

  filterByDailyVol = () => {

  }
  render() {
    return (
      <div className="" >
        <nav id="nav" className="navbar  fixed-top  flex-md-nowrap  shadow text-monospace text-white ">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0 pl-4"
            
            href="http://www.ai-nomads.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nomad Tracker

            
          </a>
          
          {this.state.loading ? <div id="loader" className="nav-item text-nowrap d-none d-sm-none d-sm-block">Loading...</div> :
            <li className="nav-item mainColor text-nowrap d-none d-sm-none d-sm-block pr-4 ">
              <small className="mainColor">GCM:</small>&nbsp;$
              <a
                className="mainColor"
                href="https://coinpaprika.com/market-overview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {(this.state.ccGlobalMcap).toLocaleString("fr-CH")}
              </a>&nbsp;
            </li>
          }
        </nav>

        <div className="container-fluid">

        <h1 className="header pt-3">Nomad Crypto Tracker</h1>
         <h2 className="textCenter pt-5"> <button onClick={this.ajaxBitcoinRequest} id="btn-bitcoin" className="btn btn-danger hoverEffect " >Click Here to get Nomad Bitcoin Graph</button></h2>
          


    <canvas id="myChart" className="pb-5" width="400" height="150px"></canvas>
        </div>

      
        <div className="container-fluid ">
          


          
          <div className="row pb-3">
            
            <div className="col-md-3 subHeader">
            <h5>Filter By</h5>
            </div>
            {/* <div className="col-md-3">
            <button onClick= {this.filterByFifteen}>Percent Change(15)</button>
            </div> */}
            <div className="col-md-3">
            <button onClick= {this.filterByThirty}>Percent Chane(30)</button>
            </div>
            <div className="col-md-3">
            <button onClick= {this.filterByHour}>Percent Chane(1h)</button>
            </div>
          </div>
          <div className="row">
            <h2 className="col-md-12 textCenter">Click on Row name to filter</h2>
            <main role="main" className="col-lg-12 d-flex text-center">
              <table className="table table-striped table-hover table-fixed table-bordered text-monospace">
                {/* <caption>Data Source:
                      <a target="_blank" rel="noopener noreferrer" href="https://coinpaprika.com/">coinpaprika</a>
                </caption> */}
                <thead className="thead-dark">
                  <tr>
                  
                    <th className="hoverEffect" onClick= {e => this.filterBy("rank")} value="rank"  scope="col">Rank</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("symbol")} scope="col">Symbol</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("name")} scope="col">Name</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("price")} scope="col">Price</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("cap")} scope="col">Market Cap</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("percentChange15")} scope="col">Percent Change(15m)</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("percentChange30")} scope="col">Percent Change(30m)</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("percentChange1h")} scope="col">Percent Change(1h)</th>
                    <th className="hoverEffect" onClick= {e => this.filterBy("dailyVolume")} scope="col">24 vol change)</th>


                  </tr>
                </thead>
        
   
                <tbody className="tableBody">
                  {this.state.ccData.map((data, key) => {

                    
                    return (
                      <tr key={key}>
                        <td>{data.rank}</td>
                        <td>{data.symbol}</td>
                        <td><a target="_blank" rel="noopener noreferrer" href={"https://coinpaprika.com/coin/" + data.id}>{data.name}</a></td>
                        <td>${(data.quotes.USD.price).toFixed(2)}</td>
                        ${(data.quotes.USD.market_cap.toLocaleString())}
                        {/* <td>$</td> */}
                        <td>{data.quotes.USD.percent_change_15m}%</td>
                        <td>{data.quotes.USD.percent_change_30m}</td>
                        <td>{data.quotes.USD.percent_change_1h}</td>
                        <td>{data.quotes.USD.volume_24h_change_24h}</td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
                
              </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;