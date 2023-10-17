const axios = require("axios");
const {API_KEY} = process.env
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
// Función para obtener datos desde la api externa
const dogsApi = async (req, res) => {
  try {
    const api = await axios(URL);
    const result = api.data.map((info) => ({
      id: info.id,
      image: info.image.url,
      name: info.name,
      height: info.height.metric,
      weight: info.weight.metric,
      life: info.life_span,
      created: false,
      temperaments: info.temperament,
    }));
    return result;
  } catch (error) {
     console.error("Error al obtener perros:", error);
     throw error;
  }
}


module.exports = {
  dogsApi
}