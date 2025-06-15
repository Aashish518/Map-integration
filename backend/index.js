const express = require("express");
const app = express();

require("dotenv").config()

const cors = require("cors")

const mongodb = require("./database/db");
mongodb();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", require("./router/user"));
app.use("/api", require("./router/property"));


app.listen(process.env.BACKEND_PORT, () => {
    console.log(`server run on port ${process.env.BACKEND_PORT}`);
})