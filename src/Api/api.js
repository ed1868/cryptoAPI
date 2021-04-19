import axios from "axios";


class CoinData {
    constructor() {
        this.service = getExchangeData();

        
        


    //getting&setting cryptocurrencies data
    getExchangeData = () => {


        //GET EXCHANGE DATA 

        let exchangesIds = ["binance", "coinbase-pro", "gemini"];
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
                console.log(`FIRST PAYLOAD of cup: ${payload}`)
            return payload;

        }).catch((err) => {
            if (err) {
                console.log('WE HAVE AN ERROR ', err);
            }
        })

    }


    getCurrencyData = ()=> {
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
    }

    getCurrencyMarketData = () => {

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
}

export default CoinData;


// import axios from 'axios'
// import Chart from "chart.js";



// const ajaxBitcoinRequest = () => {
//   const bitCoinInfo = axios.create({
//     baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
//   });

//   bitCoinInfo.get()
//     .then((bitcoinData) => {
//       const data = bitcoinData.data.bpi;
//       drawChart(Object.values(data), Object.keys(data));
//       paintValues(Object.values(data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// const bitcoinDataClickHandler = () => ajaxBitcoinRequest();


// document.getElementById('btn-bitcoin').onlick = bitcoinDataClickHandler;


// let drawChart = (bitcoins, bitDates) => {
//   // Chart
//   const ctx = document.getElementById('myChart').getContext('2d');
//   const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: bitDates,
//       datasets: [{
//         label: 'BitCoin Price Index',
//         data: bitcoins,
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         fill: false,
//         tension: 0,
//         pointHoverRadius: 3,
//         borderWidth: 1,
//       }],
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: false,
//             min: 750,
//           },
//         }],
//       },
//     },
//   });
// };

// let getDatesData = () => {
//   const dateFrom = document.querySelector('#date-from').value;
//   const dateTo = document.querySelector('#date-to').value;
//   return [dateFrom, dateTo];
// };

// let getCurrentData = () => {
//   let currency = document.querySelector('#currency-selector').value;
//   return currency
// }

// let paintValues = (arr) => {
//   document.querySelector('#max').innerHTML = Math.max(...arr);
//   document.querySelector('#min').innerHTML = Math.min(...arr);
// };


// document.getElementById('date-to').onchange = () => {
//   const arr = getDatesData();
//   const dateFrom = arr[0];
//   const dateTo = arr[1];

//   axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`)
//     .then((bitcoinData) => {
//       const data = bitcoinData.data.bpi;
//       drawChart(Object.values(data), Object.keys(data));
//       paintValues(Object.values(data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// document.getElementById('currency-selector').onchange = () => {
//   const curr = getCurrentData();
//   const arr = getDatesData();
//   const dateFrom = arr[0];
//   const dateTo = arr[1];
//   axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${curr}`)
//     .then((bitcoinData) => {
//       const data = bitcoinData.data.bpi;
//       drawChart(Object.values(data), Object.keys(data));
//       paintValues(Object.values(data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
