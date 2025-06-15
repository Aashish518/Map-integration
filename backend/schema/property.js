const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertySchema = new Schema({
    image: String,
    name: String,
    description: String,
    address: String,
    latitude: Number,
    longitude: Number,
});

module.exports = mongoose.model("Propertys", propertySchema);
