const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name:String,
    email: String,
    password: String
});

module.exports = mongoose.model("Admin", AdminSchema);

