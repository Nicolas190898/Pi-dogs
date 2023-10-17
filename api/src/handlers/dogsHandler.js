const { dogsApi } = require("../controllers/dogsApi");
const { dogsDb } = require("../controllers/dogsDb");
const { Temperament, Dog } = require('../db')

// Función para combinar y unir datos de la api y la base de datos
const getAllDogs = async (req, res) => {
  try {
    // Código para obtener datos desde la api
    const dogsFromApi = await dogsApi(); // se espera el controlador

    // Código para obtener datos desde la DB

    const dogsFromDb = await dogsDb();

    // Combinar resultados de la Api y Db

    const allDogs = [...dogsFromApi, ...dogsFromDb];

    // Ordenar alfabéticamente
    allDogs.sort((a, b) => a.name.localeCompare(b.name));

    return allDogs;
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Funcion que filtra y retorna los perros

const getDogs = async (req, res) => {
  try {
    const allDogs = await getAllDogs(); // Invocar la función que combina api y DB
    const useQuery = Object.keys(req.query).length > 0; // Reviso si viene una query en el request

    if (!useQuery) {
      return res.status(200).json(allDogs); // Si no viene una query devuelvo todos los perros
    } else {
      const name = req.query.name; // Reviso si la query especifica es exactamente "name"
      if (!name) {
        return res.status(400).json({ error: "Params is not valid" });
      }

      const search = allDogs.filter(
        (
          dog // Filtro todos los perros
        ) => dog.name.toLowerCase().includes(name.toLowerCase()) // Convertir a minuscula y reviso si incluye ese nombre
      );

      if (search.length === 0) {
        // Reviso la longitud de la busqueda
        return res
          .status(404)
          .json({ message: "No dog breeds found with that name" });
      }
      res.status(200).json(search);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// función que retorna un perro específico

const getOneDog = async (req, res) => {
    try {
        const { id } = req.params;
        const dogs = await getAllDogs(); // Invoco la función que consulta todos los perros

        const dog = await dogs.find(d => d.id === id || d.id === Number(id));

        if (dog) {
            return res.status(200).json(dog);
        } else {
            return res.status(404).json({ error:"Dog not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Función para crear perros en la base de datos
const createDog = async (req, res) => {
  try {
    const { image, name, height, weight, life, temperaments } = req.body;
    // Validación de los campos requeridos en el body
    if (!image || !name || !height || !weight || !life || !temperaments)
      return res.status(404).json({ error: "Incomplete data" });

    const dogs = await getAllDogs(); // Invoco la función que consulta todos los perros
    const dogExist = dogs.find((d) => d.name === name); // Comparo si ya existe la raza

    if (dogExist)
      return res.status(400).json({ error: "Dog breeds name already exists" });

    const tempExist = await Promise.all(
      temperaments.map((temperamentId) => Temperament.findByPk(temperamentId))
    );

    // Valida que el temperamento exista
    if (tempExist.some((t) => !t))
      return res.status(404).json({ error: "Temperament does not exist" });

    // Crea el perro en la base de datos
    const newDog = await Dog.create({
      image,
      name,
      height,
      weight,
      life,
    });

    // Asocia el temperamento al perro creado
    await newDog.setTemperaments(tempExist);
    return res.status(201).json(newDog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




module.exports = {
  getAllDogs,
  getDogs,
  getOneDog,
  createDog
};
