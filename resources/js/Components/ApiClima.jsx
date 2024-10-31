import axios from 'axios';


const API_KEY = 'TU_API_KEY'; // Reemplaza con tu clave de API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const ApiClima = async (city) => {

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Para obtener los datos en grados Celsius
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data', error);
        throw error;
    }


}

export default ApiClima
