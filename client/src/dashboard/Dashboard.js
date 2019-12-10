import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData:{
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    };

    // console.log(this.props);

  };

  updateTemp() {
    let tempchart = this.reference.chartInstance;
    tempchart.update();
  }

  render() {
    let recentData = this.props.senseData[this.props.senseData.length-1];
    // console.log("recent data", recentData[0]);
    // console.log(this.props.recent.temp);

    let currTemp = recentData && recentData.temp;
    let currPres = recentData && recentData.pres;
    let currAlt = recentData &&  recentData.alt;
    let currHum = recentData && recentData.hum;
    // console.log(currTemp,currPres,currAlt,currHum);
    console.log(this.props.temperature);

    // <ul>
    //   {(this.props.senseData).map(element =>
    //     <li>{JSON.stringify(element)}</li>
    //   )}
    // </ul>

    const TempGraph = (props) => {
      return ;
    };

    return (
      <div className="container-fluid">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col">
            Temperature: {currTemp}°C
          </div>
          <div className="col">
            Pressure: {currPres} hPa
          </div>
          <div className="col">
            Altitude: {currAlt} m
          </div>
          <div className="col">
            Humidity: {currHum} %
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>{JSON.stringify(recentData)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Line id="myTemp"
              data={this.props.temperature}

              options={{
                title: {
                  display: true,
                  text: 'Temperature',
                  fontSize: '20'
                },
                legend: {
                  display: true,
                  position: 'right'
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
            <Line id="myHum"
              data={this.props.humidity}

              options={{
                title: {
                  display: true,
                  text: 'Humidity',
                  fontSize: '20'
                },
                legend: {
                  display: true,
                  position: 'right'
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
          <div className="col">
            <Line id="myAlt"
              data={this.props.altitude}

              options={{
                title: {
                  display: true,
                  text: 'Altitude',
                  fontSize: '20'
                },
                legend: {
                  display: true,
                  position: 'right'
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
            <Line id="myPress"
              data={this.props.pressure}

              options={{
                title: {
                  display: true,
                  text: 'Pressure',
                  fontSize: '20'
                },
                legend: {
                  display: true,
                  position: 'right'
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>


        </div>
      </div>
    )
  }
}

export default Dashboard;



// <Line
//   ref = {(reference) => this.reference = reference}
//   data={this.state.chartData}
//
//   options={{
//     title: {
//       display: true,
//       text: 'Largest Cities',
//       fontSize: '20'
//     },
//     legend: {
//       display: true,
//       position: 'right'
//     },
//     responsive: false
//   }}
// />
