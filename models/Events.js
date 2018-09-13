const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  host: { type: String, required: false },
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  //Maybe use unix epoch format with a js library to convert to date and time (separate)
  //Also, combined date and time just based on the format; will concat when making the call
  // latLong property is converted from the address:
  latitude: { type: Number },
  longitude: { type: Number },

  elat: String,
  elong: String,
  // ADDED START AND END DATE
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: new Date(+new Date() + 3600000)},
  description: { type: String, required: false },
  //encryptedLocStuff; secure is for a later feature
  EKey: { type: String, required: false },
  secure: { type: Boolean, required: false, default: false },
  spentIds: [],

  invited: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  attending: [{type: Schema.Types.ObjectId, ref: "Users"}],
  locationDownloaded: [],
  //add id's here upon invitation by event creator:
  type: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 2,
    required: true
  },
  ageReq: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 1,
    required: true
  },
  eventQr: { type: String, required: false },
  //probably disable inviting guests under 21 when we render the suggestions to invite guests, and if it is based on an "on submit" type of deal where they type in the user name, we could add in some error handling to let them know that the person is under 21
  //add id's here upon user RSVP
  attending: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  picUrl: [{ type: String }],
  //An afterthought, for later qr checking functionality via camera:
  userQrs: [{ type: Schema.Types.ObjectId, ref: "Users" }]
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
