import React from 'react';
import { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Dashboard from "./dashboard/Dashboard.js";
import io from "socket.io-client";

let socket;

class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();

    this.state = {
      senseData: [],
      temperature: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Temperature',
            data: [25,25.4,25.6,26,26.7,26.4],
          },
        ]
      },
      humidity: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Humidity',
            data: [26,26.4,26.6,27,30.7,30.0],
          },

        ]
      },
      altitude: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Altitude',
            data: [600,580.4,567,543,530.1,518.9],
          },

        ]
      },
      pressure: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Pressure',
            data: [26,26.4,26.6,27,30.7,31.4],
          },

        ]
      },
    };
  }

  // componentWillMount() {
  //   if(!socket) {
  //     socket = io('http://localhost:3001/');
  //   }
  // }

  componentDidMount() {
    if(!socket) {
      socket = io('http://localhost:3001/');
    }

    socket.on('sense', (senseData) => {
      // console.log("reading data -",senseData);
      let data = this.state.senseData;
      let temp = this.state.temperature;
      let pres = this.state.pressure;
      let alt = this.state.altitude;
      let hum = this.state.humidity;

      // console.log("temp is ",temp);
      // temp.labels.push(temp.datasets[0].data.length);
      temp.labels.push(temp.datasets[0].data.length+1);
      temp.datasets[0].data.push(parseFloat(senseData.temp));
      console.log("app.js - temp is", senseData.temp);
      pres.push(senseData.pres);
      alt.push(senseData.alt);
      hum.push(senseData.hum);

      data.push(senseData);
      this.setState({
        senseData: data,
        temperature: temp,
        pressure: pres,
        altitude: alt,
        humidity: hum
      });
      this.myRef.current.updateTemp();
      // console.log(this.state.temperature.datasets.data);
    });
  }

  render() {
    // console.log(this.state.senseData[this.state.senseData.length-1] && this.state.senseData[this.state.senseData.length-1].temp);
    return (
      <div className="App">
        <Dashboard
          senseData={this.state.senseData}
          temperature={this.state.temperature}
          pressure={this.state.pressure}
          altitude={this.state.altitude}
          humidity={this.state.humidity}
          ref={this.myRef}
          // recent={this.state.senseData[this.state.senseData.length-1]}
        />

      </div>
    );
  }
}

export default App;


// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
