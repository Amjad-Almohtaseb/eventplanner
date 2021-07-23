const express = require("express");

const app = express();

const db = require("./db/models");

app.use(express.json()); //middleware

const eventRouter = require("./routers/eventRouter");

app.use("/events", eventRouter);

// db.sequelize.sync({alter : true});
db.sequelize.sync();

app.listen(8000);
