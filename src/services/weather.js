const API_KEY = import.meta.env.VITE_API_KEY;

function formatUtcOffset(offsetSeconds) {
    const sign = offsetSeconds < 0 ? "-" : "+" 
    const absSeconds = Math.abs(offsetSeconds);
    const totalMinutes = absSeconds/60;
    const wholeHours = Math.floor(totalMinutes/60);
    const remainingMinutes = totalMinutes % 60

    if (remainingMinutes === 0) {
        return `UTC${sign}${wholeHours}`
    } else {
        return `UTC${sign}${wholeHours}:${remainingMinutes}`
    }
}

export async function getWeather(lat, lon) {

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    const response = await fetch(API_URL)

     if (!response.ok) {
        throw new Error ("Error fetching weather")
    }

    const data = await response.json();
    

    return {
        city: data.name,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        windSpeed: Math.round(data.wind.speed),
        humidity: data.main.humidity,
        utcOffset: formatUtcOffset(data.timezone)
    }  
}

export async function getCoordinates(city, country) {
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`
    const response = await fetch(API_URL)
    
     if (!response.ok) {
        throw new Error ("Error fetching weather")
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error ("No coordinates")
    }

    return { 
        lat: data[0].lat, 
        lon: data[0].lon
    };
}


export async function getWeatherForDestination(destination) {
    const coordinates = await getCoordinates(destination.city, destination.country);
    const weather = await getWeather(coordinates.lat, coordinates.lon);
    return weather;
}
 