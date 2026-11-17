import * as housesRepository from "../repositories/houses.repository.js";
import httperror from "../errorhandling/httperror.js";

// Fejl bliver "thrown" som httperror og fanget af errorhandleren (errorhandler.js), istedet for try-catch som jeg gjorde først

// GET all houses
export async function getAllHouses(req, res) {
  const houses = await housesRepository.getAllHouses();
  res.status(200).json(houses);
}

// GET single house
export async function getHouseById(req, res) {
  const id = req.params.id;

  const house = await housesRepository.getHouseById(id);

  if (!house) {
    throw new httperror(404, "House does not exist");
  }

  res.status(200).json(house);
}
