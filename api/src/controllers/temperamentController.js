const { Temperament } = require("../db");

const getTemperamentsController = async (service) => {
  try {
    const dogsFromApi = service
      .map((t) => t.temperaments)
      .filter((t) => t)
      .map((t) => t.split(","))
      .flat()
      .map((t) => t.trim())
      .filter((t) => t.length > 1);

    const unique = [...new Set(dogsFromApi)];

    const temperaments = [];

    for (const t of unique) {
      try {
        const [temperament, created] = await Temperament.findOrCreate({
          where: { name: t },
        });

        temperaments.push(temperament);
      } catch (error) {
        console.error(`Error al crear el temperamento ${t}:`, error);
      }
    }

    const sortedTemperaments = temperaments.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedTemperaments;
  } catch (error) {
    throw new Error(`Error al obtener los temperamentos: ${error.message}`);
  }
};

module.exports = { getTemperamentsController };
