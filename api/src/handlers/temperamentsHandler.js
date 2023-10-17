const { dogsApi } = require("../controllers/dogsApi");

const {
  getTemperamentsController,
} = require("../controllers/temperamentController");

const getTemperamentsHandler = async (req, res) => {
  try {
    const service = await dogsApi(); // Invoca la función que consulta la api externa
    const temperaments = await getTemperamentsController(service);
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getTemperamentsHandler,
};
