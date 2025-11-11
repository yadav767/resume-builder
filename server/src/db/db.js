const mongoose = require("mongoose");


async function connectDB() {
    await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connected to DB");
        }).catch(error => {
            console.log(error);
        })
}


module.exports = connectDB