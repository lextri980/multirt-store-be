const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
    console.log("Fail to connect!");
  }
}

module.exports = { connect };
