const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router
    .route("/")
    .get(usersController.findAllUsers)
    .post(usersController.createUser);

// Matches with "/api/users/:id"
// router
//     .route("/:id")
//     .get(usersController.findUserByUsername)
//     .put(usersController.updateUser)
//     .delete(usersController.removeUser);

router 
    .route("/login")
    .post(usersController.validateUser)

router
    .route("/logout")

router 
    .route("/signup")
    .post(usersController.createUser)

router  
    .route("/populatedata")
    .post(usersController.populateProfile)

router
    .route("/update")
    .post(usersController.updateUser)

router
    .route("/autofill")
    .post(usersController.autofill)

router
    .route("/getuser")
    .post(usersController.findUserByUsername)
    
module.exports = router;
