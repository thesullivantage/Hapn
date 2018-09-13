const mongoose = require("mongoose");
const db = require("../models");

// This file empties the happnen collection and inserts the users below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/happnen"
);

const usersSeed = [
  {
    username: "MarioKart",
    password: "password",
    ofAge: true,
    myEvents: [],
    invites: [],
    userQr: "bbh5hyc0kj5a"
  },
  {
    username: "OboePlayer12",
    password: "OboePlayer12",
    ofAge: false,
    myEvents: [],
    invites: [],
    userQr: "LbXvJHmr1dFq"
  },
  {
    username: "RedRobbinHood",
    password: "password",
    ofAge: true,
    myEvents: [],
    invites: [],
    userQr: "kY097Cl9G9Bc"
  },
  {
    username: "HeatMagic29",
    password: "password",
    ofAge: false,
    myEvents: [],
    invites: [],
    userQr: "8fXFsspYxMS8"
  },
  {
    username: "IceMan520",
    password: "password",
    ofAge: false,
    myEvents: [],
    invites: [],
    userQr: "Ge8mGBUwKzRi"
  }
]

db.Users
    .remove({})
    .then(() => db.Users.collection.insertMany(usersSeed))
    .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
