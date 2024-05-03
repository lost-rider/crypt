import express from "express";
const router = express.Router();

import convertService from "../services/convert.service";

router.get("/convert", convertService);
// router.get("/", searchController.search);

export default routes;