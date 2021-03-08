import React from 'react';
import './App.css';
const axios = require("axios");
const cheerio = require("cheerio")

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amt : 0, ga:0}
  }

  componentDidMount() {
    this.tick()
  }

  componentWillUnmount() {

  }

  tick () {
    console.log("Ticking")
    console.log(this.state.amt)
    const url = "https://uk.virginmoneygiving.com/fundraiser-portal/fundraiserPage?pageId=1261109"
    const fetchData = async () => {
      const result = await axios.get(url);
      return cheerio.load(result.data);
    };
    const data = fetchData().then((res) => {
      const raised = res("#totalDonationInputHidden")[0].attribs.value;
      this.setState({amt : raised})
      var t = this
      setTimeout(function () {t.tick()}, 60000)
      //this.tick()
    });
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>
              £{this.state.amt}
            </h1>
            <p>{this.state.ga}</p>
          </header>
        </div>
    );
  }
}

export default App;
