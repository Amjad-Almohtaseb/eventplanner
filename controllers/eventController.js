const { Event, sequelize } = require("../db/models");

const { Op } = require("sequelize");

exports.eventsList = async (req, res) => {
  const startDate = req.body.startDate;
  try {
    if (startDate) {
      const events = await Event.findAll({
        where: { startDate: { [Op.gt]: startDate } },
        attributes: ["name", "image", "id"],
        order: [
          ["startDate", "ASC"],
          ["name", "ASC"],
        ],
      });
      res.json(events);
    } else {
      const eventsAll = await Event.findAll({
        attributes: ["name", "image", "id"],
        order: [
          ["startDate", "ASC"],
          ["name", "ASC"],
        ],
      });
      res.json(eventsAll);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message || "Server Error" });
  }
};

exports.eventDetail = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      res.json(foundEvent);
    } else res.status(404).json({ message: "Event not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventCreate = async (req, res) => {
  try {
    let newEvent;
    if (req.body.length) {
      newEvent = await Event.bulkCreate(req.body); // bulkCreate array of objects
    } else {
      newEvent = await Event.create(req.body);
    }
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ msg: error.message || "server error" });
  }
};

// by id or id,id
exports.eventDelete = async (req, res) => {
  try {
    const foundEvent = await Event.findAll({
      where: { id: req.params.eventId.split(",") },
    });
    if (foundEvent) {
      await Event.destroy({ where: { id: req.params.eventId.split(",") } });
      res.status(204).end();
    } else res.status(404).json({ message: "Event was not found" });
  } catch (error) {
    res.status(500).json({ message: error.message || "server error" });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    let foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(201).end();
    } else {
      res.status(404).json({ message: "Event is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "server error" });
  }
};

exports.fullyRes = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: ["name", "image", "id"],
      order: [["startDate", "ASC"]],
      where: { numOfSeats: { [Op.eq]: sequelize.col("bookedSeats") } },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message || "server error" });
  }
};
