const mongoose = require("mongoose");

const mongodb = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(() => {
            console.log("Failed to connect to MongoDB");
        })
}

module.exports = mongodb;