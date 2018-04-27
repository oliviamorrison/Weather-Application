import React from 'react';
import Titles from './components/Titles.js';
import Form from './components/Form.js';
import Weather from './components/Weather.js';

const API_KEY = "f1a58bc43301bb320c0b94188ebcad2e";


class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    counrty: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    //prevents full page refresh
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city&&country){

      //don't directly manipulate state
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country:data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
  else{
    this.setState({
      temperature: undefined,
      city: undefined,
      country:undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter a valid location"
    });
  }
  }
  render(){
    return (
      //jsx can only return one element
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
        />
      </div>
    );
  }
};

export default App;
