import * as housesRepository from "../repositories/houses.repository.js";
import httperror from "../errorhandling/httperror.js";

// Fejl bliver "thrown" som httperror og fanget af errorhandleren (errorhandler.js),
// så der er ikke brug for try-catch her.

// GET all houses
// Sender alle houses tilbage som JSON med status 200
export async function getAllHouses(req, res) {
  const houses = await housesRepository.getAllHouses();
  res.status(200).json(houses); // 200 = OK
}

// GET single house
// Sender ét house tilbage med status 200, eller 404 hvis det ikke findes
export async function getHouseById(req, res) {
  const id = req.params.id; // Henter id fra URL, fx /houses/2  så det altså "2"

  const house = await housesRepository.getHouseById(id);

  // Findes ikke → 404 Not Found. throw stopper funktionen og sender fejlen til errorhandleren
  if (!house) {
    throw new httperror(404, "House does not exist");
  }

  res.status(200).json(house); // 200 = OK
}
