const db = require('../models');

// Defining methods for the usersController
module.exports = {

	// FIND ALL USERS
	findAllUsers: function (req, res) {
		db.Users
			.find(req.query)
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	autofill: function (req, res) {
		db.Users
			.find({}, '_id username picLink')
			.then(uzas => res.json(uzas))
			.catch(err => res.status(422).json(err))
	},

	// FIND USER BY ID
	findUserByUsername: function (req, res) {
		console.log(req.body);
		db.Users
			.findOne({ 'username': req.body.username })
			.then(dbModel => {
				console.log('DBMODEL', dbModel);
				res.json(dbModel);
			})
			.catch(err => res.status(422).json(err));
	},

	populateProfile: function (req, res) {
		db.Users
			.findOne({ 'username': req.body.username  })
			.populate({path: 'myEvents', select: "-EKey -password"})
			.populate({path: 'invites', select: "-EKey -password"})
			.then(dbModel => {
				res.json(dbModel);
			})
			.catch(err => res.status(422).json(err));
	},

	updateUser: function (req, res) {
		console.log(req);
		db.Users
			.findOneAndUpdate(
				{'username': req.body.username},
				{$set:{'bio': req.body.bio, 'picLink': req.body.picLink}})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	//VALIDATE PASSWORD
	validateUser: function (req, res) {
		console.log(req.body);

		db.Users
			.findOne({ 'username': req.body.username })
			.then(dbModel => {

				// console.log('DBMODEL: ', dbModel)
				// if (err) throw err; 
				// user.comparePassword(req.body.password, function(err, isMatch) {
				//   if (err) throw err;
				//   console.log('Password Check:', isMatch); // -> Password123: true
				// });

				// console.log(dbModel)          

				if (!dbModel) {
					res.status(605).json({ message: 'User not found.' });
					console.log('User Not Found');
				}
				else if (!dbModel.comparePassword(req.body.password)) {
					res.status(401).json({ message: 'Invalid password.' });
					console.log('Incorrect Password');

				} else {
					console.log('Successful Login!')
					res.status(200).json({ message: 'Success' })

					// req.session.dbModel = dbModel.dataValues;
					// console.log(req.session.dbModel);
					// console.log('TEST');
					// res.json({ message: 'Successful login.' });
				}

				console.log(dbModel.comparePassword(req.body.password))

			})
			.catch(err => res.status(422).json(err));
	},

	// CREATE NEW USER

	createUser: function (req, res) {
		db.Users
			.create(req.body)
			.then(dbModel => {
				console.log(dbModel)
				res.json(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},

	// UPDATE USER INFORMATION

	// updateUser: function (req, res) {
	// 	db.Users
	// 		.findOneAndUpdate({ _id: req.params.id }, req.body)
	// 		.then(dbModel => res.json(dbModel))
	// 		.catch(err => res.status(422).json(err));
	// },

	// DELETE USER ACCOUNT
	removeUser: function (req, res) {
		db.Users
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
};
