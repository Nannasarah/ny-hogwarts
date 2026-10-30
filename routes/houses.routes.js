import express from "express";
import * as housesController from "../controllers/houses.controller.js";

const router = express.Router();

//GET all houses
router.get("/", housesController.getAllHouses);

//GET single house
router.get("/:id", housesController.getHouseById); //putter id på da det er et bestemt hus

export default router;
