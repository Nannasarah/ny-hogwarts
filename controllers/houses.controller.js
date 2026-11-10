import * as housesRepository from "../repositories/houses.repository.js";
import httperror from "../errorhandling/httperror.js";

// GET all houses
// Sender alle houses tilbage som JSON med status 200
export async function getAllHouses(req, res) {
  // try {
  const houses = await housesRepository.getAllHouses();
  res.status(200).json(houses); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// GET single house
// Sender ét house tilbage med status 200, eller 404 hvis det ikke findes
export async function getHouseById(req, res) {
  // try {
  const id = req.params.id; // Henter id fra URL, fx /houses/2  så det altså "2"

  const house = await housesRepository.getHouseById(id);

  // Hvis der ikke er et så 404
  if (house) {
    console.log("House found:", house);
    return res.status(200).json(house); // betyder OK
  }
  throw new httperror(404, "House does not exist");

  // return res.sendStatus(404).json({ message: "House does not exist", error: "Not found", statusCode: 404 }); // betyder not found
  // }
  // catch (err) {
  //   console.log(err); //500 betyder uforudset fejl på serveren
  //   res.sendStatus(500).json({ message: "Something went wrong in the database", error: "Internal server error", statusCode: 500 });
  // }
}
