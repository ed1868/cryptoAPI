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
