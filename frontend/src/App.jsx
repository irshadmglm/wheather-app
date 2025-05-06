import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './components/CitySelector';
import CurrentWeather from './components/CurrentWeather';
import WeatherHistory from './components/WeatherHistory';

function App() {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const query = `
          mutation { 
            fetchWeather(city: "${city}") {
              id
              city
              temperature
              description
              icon
              timestamp
            }
          }
        `;
        const res = await axios.post('http://localhost:5000/graphql', { query });
        console.log(res.data);
        
        setWeather(res.data.data.fetchWeather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchCurrentWeather();
  }, [city]);

 
    return (
      <div 
        className="min-h-screen bg-blue-500 p-4 md:p-6 font-sans bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/10558731/pexels-photo-10558731.jpeg?auto=compress&cs=tinysrgb&w=600')" }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 md:mb-8">
            Weather App
          </h1>
  
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 space-y-6">
              <div className="mx-auto max-w-xs w-full">
                <CitySelector city={city} setCity={setCity} />
              </div>
              
              {weather && (
                <div className="w-full">
                  <CurrentWeather weather={weather} />
                </div>
              )}
            </div>
  
            <div className="w-full md:w-1/2 lg:w-2/3">
              <WeatherHistory city={city} />
            </div>
          </div>
        </div>
      </div>
    );
  }


export default App;
