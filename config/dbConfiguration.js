const mongoose = require("mongoose");

const dbConnection = async () => {
    await mongoose.connect("mongodb+srv://avijitjana002016:UzoGX2NBg5JM7s2R@nodejs.qhjmk8d.mongodb.net/DevTinder");
};


module.exports = dbConnection;