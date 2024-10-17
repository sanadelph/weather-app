import axios from "axios";
import { useState } from "react";
function App() {
  const [data, setData] = useState({})
  const [error,setError]=useState(null)
  const [location, setLocation] = useState('')
  const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const firstLetterUpperCase=(str)=>{
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const searchLocation=async(e)=>{
    try {
      if(e.key==='Enter'){
        const res=await axios.get(api_url)
        setData(res.data);
        setLocation('')
        setError(null)
      }
    } catch (err) {
      setError(err.response.data.message);
      setLocation('')
    }
} 
  

  return (
    <div className="app">
      <div className="search">
        <input type="text" 
        value={location} 
        onChange={e=>setLocation(firstLetterUpperCase(e.target.value))}
        onKeyPress={searchLocation}
        placeholder="Enter Location"/>
      </div>
      <div className='container'>
        {error && <p>{error}</p>}
        <div className='top'>
          <div className='location'>
           {!error && <p>{data.name}</p>}
          </div>
          <div className='temp'>
            {!error && data.main && <h1>{data.main?.temp.toFixed()}°F</h1>}
          </div>
          <div className='desc'>
            {!error && data.weather?<p>{data.weather[0].main}</p>:null}
          </div>
        </div>

        {!error && data.name!== undefined && 
        
        <div className='bottom'>
          <div className='feels'>
            <p className='bold'>{data.main?.feels_like.toFixed()}</p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main?<p className='bold'>{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
           {data.wind? <p className='bold'>{data.wind.speed.toFixed()} MPH</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
