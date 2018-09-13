const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    //make username unique
    username: { type: String, required: true },
    password: { type: String, required: true },

    //Verify this somehow? Drivers liscense scanner? Icebox's Icebox
    // Only do 21+, validate whether or not they are 18 when they join/enter the site as some sort of basic modal, also need front end logic to say whether or not they are 21 based on the birthday that they enter, and set this value accordingly:

    ofAge: { type: Boolean, default: false },
    birthday: { type: Date },

    //add eventid to this on creation, remove on delete, keep here for archived-- maybe split these properties into current and past events:
    myEvents: [{ type: Schema.Types.ObjectId, ref: "Events" }],
    //add specific eventid to this on invitation, remove on RSVP of "no":
    invites: [{ type: Schema.Types.ObjectId, ref: "Events" }],
    attends: [{type: Schema.Types.ObjectId, ref: "Events"}],

    picLink: {type: String},
    userQr: String,
    bio: { type: String },
});

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };


const Users = mongoose.model("Users", userSchema);

module.exports = Users;
