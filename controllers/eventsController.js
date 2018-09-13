const db = require("../models");
var NodeGeocoder = require("node-geocoder");
var moment = require('moment')
var Cryptr = require('cryptr')

var options = {
	provider: 'google',
	apiKey: 'AIzaSyAEfiNQ9Wz0i7jqo6CirwVUoGdhFsr3hYQ'
};

var geocoder = NodeGeocoder(options);

let latLong = { latitude: 0, longitude: 0 };

geoConvert = (eventAddress) => geocoder.geocode(eventAddress)
	.then(function (res) {
		// console.log(res[0].latitude);
		// console.log(res[0].longitude);
		lat = res[0].latitude
		long = res[0].longitude
		latLong.latitude = lat;
		latLong.longitude = long;
		return latLong;
	}
	)
	.catch(function (err) {
		console.log(err)
	})

genKey = () => {
	var key = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 10; i++) {
		key += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return key;
}





// Defining methods for the eventsController
module.exports = {

	// FIND ALL NON EXPIRED EVENTS FOR DISPLAYING ON MAP
	findAllEvents: function (req, res) {
		db.Events
			// removes events that already have passed first
			.find({ "endDate": { "$gt": moment().toISOString() } })
			.select("-EKey")
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	// FIND ALL NON EXPIRED EVENTS FOR DISPLAYING ON MAP
	findAllDailyEvents: function (req, res) {
		db.Events
			// removes events that already have passed first
			.find({
				"endDate": { "$gt": moment().toISOString() },
				"startDate": { "$lt": (moment().add("days", 1).toISOString()) }
			})
			.select("-EKey")
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	// FIND ALL NON EXPIRED EVENTS FOR DISPLAYING ON MAP
	findAllWeeklyEvents: function (req, res) {
		db.Events
			// removes events that already have passed first
			.find({
				"endDate": { "$gt": moment().toISOString() },
				"startDate": { "$lt": moment().add("days", 7).toISOString() }
			})
			.select("-EKey")
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	// FIND ALL NON EXPIRED EVENTS FOR DISPLAYING ON MAP
	findAllMonthlyEvents: function (req, res) {
		db.Events
			// removes events that already have passed first
			.find({
				"endDate": { "$gt": moment().toISOString() },
				"startDate": { "$lt": moment().add("days", 31).toISOString() }
			})
			.select("-EKey")
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	// // DELETE EXPIRED EVENTS	
	// deleteExpiredEvents: function (req, res) {
	// 	console.log("CHECKING DELETE EVENTS")
	// 	// console.log(req)
	// 	db.Events
	// 		.find({"endDate": {"$lt": moment().toISOString()}})
	// 		.then(dbModel => dbModel.remove())
	// 		.then(dbModel => res.json(dbModel))
	// 		.catch(err => res.status(422).json(err));
	// },

	// FIND ONE EVENT TO DISPLAY DETAILS
	findEventById: function (req, res) {
		db.Events
			.findById(req.params.id)
			.select("-EKey")
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	Invitation: function (req, res) {
		db.Users
			.find({
				'username': { $in: req.body.people }
			})
			.select("-EKey")
			.then(users => {

			})
	},

	// CREATE AN EVENT AND ADD TO DB
	createEvent: function (req, res) {

		let reqCopy = req.body;
		console.log("reqCopay", reqCopy)



		let reqAddress = req.body.location
		geoConvert(reqAddress)
		setTimeout(function () {
			reqCopy = Object.assign({}, reqCopy, latLong)
			if (reqCopy.type == 2) {
				const keyz = {
					EKey: genKey()
				}
				reqCopy = Object.assign({}, reqCopy, keyz)

				const cryptr = new Cryptr(keyz.EKey)

				reqCopy.location = cryptr.encrypt(reqCopy.location)
				reqCopy.latitude = 0
				reqCopy.longitude = 0
				reqCopy.elat = cryptr.encrypt(reqCopy.latitude)
				reqCopy.elong = cryptr.encrypt(reqCopy.longitude)

			}

			db.Events
				.create(reqCopy)
				.then(resDocument => {
					console.log("Create Status", resDocument)
					db.Users
						.updateMany(
							// May need to add quotes
							{ _id: { $in: req.body.invited } },
							{ $push: { invites: resDocument._id } }
						)
						.then(invitelog => {
							console.log("Invite Status", invitelog)
							db.Users
								.updateOne(
									{ username: req.body.host },
									{ $push: { myEvents: resDocument._id } }
								)
								.then(ownerLog => {
									console.log(ownerLog)
									res.status(200).json(ownerLog)
								})
								.catch(err => res.status(422).json(err))

						})
						.catch(err => res.status(422).json(err));
				})
				// res.json(dbModel)
				.catch(err => res.status(422).json(err));
		}, 1000)
	},

	rsvpNo: function (req, res) {
		console.log("THIS IS THE WRONG FUNCTION")
		//need to pass userId, eventId in the object from api call on front end
		db.Events
			.findOneAndUpdate(
				{ _id: req.body.eventId },
				{ $pull: { invited: req.body.userId } }
			)
			.select("-EKey")
			.then(response => {
				console.log("FirstStep", response)
				db.Users
					.findOneAndUpdate(
						{ _id: req.body.userId },
						{ $pull: { invites: req.body.eventId } }
					)
					.then(finalres => {
						console.log("finalres", finalres)
						res.status(200).json(finalres)
					})
					.catch(err => res.status(422).json(err))
			})
			.catch(err => res.status(422).json(err))
	},


	//also needs userId and eventId passed into the object passed to the api call for this one
	rsvpYes: function (req, res) {
		db.Events
			.findOneAndUpdate(
				{ _id: req.body.eventId },
				{
					$push: { attending: req.body.userId }
				}
			)
			.select("-EKey")
			.then(initialres => {
				console.log("AM I Working FATHER?")
				db.Users
					.findOneAndUpdate(
						{ _id: req.body.userId },
						{
							$push: { attends: req.body.eventId }
						}
					)
					.then(finalres => {
						res.status(200).json(finalres)
					})
					.catch(err => res.status(422).json(err))

				// res.status(200).json(finalres)
			})
			.catch(err => res.status(422).json(err))
	},

	Unaccept: function (req, res) {
		db.Events
			.findOneAndUpdate(
				{ _id: req.body.eventId },
				{

					$pull: { attending: req.body.userId },

				}
			)
			.select("-EKey")
			.then(initialres => {
				console.log("initial response", initialres)
				db.Users
					.findOneAndUpdate(
						{ _id: req.body.userId },
						{

							$pull: { attends: req.body.eventId }

						}
					)
					.then(finalres => {
						console.log("finalres", finalres)
						res.status(200).json(finalres)
					})
					.catch(err => res.status(422).json(err))

				// res.status(200).json(finalres)
			})
			.catch(err => res.status(422).json(err))
	},


	// ENC Location

	checker: function (req, res) {
		//needs username, eventId ...

		db.Users
			.find({ username: req.body.username })
			.then(uName => {
				//console.log(uName._id)
				var userId = uName._id
				db.Events
					.find({_id: req.body.eventId}) 
						// { invited: req.body.userId }
					.select("-EKey")
					.then(checked => {
						console.log("HERE I AM", checked)
						checked.userId = userId
						res.status(200).json(checked)
						// Stuff for MIDDLEWARE Later: 
						// const thing1 = checked.invited
						// const invited = thing1.includes(userId)
						// if (invited == true) {
						// 	const thing2 = checked.spentIds
						// 	const spent = thing2.includes(userId) 
						// 	if (spent == false) {
						// 		res.status(200).send("GTG")
						// 	} else {
						// 		res.status(200).send("NGTG")
						// 	}
						// } else {
						// 	res.status(200).send("notInvited")
						// }

					})
					.catch(err => res.status(422).json(err))
			})
			.catch(err => res.status(422).json(err))


	},

	decrypter: function (req, res) {
		//needs: eventId, userId
		db.Events
			// .findOne({_id: req.body.eventId})
			.findOne(
				{ _id: req.body.eventId }
			)
			.select("EKey")
			.then(keyere => {
				console.log("KEYEERE", keyere)
				res.status(200).json(keyere)
			})
			.catch(err => res.status(422).json(err));
	},

	spenter: function (req, res) {
		db.Events
		.findOneAndUpdate(
			{ _id: req.body.eventId },
			{ $push: { spentIds: req.body.userId }},
			{new: true}
		)
		.then(spends => {
			console.log("spendme", spends)
			res.status(200).json(spends)
		})
		.catch(err => res.status(422).json(err));
	},

	// EDIT EVENT
	updateEvent: function (req, res) {
		db.Events
			.findOneAndUpdate({ _id: req.params.id }, req.body)
			.select("-EKey")
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	// DELETE EVENT
	removeEvent: function (req, res) {
		db.Events
			.findById({ _id: req.params.id })
			.select("-EKey")
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
};
