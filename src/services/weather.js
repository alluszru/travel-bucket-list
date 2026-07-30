const API_KEY = import.meta.env.VITE_API_KEY;


export async function getWeather(lat, lon) {

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=52.2297&lon=21.0122&appid=${API_KEY}`
    const response = await fetch(API_URL)
    const data = await response.json();

    if (!response.ok) {
        throw new Error ("Error fetching weather")
    }

    return data;

}
