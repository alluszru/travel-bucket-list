import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Weather(props) {
 if (props.loading) {
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress aria-label="Loading…" />
    </Box>
    )
} else if (props.error) {
    return (
        <p className="weatherError">Weather data not available right now</p>
    )
} else if  (props.weather) {
    
   return (
          <div className="weatherContainer">
          
                <div className="weatherHeader">
                    <img className="weatherIcon" src={props.weather.icon} alt={props.weather.description}/> 
                    <p className="weatherTemp"> {props.weather.temp}°C </p>
                   
                </div>
                    <p className="weatherInfo"> {props.weather.description}</p>  
                <div className="weatherDetails">
                    <p className="weatherInfo">feels-like: {props.weather.feelsLike}°C</p>
                    <p className="weatherInfo">wind: {props.weather.windSpeed} m/s</p>
                    <p className="weatherInfo">humidity: {props.weather.humidity}%</p>
                    <p className="weatherInfo"> {props.weather.utcOffset}</p>
                </div>
          
            </div>
            
        )}

 return null; 
}

export default Weather;