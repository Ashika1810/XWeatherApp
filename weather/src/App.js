import { useEffect, useState } from 'react';
import styles from './App.module.css';
import axios, * as others from 'axios';


const SearchComp =({makeSearch})=>{
  const [city, setCity]= useState("");
  
  const handleSearch=()=>{
    makeSearch(city);
  }
  return(
    <div className={styles.searchBar}>
      <input type="text"
      value={city} placeholder='Enter city name' 
      onChange={(e)=>setCity(e.target.value)}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  )

}

const WeatherCard =({title, data})=>{
  return(
    <div className={styles.weathercard}>
        <h3>{title}</h3>
        <p>{data}</p>
    </div>

  )
}

const WeatherDisplay = ({city})=>{
  const [weatherData, setWeatherData]= useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(city){
        setIsLoading(true);
        axios.get("https://api.weatherapi.com/v1/current.json",{
          params: {
          key: "7d8ced885993436cbd885022232811",
          q: city
          },
        }).then((res)=>{console.log(res.data); setWeatherData(res.data)})
        .catch((err)=>alert("Failed to fetch weather data"))
        .finally(()=>setIsLoading(false))
    }
  },[city])

  return(
    <div className={styles.WeatherDisplay}>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && weatherData && (
        <div className={styles.weathercards}>
        <WeatherCard title='Temperature' data={`${weatherData.current.temp_c}°C`}/>
        <WeatherCard title='Humidity' data={`${weatherData.current.humidity}%`}/>
        <WeatherCard title='Condition' data={`${weatherData.current.condition.text}`}/>
        <WeatherCard title='Wind Speed' data={`${weatherData.current.wind_kph}kph`}/>
        </div>
      )
    }
    </div>
  )

}

function App() {
  const [city, setCity] = useState("");

  const handleSearch= (city)=>{
    setCity(city);
  }

  return (
    <div className={styles.app}>
      <SearchComp makeSearch={handleSearch}/>
      <WeatherDisplay city={city}/>
    </div>
  );
}

export default App;
