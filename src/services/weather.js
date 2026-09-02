const API_KEY = import.meta.env.VITE_API_KEY;


export async function getWeather(lat, lon) {

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    const response = await fetch(API_URL)

    const data = await response.json();
    

    if (!response.ok) {
        throw new Error ("Error fetching weather")
    }

    return data;

}

export async function getCoordinates(city, country) {
    const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}, ${country}&limit=1&appid=${API_KEY}`
    const response = await fetch(API_URL)
    const data = await response.json();

     if (!response.ok) {
        throw new Error ("Error fetching weather")
    }

    return { 
        lat: data[0].lat, 
        lon: data[0].lon
    };
}
