const express = require("express");

const router = express.Router();

const eventController = require("../controllers/eventController");

router.get("/", eventController.eventsList);

router.get("/fullybooked", eventController.fullyRes);

router.get("/:eventId", eventController.eventDetail);

router.post("/", eventController.eventCreate);

router.delete("/:eventId", eventController.eventDelete);

router.put("/:eventId", eventController.eventUpdate);

module.exports = router;
